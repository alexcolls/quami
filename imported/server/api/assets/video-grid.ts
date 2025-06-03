import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { defineEventHandler, getQuery, createError } from 'h3';
import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const { s3 } = runtimeConfig;

  if (!s3 || !s3.bucket || !s3.region || !s3.accessKeyId || !s3.secretAccessKey) {
    console.error('S3 configuration is missing or incomplete');
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error',
    });
  }

  const query = getQuery(event);
  // Increase default limit to ensure we have enough videos for the grid
  const limit = query.limit ? parseInt(query.limit as string) : 100;

  if (isNaN(limit) || limit < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid limit parameter. Must be a positive number.',
    });
  }

  const s3Client = new S3Client({
    region: s3.region,
    credentials: {
      accessKeyId: s3.accessKeyId,
      secretAccessKey: s3.secretAccessKey,
    },
  });

  try {
    const command = new ListObjectsV2Command({
      Bucket: s3.bucket,
      MaxKeys: limit,
    });

    const response = await s3Client.send(command);
    
    if (!response.Contents) {
      return [];
    }

    // Sort by LastModified in descending order (newest first)
    const sortedContents = response.Contents.sort((a, b) => {
      if (!a.LastModified || !b.LastModified) return 0;
      return b.LastModified.getTime() - a.LastModified.getTime();
    });

    // Take only the requested number of items
    const recentVideos = sortedContents.slice(0, limit);

    // Generate pre-signed URLs for each video
    const videoUrls = await Promise.all(
      recentVideos.map(async (video) => {
        if (!video.Key) return null;
        
        const getObjectCommand = new GetObjectCommand({
          Bucket: s3.bucket,
          Key: video.Key,
        });

        // Generate a pre-signed URL that expires in 1 hour
        const signedUrl = await getSignedUrl(s3Client, getObjectCommand, {
          expiresIn: 3600, // 1 hour in seconds
        });

        return signedUrl;
      })
    );

    return videoUrls.filter(Boolean);
  } catch (error) {
    console.error('Error fetching videos from S3:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch videos from S3',
    });
  }
});

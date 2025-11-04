import type { KwamiConfig, BlobSkinType, MindConfig, SoulConfig } from '@kwami';
import type { KwamiDNAConfig } from './calculateKwamiDNA';

/**
 * Full Kwami NFT metadata structure following Metaplex standard
 */
export interface KwamiNFTMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string; // Arweave URI for image/GLB thumbnail
  animation_url?: string; // Arweave URI for GLB file
  external_url?: string; // Link to quami.io
  
  // Metaplex standard attributes
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  
  // Metaplex properties
  properties: {
    files: Array<{
      uri: string;
      type: string;
    }>;
    category: 'vfx' | 'image' | 'video';
    creators: Array<{
      address: string;
      share: number;
    }>;
  };
  
  // Custom Kwami data
  kwami: {
    dna: string;
    body: KwamiDNAConfig;
    mind?: Partial<MindConfig>;
    soul?: Partial<SoulConfig>;
    version: string;
    timestamp: number;
  };
}

/**
 * Input data for creating Kwami NFT metadata
 */
export interface PrepareKwamiMetadataInput {
  // Identity
  name: string;
  description?: string;
  creatorWallet: string;
  
  // DNA and configuration
  dna: string;
  body: KwamiDNAConfig;
  mind?: Partial<MindConfig>;
  soul?: Partial<SoulConfig>;
  
  // Assets
  imageUri: string; // Arweave URI for thumbnail
  glbUri?: string; // Arweave URI for 3D model
  
  // Optional
  externalUrl?: string;
}

/**
 * Prepare Kwami NFT metadata in Metaplex standard format
 * 
 * Creates a complete metadata JSON object ready for Arweave upload
 * following the Metaplex NFT standard with custom Kwami data
 * 
 * @param input - Metadata input parameters
 * @returns Complete NFT metadata object
 * 
 * @example
 * ```typescript
 * const metadata = prepareKwamiMetadata({
 *   name: "Kwami #1234",
 *   description: "A unique AI companion",
 *   creatorWallet: "7xKP...",
 *   dna: "a1b2c3...",
 *   body: { ... },
 *   mind: { ... },
 *   soul: { ... },
 *   imageUri: "https://arweave.net/...",
 *   glbUri: "https://arweave.net/..."
 * });
 * ```
 */
export function prepareKwamiMetadata(input: PrepareKwamiMetadataInput): KwamiNFTMetadata {
  const timestamp = Date.now();
  
  // Build attributes array for Metaplex standard
  const attributes: Array<{ trait_type: string; value: string | number }> = [
    // DNA
    { trait_type: 'DNA', value: input.dna.substring(0, 16) }, // Short DNA for display
    { trait_type: 'Full DNA Hash', value: input.dna },
    
    // Body - Geometry
    { trait_type: 'Resolution', value: input.body.resolution },
    { trait_type: 'Skin', value: input.body.skin },
    { trait_type: 'Base Scale', value: input.body.baseScale ?? 1.0 },
    { trait_type: 'Opacity', value: input.body.opacity ?? 1.0 },
    
    // Body - Deformation
    { trait_type: 'Spike X', value: input.body.spikes.x },
    { trait_type: 'Spike Y', value: input.body.spikes.y },
    { trait_type: 'Spike Z', value: input.body.spikes.z },
    { trait_type: 'Time X', value: input.body.time.x },
    { trait_type: 'Time Y', value: input.body.time.y },
    { trait_type: 'Time Z', value: input.body.time.z },
    { trait_type: 'Rotation X', value: input.body.rotation.x },
    { trait_type: 'Rotation Y', value: input.body.rotation.y },
    { trait_type: 'Rotation Z', value: input.body.rotation.z },
    
    // Body - Visual
    { trait_type: 'Color X', value: input.body.colors.x },
    { trait_type: 'Color Y', value: input.body.colors.y },
    { trait_type: 'Color Z', value: input.body.colors.z },
    { trait_type: 'Shininess', value: input.body.shininess },
    { trait_type: 'Wireframe', value: input.body.wireframe ? 'Yes' : 'No' },
    
    // Mind - AI Configuration
    ...(input.mind?.voice?.voiceId
      ? [{ trait_type: 'Voice ID', value: input.mind.voice.voiceId }]
      : []
    ),
    ...(input.mind?.voice?.model
      ? [{ trait_type: 'TTS Model', value: input.mind.voice.model }]
      : []
    ),
    ...(input.mind?.language
      ? [{ trait_type: 'Language', value: input.mind.language }]
      : []
    ),
    
    // Soul - Personality
    ...(input.soul?.name
      ? [{ trait_type: 'Personality Name', value: input.soul.name }]
      : []
    ),
    ...(input.soul?.conversationStyle
      ? [{ trait_type: 'Conversation Style', value: input.soul.conversationStyle }]
      : []
    ),
    ...(input.soul?.emotionalTone
      ? [{ trait_type: 'Emotional Tone', value: input.soul.emotionalTone }]
      : []
    ),
    
    // Metadata
    { trait_type: 'Creator', value: input.creatorWallet },
    { trait_type: 'Minted At', value: new Date(timestamp).toISOString() },
    { trait_type: 'Quami Version', value: '0.2.0' },
  ];
  
  // Build files array
  const files: Array<{ uri: string; type: string }> = [
    {
      uri: input.imageUri,
      type: 'image/png',
    },
  ];
  
  if (input.glbUri) {
    files.push({
      uri: input.glbUri,
      type: 'model/gltf-binary',
    });
  }
  
  // Construct complete metadata
  const metadata: KwamiNFTMetadata = {
    name: input.name,
    symbol: 'KWAMI',
    description: input.description || `A unique Kwami AI companion with DNA ${input.dna.substring(0, 16)}`,
    image: input.imageUri,
    animation_url: input.glbUri,
    external_url: input.externalUrl || 'https://quami.io',
    
    attributes,
    
    properties: {
      files,
      category: 'vfx',
      creators: [
        {
          address: input.creatorWallet,
          share: 100,
        },
      ],
    },
    
    kwami: {
      dna: input.dna,
      body: input.body,
      mind: input.mind,
      soul: input.soul,
      version: '0.2.0',
      timestamp,
    },
  };
  
  return metadata;
}

/**
 * Validate Kwami NFT metadata
 * Ensures all required fields are present and properly formatted
 */
export function validateKwamiMetadata(metadata: KwamiNFTMetadata): boolean {
  // Required fields
  if (!metadata.name || !metadata.symbol || !metadata.image) {
    return false;
  }
  
  // Symbol must be KWAMI
  if (metadata.symbol !== 'KWAMI') {
    return false;
  }
  
  // Must have DNA
  if (!metadata.kwami?.dna || metadata.kwami.dna.length !== 64) {
    return false;
  }
  
  // Must have body configuration
  if (!metadata.kwami?.body) {
    return false;
  }
  
  // Must have at least one creator
  if (!metadata.properties?.creators || metadata.properties.creators.length === 0) {
    return false;
  }
  
  // Creator shares must sum to 100
  const totalShares = metadata.properties.creators.reduce((sum, creator) => sum + creator.share, 0);
  if (totalShares !== 100) {
    return false;
  }
  
  return true;
}

/**
 * Extract Kwami configuration from NFT metadata
 * Useful for reconstructing a Kwami from its NFT
 */
export function extractKwamiConfig(metadata: KwamiNFTMetadata): KwamiConfig {
  return {
    body: {
      blob: {
        resolution: metadata.kwami.body.resolution,
        spikes: metadata.kwami.body.spikes,
        time: metadata.kwami.body.time,
        rotation: metadata.kwami.body.rotation,
        colors: metadata.kwami.body.colors,
        shininess: metadata.kwami.body.shininess,
        wireframe: metadata.kwami.body.wireframe,
      },
      initialSkin: metadata.kwami.body.skin,
    },
    mind: metadata.kwami.mind,
    soul: metadata.kwami.soul,
  };
}

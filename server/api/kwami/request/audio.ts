import { defineEventHandler, readBody } from 'h3';
import FormData from 'form-data';

export default defineEventHandler(async (event) => {
  // Parse the audio file from the request
  const body = await readBody(event);
  const config = useRuntimeConfig();

  const formData = new FormData();
  formData.append('file', body.audio, {
    filename: 'recording.wav',
    contentType: 'audio/wav'
  });

  const url = 'https://api.edenai.run/v2/audio/speech_to_text';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.EDENAI_API_KEY}`
      },
      body: formData
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error processing audio:', error);
    return {
      error: 'Failed to process audio'
    };
  }
});

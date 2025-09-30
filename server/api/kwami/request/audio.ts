import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  // Use built-in Web FormData/File (available in Bun/Nitro)
  const file = new File([body.audio], 'recording.wav', { type: 'audio/wav' });
  const formData = new FormData();
  formData.append('file', file);

  const url = 'https://api.edenai.run/v2/audio/speech_to_text';
  try {
    const res = await $fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.EDENAI_API_KEY}`
      },
      body: formData
    });
    return res;
  } catch (error) {
    console.error('Error processing audio:', error);
    return {
      error: 'Failed to process audio'
    };
  }
});

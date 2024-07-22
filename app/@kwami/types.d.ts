export type Body = {
  form: {
    name: string;
    params: {};
  };
  skin: {
    name: string;
    params: {};
  };
  animation: {
    name: string;
    params: {};
  };
};

export type AI = {
  ai: {
    llm: {
      name: "LLM";
      description: "LargeLanguageModel";
      model: string;
      provider: string;
      params: {
        temperature: number;
        token: number;
      };
      energy: string;
      speed: string;
    };
    tts: {
      name: "TTS";
      description: "TextToSpeech";
      model: string;
      provider: string;
      params: {
        voices: string[];
        languages: string[];
      };
    };
    stt: {
      name: "STT";
      description: "SpeechToText";
      model: string;
      provider: string;
      params: {
        language: string[];
      };

      energy: string;
      speed: string;
    };
  };
  gender: "+" | "-";
  languagues: string[];
  energy: number;
};

export const LLM = {
  name: 'large-language-model',
  symbol: 'llm',
  settings: {
    providers: [
      {
        name: 'openai',
        url: 'https://openai.com/',
        rarity: {
          common: 0.5, /*              probability: 430/10000
              percentage: 50%
              total: 50%
              */
          uncommon: 0.25, /*              probability: 333/1000
              percentage: 33%
              total: 75%
              */
          rare: 0.1, /*              probability: 222/1000
              percentage: 22%
              total: 85%
              */
          exotic: 0.075, /*              probability: 75/1000
              percentage: 7.5%
              total: 90%
              */
          epic: 0.025, /*              probability: 25/1000
              percentage: 2.5%
              total: 95%
              */
          legendary: 0.01, /*              probability: 10/1000
              total: 97.25%
              */
          mythical: 0.005, /*              probability: 5/1000
              total: 9.98%
              */
          celestial: 0.0000001, /*              probability: 1/1000
              total: 30%
              */
          divine: 0.0000001 /*
              probability: 30/100
              total: 30%
              */
        },
        settings: {
          temperature: {
            min: 0,
            max: 1
          },
          tokens: {
            min: 333,
            max: 2048
          }
        },
        models: [
          {
            name: 'gpt-3.5-turbo-0301',
            rarity: 'common',
            energy: () => {} //
          },
          { name: 'gpt-3.5-turbo', settings: {} }
        ]
      }
    ],
    model: 'davinci-codex'
  }
};

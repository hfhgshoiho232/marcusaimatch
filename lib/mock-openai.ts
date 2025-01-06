export function mockOpenAI() {
  return {
    generateText: async ({ prompt }: { prompt: string }) => {
      // Simple mock logic to generate match scores
      if (prompt.includes('score')) {
        const score = Math.floor(Math.random() * 101); // Random score between 0 and 100
        return { text: score.toString() };
      }
      return { text: 'Mock response' };
    }
  };
}


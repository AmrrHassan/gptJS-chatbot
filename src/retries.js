import colors from "colors";

export const getResponseWithRetry = async (modelAI, prompt, retries = 3) => {
  while (retries > 0) {
    try {
      const result = await modelAI.generateContent(prompt);
      return result.response.text();
    } catch (e) {
      retries--;
      console.log(
        colors.red(`Error: ${e.message}. Retrying... (${3 - retries} attempts)`)
      );
      if (retries === 0) {
        console.log(
          colors.red(`Failed after multiple attempts. Please try again later.`)
        );
        return null;
      }
    }
  }
};

export const summarizeConversation = async (modelAI, chatHistory) => {
  const prompt =
    "Summarize this conversation:\n" +
    chatHistory.map(([role, content]) => `${role}: ${content}`).join("\n");

  const result = await modelAI.generateContent(prompt);
  return result.response.text();
};

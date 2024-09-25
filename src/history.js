export const updateChatHistory = (chatHistory, role, content) => {
  chatHistory.push([role, content]);
};

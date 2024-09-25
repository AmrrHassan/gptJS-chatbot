import { modelAI } from "./config/gemini-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";
import { handleCommands } from "./src/commands.js";
import { updateChatHistory } from "./src/history.js";
import { resetInactivityTimer } from "./src/inactivity.js";
import { logChat } from "./src/logger.js";
import { getResponseWithRetry } from "./src/retries.js";
import { analyzeSentiment } from "./src/sentiment.js";
import { summarizeConversation } from "./src/summarize.js";
import { chooseProfile } from "./src/profiles.js";

// import { startSpeechRecognition } from "./speech.js";

// Helper function to handle user commands
const processCommand = async (userInput, chatHistory) => {
  if (userInput === "exit") {
    console.log(colors.bold.green(`Exiting Chatbot GPTJS`));
    process.exit(0);
  } else if (userInput === "help") {
    console.log(
      colors.bold.yellow(
        `Commands:\nexit - Exit the chatbot\nclear - Clear chat history\nsave - Save chat history\nload - Load chat history`
      )
    );
  } else {
    const commandResult = await handleCommands(chatHistory);
    if (commandResult !== null) return commandResult; // Update chatHistory if a command modifies it
  }
  return chatHistory;
};

// Helper function for sentiment analysis
const detectSentiment = (input) => {
  const sentimentScore = analyzeSentiment(input);
  if (sentimentScore < 0) {
    console.log(colors.bold.red("Negative sentiment detected in your input."));
  } else {
    console.log(
      colors.bold.bgMagenta("Positive sentiment detected in your input.")
    );
  }
};

// Main function
async function main() {
  console.log(colors.bold.blue(`Welcome to the Chatbot GPTJS`));
  console.log(colors.bold.blue(`You can start chatting with the bot\n`));
  console.log(
    colors.bold.green(`Type help to see commands or "/" to use a command\n`)
  );
  console.log(
    colors.bold.green(
      `Type /exit to kill GPTJS or /clear to clear chat history\n`
    )
  );

  const profile = chooseProfile();
  let chatHistory = [];

  while (true) {
    resetInactivityTimer(); // Reset inactivity timer on each user input

    const userInput = readlineSync.question(colors.bold.blue(`You: `));

    if (
      userInput.startsWith("/") ||
      userInput === "help" ||
      userInput === "exit"
    ) {
      chatHistory = await processCommand(userInput, chatHistory);
      continue;
    }

    if (userInput.toLowerCase() === "summarize") {
      const summary = await summarizeConversation(modelAI, chatHistory);
      console.log(colors.bold.green(`Summary: ${summary}`));
      continue;
    }

    // Analyze sentiment
    detectSentiment(userInput);

    // Build the prompt with the profile and chat history
    const prompt =
      `${profile}\n\n` +
      chatHistory
        .map(([role, content]) => `${role}: ${content}`)
        .concat(`user: ${userInput}\nassistant:`)
        .join("\n");

    // Get response from the model with retry logic
    const completionText = await getResponseWithRetry(modelAI, prompt);

    if (completionText) {
      console.log(colors.bold.green(`Bot: ${completionText}`));

      // Update chat history and log the conversation
      updateChatHistory(chatHistory, "user", userInput);
      updateChatHistory(chatHistory, "assistant", completionText);
      logChat("user", userInput);
      logChat("assistant", completionText);
    }
  }
}

// getting the answer of a prompt example
// async function main() {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   console.log(colors.bold.green(Welcome to the Chatbot GPTJS));
//   console.log(colors.bold.green(You can start chatting with the bot));
//   console.log(colors.bold.blue("You: ") + "What is the capital of Egypt?");
//   console.log(colors.bold.yellow("Processing..."));
//   const prompt = "What is the capital of Egypt?";

//   const result = await model.generateContent(prompt);
//   console.log(colors.green("Bot: ") + result.response.text());

//   console.log(colors.yellow("Test Finished!!"));
// }

// Start the chatbot
main();

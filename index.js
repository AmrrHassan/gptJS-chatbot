import { modelAI } from "./config/gemini-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";
import { handleCommands } from "./src/commands.js";
import { updateChatHistory } from "./src/history.js";
import { resetInactivityTimer } from "./src/inactivity.js";
import { logChat } from "./src/logger.js";
import { getResponseWithRetry } from "./src/retries.js";
// import { startSpeechRecognition } from "./speech.js";

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

  let chatHistory = [];

  while (true) {
    resetInactivityTimer();

    const userInput = readlineSync.question(colors.bold.blue(`You: `));
    if (
      userInput.startsWith("/") ||
      userInput == "help" ||
      userInput == "exit"
    ) {
      if (userInput == "exit") {
        console.log(colors.bold.green(`Exiting Chatbot GPTJS`));
        process.exit(0);
      }
      console.log(
        colors.bold.yellow(
          `Commands:\nexit - Exit the chatbot\nclear - Clear chat history\nsave - Save chat history\nload - Load chat history`
        )
      );
      const commandResult = await handleCommands(chatHistory);
      if (commandResult !== null) chatHistory = commandResult; // If we load a file, update chatHistory
      continue;
    }

    const prompt = chatHistory
      .map(([role, content]) => `${role}: ${content}`)
      .concat(`user: ${userInput}\nassistant:`)
      .join("\n");

    const completionText = await getResponseWithRetry(modelAI, prompt);

    if (completionText) {
      console.log(colors.bold.green(`Bot: ${completionText}`));
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
//   console.log(colors.bold.green(`Welcome to the Chatbot GPTJS`));
//   console.log(colors.bold.green(`You can start chatting with the bot`));
//   console.log(colors.bold.blue("You: ") + "What is the capital of Egypt?");
//   console.log(colors.bold.yellow("Processing..."));
//   const prompt = "What is the capital of Egypt?";

//   const result = await model.generateContent(prompt);
//   console.log(colors.green("Bot: ") + result.response.text());

//   console.log(colors.yellow("Test Finished!!"));
// }

main();

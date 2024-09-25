import { modelAI, genAI } from "./config/gemini-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

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

async function main() {
  console.log(colors.bold.green(`Welcome to the Chatbot GPTJS`));
  console.log(colors.bold.green(`You can start chatting with the bot`));

  const ChatHistory = [];

  // infite loop
  while (true) {
    const userInput = readlineSync.question(colors.bold.blue(`You: `));

    try {
      let prompt = ChatHistory.map(
        ([role, content]) => `${role}: ${content}`
      ).join("\n");
      prompt += `\nuser: ${userInput}\nassistant:`;

      // call api with user input
      const result = await modelAI.generateContent(prompt);

      // Get completion text/content
      const completionText = result.response.text();
      // call api with user input
      if (userInput.toLowerCase() === "exit") {
        console.log(colors.bold.green(`Kill GBPTJS`));
        return; // exit the program
      }
      console.log(colors.bold.green("Bot: " + completionText));

      // Update history with user input and assistant response
      ChatHistory.push(["user", userInput]);
      ChatHistory.push(["assistant", completionText]);
    } catch (e) {
      console.error(colors.red(e));
    }
  }
}

main();

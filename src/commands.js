import fs from "fs";
import colors from "colors";
import readlineSync from "readline-sync";

export const handleCommands = (chatHistory) => {
  return new Promise((resolve, reject) => {
    const command = readlineSync
      .question(colors.bold.blue("Command: "))
      .toLowerCase();

    switch (command) {
      case "help":
        console.log(
          colors.bold.yellow(
            `Commands:\nexit - Exit the chatbot\nclear - Clear chat history\nsave - Save chat history\nload - Load chat history`
          )
        );
        resolve(null);
        break;

      case "clear":
        chatHistory.length = 0;
        console.log(colors.bold.yellow(`Chat history cleared.`));
        resolve(null);
        break;

      case "save":
        const saveFileName = readlineSync.question(
          colors.bold.yellow("Enter file name to save (without extension): ")
        );
        fs.writeFileSync(
          `${saveFileName}.json`,
          JSON.stringify(chatHistory, null, 2)
        );
        console.log(
          colors.bold.green(`Chat history saved to ${saveFileName}.json.`)
        );
        resolve(null);
        break;

      case "load":
        const loadFileName = readlineSync.question(
          colors.bold.yellow("Enter file name to load (without extension): ")
        );
        if (fs.existsSync(`${loadFileName}.json`)) {
          const loadedHistory = JSON.parse(
            fs.readFileSync(`${loadFileName}.json`, "utf8")
          );
          console.log(
            colors.bold.green(`Chat history loaded from ${loadFileName}.json.`)
          );
          resolve(loadedHistory);
        } else {
          console.log(colors.bold.red(`File ${loadFileName}.json not found.`));
          resolve(null);
        }
        break;

      case "exit":
        console.log(colors.bold.green(`Exiting Chatbot GPTJS`));
        process.exit(0);
        break;

      default:
        console.log(
          colors.bold.red(
            `Unknown command. Type 'help' for a list of available commands.`
          )
        );
        resolve(null);
        break;
    }
  });
};

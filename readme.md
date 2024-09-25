# GPTJS - Terminal Chatbot using Gemini AI 1.5

## Description
This is a simple terminal-based chatbot built using Gemini AI 1.5 for fast, small requests. The chatbot simulates a conversation, allowing users to ask questions in real-time and receive AI-generated responses.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Gemini AI API Key

### Steps to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/gptjs-chatbot.git
   cd gptjs-chatbot


### Chatbot Setup

This project uses the Gemini AI API to power a chatbot.

Prerequisites:

Node.js and npm installed on your system.
Installation:

- Clone this repository or download the files.
- Open a terminal in the project directory.
- Run npm install to install dependencies.

#### Configuration:

- Create a file named .env in the project root directory.
- Add your Gemini AI API key to the .env file with the following format:
- GEMINI_API_KEY=your_api_key_here
- Running the 

- Run node chatbot.js in your terminal.
- Testing Example (Optional):

The code includes an optional commented-out section in chatbot.js that demonstrates how to run the chatbot with a pre-defined prompt for testing purposes. You can uncomment this section, run the script, observe the output, and then recomment it for interactive use.

   ```bash
async function main() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  console.log(colors.bold.green(`Welcome to the Chatbot GPTJS`));
  console.log(colors.bold.green(`You can start chatting with the bot`));
  console.log(colors.bold.blue("You: ") + "What is the capital of Egypt?");
  console.log(colors.bold.yellow("Processing..."));
  const prompt = "What is the capital of Egypt?";

  const result = await model.generateContent(prompt);
  console.log(colors.green("Bot: ") + result.response.text());

  console.log(colors.yellow("Test Finished!!"));



License:

This project is licensed under the MIT License.
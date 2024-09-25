

# Project Documentation
=========================

## Overview
-----------

GPTJS is a simple terminal-based chatbot built using Gemini AI 1.5 for fast, small requests. The chatbot simulates a conversation, allowing users to ask questions in real-time and receive AI-generated responses.

### Features


* **Real-time Conversations**: Engage in natural-sounding conversations with the chatbot, receiving responses in real-time.
* **Gemini AI Integration**: Leverage the power of Gemini AI 1.5 to generate human-like responses to user input.
* **Simple and Easy-to-Use Interface**: Interact with the chatbot using a straightforward command-line interface.
* **Chat History**: View and manage chat history within the chatbot interface.
* **Logging**: Chatbot interactions are logged to a file for later review.
* **Save and Load Chat**: Save and load chat histories to and from files.
* **Audio (Coming Soon)**: Engage in voice-based conversations with the chatbot using speech-to-text.


### Configuration and Setup

* **Gemini AI API Key**: Configure the chatbot to use your Gemini AI API key for authentication.
* **Node.js and npm**: Ensure you have Node.js (v14 or higher) and npm installed on your system.
* **.env File**: Create a `.env` file in the project root directory to store your Gemini AI API key.

### Additional Features

* **Command-Line Interface**: Use commands to interact with the chatbot, including:
	+ `help`: Display available commands and usage.
	+ `exit`: Exit the chatbot.
	+ `clear`: Clear the chat history.
	+ `save`: Save the chat history to a file.
	+ `load`: Load a saved chat history from a file.
* **Chat History Management**: Save and load chat histories to and from files.
* **Inactivity Timer**: The chatbot will exit after a period of inactivity (configurable).

### Setup Instructions

#### Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo/gptjs-chatbot.git
```

#### Step 2: Change into the Project Directory

```bash
cd gptjs-chatbot
```

#### Step 3: Install Dependencies

```bash
npm install
```

#### Step 4: Create a .env File

Create a `.env` file in the project root directory and add your Gemini AI API key:

```makefile
GEMINI_API_KEY=your_api_key_here
```

#### Step 5: Run the Chatbot

```bash
node chatbot.js
```

### Testing and Example Use Cases

* Run the chatbot with a pre-defined prompt for testing purposes (optional).
* Engage in conversations with the chatbot, asking questions and receiving responses.

### License

This project is licensed under the MIT License.
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.G_API_KEY);
const modelAI = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export { genAI, modelAI };

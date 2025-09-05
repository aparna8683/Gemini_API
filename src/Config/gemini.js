import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAaeSvZh_h53L3CVBYK7b6Zu1fjdqIp0Ug"; 
const genAI = new GoogleGenerativeAI(API_KEY);

const MODEL_NAME = "gemini-1.5-flash";

async function runChat(prompt) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const chat = model.startChat({
    generationConfig: {
      temperature: 0.9,   // randomness of response
      topK: 1,            // controls diversity
      topP: 1,            // controls probability mass
      maxOutputTokens: 2048, // max response length
    },
    history: [], // keeps chat memory, can add messages here
  });

  // Send the user’s question
  const result = await chat.sendMessage(prompt);
  const response = result.response;

  console.log("User:", prompt);
  console.log("Gemini:", response.text());
}

// Example usage:
runChat("Explain how AI works in a few words");
runChat("What is the capital of France?");
runChat("Write a short poem about stars.");
export default runChat;

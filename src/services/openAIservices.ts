import OpenAI from "openai";

// Define the OpenAI message format interface
interface OpenAIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
if (!apiKey) {
  console.error("❌ OpenAI API Key is missing!");
}

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true, // Note: Only use this for development/demos
});

export const getChatResponse = async (message: string, previousMessages: OpenAIMessage[] = []) => {
  try {
    // Include conversation history for context
    const messages: OpenAIMessage[] = [
      ...previousMessages,
      { role: "user", content: message }
    ];
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "Sorry, I couldn't process that.";
  }
};
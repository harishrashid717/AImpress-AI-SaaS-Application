import OpenAI from "openai";

const generateContent = async (prompt, length) => {
  const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
  try {
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature : 0.7,
      max_tokens : length
    });
    const contentResponse =  response.choices[0].message;
    const contentText = contentResponse.content || ''; 
    return contentText;
  } catch (error) {
    error.message ||= 'Failed to generate the Content';
    error.statusCode = error.status || 500;
    throw error;
  }
};
export default generateContent;

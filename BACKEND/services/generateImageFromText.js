import axios from "axios";
import FormData from "form-data";

export const generateImageFromText = async (prompt) => {
  try {
    const form = new FormData();
    form.append("prompt", prompt);

    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      form,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer", 
      }
    );

    const data =  response.data; 
    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;    
    return base64Image;
  } catch (error) {
    error.message ||= "Failed to generate the image"
    error.statusCode = error.status || 500;
    throw error;
  }
};

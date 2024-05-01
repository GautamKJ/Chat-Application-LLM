const { GoogleGenerativeAI } = require("@google/generative-ai");


const apiKey = process.env.API_KEY;


const genAI = new GoogleGenerativeAI(apiKey);


async function run(prompt) {
  try { 

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });


    const generatePromise = model.generateContent(prompt);

    // Create a promise for the timeout
    const timeoutPromise = new Promise((resolve, reject) => {
      
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        reject(new Error("Timeout: Response from the API took too long"));
      }, 10000);
    });

    
    // Execute the generateContent call and handle the response
    const result = await Promise.race([generatePromise, timeoutPromise]);

    

    
    if (!result.text) {
      const response = await result.response;
      const text = await response.text();
      return text;
    }
    else
    {
      return "User is unavailable at the moment";  
    } 
  } catch (error) {
    console.error("Error generating content:", error);
    return "User is unavailable at the moment";
  }
}

// Export the run function
module.exports = run;

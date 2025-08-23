
import { GoogleGenAI, Type } from "@google/genai";
import type { DiagnosisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const analyzeImage = async (imageFile: File): Promise<DiagnosisResult[]> => {
  const imagePart = await fileToGenerativePart(imageFile);
  const prompt = "Analyze this X-ray image. Identify potential medical conditions and provide a probability for each. Also, give a brief, simple explanation for your reasoning based on visual features. Focus on common, illustrative findings.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
            { text: prompt },
            imagePart
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              condition: {
                type: Type.STRING,
                description: 'The name of the potential medical condition identified.'
              },
              probability: {
                type: Type.NUMBER,
                description: 'A probability score between 0 and 1.'
              },
              explanation: {
                type: Type.STRING,
                description: 'A brief explanation for the diagnosis based on visual evidence in the image.'
              }
            },
            required: ["condition", "probability", "explanation"],
          },
        },
        temperature: 0.2, // Lower temperature for more deterministic, fact-based responses
      }
    });

    const jsonText = response.text.trim();
    const parsedResults = JSON.parse(jsonText);
    
    // Validate and sort results
    if (!Array.isArray(parsedResults)) {
      throw new Error("AI response is not in the expected format.");
    }

    const validResults: DiagnosisResult[] = parsedResults
      .filter(item => 
        typeof item.condition === 'string' &&
        typeof item.probability === 'number' &&
        typeof item.explanation === 'string'
      )
      .sort((a, b) => b.probability - a.probability);
    
    return validResults;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The AI model could not process the image. It might not be a valid X-ray or there was an issue with the service.");
  }
};


import { Type } from "@google/genai";

export const SYSTEM_PROMPT = `You are a world-class Software Architect and Educator. 
Your goal is to explain code to non-technical audiences (parents, recruiters, high school students) using storytelling and analogies.
Avoid technical jargon unless you explain it gently.
Be friendly, conversational, and accurate.
If the code is ambiguous, state your uncertainty clearly.
Always return the response in a structured JSON format.`;

export const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A catchy, non-technical title for the explanation." },
    algorithmType: { type: Type.STRING, description: "The type of algorithm identified (e.g., Searching, Sorting)." },
    bigPictureStory: { type: Type.STRING, description: "A 2-3 sentence overview of what the code is trying to achieve as a story." },
    whyThisExists: { type: Type.STRING, description: "The fundamental problem this code solves in real life." },
    realWorldAnalogy: {
      type: Type.OBJECT,
      properties: {
        scenario: { type: Type.STRING, description: "A detailed real-world analogy (e.g., finding a book in a library)." },
        mapping: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              codePart: { type: Type.STRING, description: "The code element (e.g., 'The variable i')." },
              analogyPart: { type: Type.STRING, description: "What it represents in the story (e.g., 'The librarian's finger')." }
            },
            required: ["codePart", "analogyPart"]
          }
        }
      },
      required: ["scenario", "mapping"]
    },
    stepByStepStory: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.NUMBER },
          description: { type: Type.STRING, description: "A narrative description of this step in the process." }
        },
        required: ["step", "description"]
      }
    },
    gentleTechnicalTranslation: { type: Type.STRING, description: "A bridge between the story and the code, explaining 1-2 key technical terms used." },
    ifThisBreaks: { type: Type.STRING, description: "What happens in the real-world story if this code fails or hits an error?" },
    commonMistakes: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Things beginners often get wrong with this logic." },
    improvementIdeas: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Simple ways to make this process better/faster." }
  },
  required: [
    "title", "algorithmType", "bigPictureStory", "whyThisExists", "realWorldAnalogy", 
    "stepByStepStory", "gentleTechnicalTranslation", "ifThisBreaks", "commonMistakes", "improvementIdeas"
  ]
};

export const EXAMPLE_CODE = `// Example: Binary Search in Java
public int binarySearch(int[] arr, int x) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == x) return mid;
        if (arr[mid] < x) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`;

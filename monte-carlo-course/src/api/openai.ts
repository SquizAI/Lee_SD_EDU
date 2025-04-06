import axios from 'axios';

// For local development only - API key is not exposed in production
const isDevelopment = import.meta.env.MODE === 'development';
const API_URL = import.meta.env.VITE_API_URL || 'https://api.openai.com/v1';
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Use the API client only in development mode
const openaiClient = isDevelopment ? axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
}) : null;

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

// For structured API response
export type ConceptExplanation = {
  title: string;
  summary: string;
  detailed_explanation: string;
  examples?: string[];
  related_concepts?: string[];
};

export type ExerciseSolution = {
  problem_statement: string;
  solution_steps: string[];
  code_example?: string;
  visualization_data?: any;
  additional_resources?: string[];
};

export type TutorResponse = {
  response_type: 'concept_explanation' | 'exercise_solution' | 'general_answer';
  content: ConceptExplanation | ExerciseSolution | string;
};

// Schema for structured output
const responseSchema = {
  type: 'object',
  properties: {
    response_type: {
      type: 'string',
      enum: ['concept_explanation', 'exercise_solution', 'general_answer']
    },
    content: {
      oneOf: [
        {
          type: 'object',
          properties: {
            title: { type: 'string' },
            summary: { type: 'string' },
            detailed_explanation: { type: 'string' },
            examples: { 
              type: 'array',
              items: { type: 'string' }
            },
            related_concepts: {
              type: 'array',
              items: { type: 'string' }
            }
          },
          required: ['title', 'summary', 'detailed_explanation']
        },
        {
          type: 'object',
          properties: {
            problem_statement: { type: 'string' },
            solution_steps: { 
              type: 'array',
              items: { type: 'string' }
            },
            code_example: { type: 'string' },
            visualization_data: { type: 'object' },
            additional_resources: {
              type: 'array',
              items: { type: 'string' }
            }
          },
          required: ['problem_statement', 'solution_steps']
        },
        { type: 'string' }
      ]
    }
  },
  required: ['response_type', 'content']
};

// Mock data for production deployment
const mockResponses: Record<string, TutorResponse> = {
  'default': {
    response_type: 'concept_explanation',
    content: {
      title: 'Monte Carlo Methods',
      summary: 'Monte Carlo methods are computational algorithms that use repeated random sampling to obtain numerical results.',
      detailed_explanation: 'Monte Carlo methods are a broad class of computational algorithms that rely on repeated random sampling to obtain numerical results. The core idea is to use randomness to solve problems that might be deterministic in principle.',
      examples: ['Monte Carlo integration', 'Monte Carlo simulation for risk assessment', 'Markov Chain Monte Carlo for Bayesian inference'],
      related_concepts: ['Random sampling', 'Law of large numbers', 'Probabilistic approximation']
    }
  },
  'hello': {
    response_type: 'general_answer',
    content: 'Hello! I\'m your Monte Carlo methods tutor. How can I help you today? Would you like to learn about basic concepts, applications, or specific algorithms?'
  }
};

export const getChatCompletion = async (
  messages: ChatMessage[],
  systemPrompt: string = 'You are a helpful Monte Carlo algorithms tutor.'
): Promise<TutorResponse> => {
  try {
    // In production, return mock data
    if (!isDevelopment || !openaiClient) {
      const userMessage = messages.find(m => m.role === 'user')?.content.toLowerCase().trim() || '';
      const mockResponse = mockResponses[userMessage] || mockResponses['default'];
      return new Promise(resolve => setTimeout(() => resolve(mockResponse), 500));
    }
    
    // In development, use the OpenAI API
    // Add system message if not already present
    if (!messages.some(m => m.role === 'system')) {
      messages = [{ role: 'system', content: systemPrompt }, ...messages];
    }

    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-4-turbo-preview',
      messages,
      response_format: { type: 'json_object', schema: responseSchema },
      temperature: 0.2,
    });

    const data = response.data;
    const tutorResponse: TutorResponse = JSON.parse(data.choices[0].message.content);
    return tutorResponse;
  } catch (error) {
    console.error('Error getting chat completion:', error);
    return {
      response_type: 'general_answer',
      content: 'Sorry, I encountered an error processing your request. Please try again.'
    };
  }
};

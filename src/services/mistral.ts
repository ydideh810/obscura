import MistralClient from '@mistralai/mistralai';
import type { AlgorithmRequest, AlgorithmResponse } from '../types';

const client = new MistralClient(import.meta.env.VITE_MISTRAL_API_KEY || '');

const MODEL = 'open-codestral-mamba';

const generateSystemPrompt = (request: AlgorithmRequest) => `You are an expert algorithm developer. Generate a solution in ${request.language} with the following constraints:

Provide the solution in the following format:
1. Code implementation
2. Step-by-step explanation
3. Time and space complexity analysis
4. Usage examples
5. Edge cases to consider

Be precise and efficient in your implementation.`;

const parseResponse = (content: string): AlgorithmResponse => {
  const sections = content.split('\n\n');
  
  // Extract code block
  const codeMatch = content.match(/\`\`\`(?:\w+)?\n([\s\S]*?)\`\`\`/);
  const code = codeMatch ? codeMatch[1].trim() : '';
  
  // Extract explanation
  const explanationMatch = content.match(/Explanation:([\s\S]*?)(?=Time|Space Complexity|$)/i);
  const explanation = explanationMatch 
    ? explanationMatch[1].trim().split('\n').map(line => line.trim()).filter(Boolean)
    : [];
    
  // Extract complexities
  const timeMatch = content.match(/Time Complexity:([^\n]*)/i);
  const spaceMatch = content.match(/Space Complexity:([^\n]*)/i);
  
  // Extract examples
  const examplesMatch = content.match(/Examples:([\s\S]*?)(?=Edge Cases|$)/i);
  const examples = examplesMatch
    ? examplesMatch[1].trim().split('\n').map(line => line.trim()).filter(Boolean)
    : [];
    
  // Extract edge cases
  const edgeMatch = content.match(/Edge Cases:([\s\S]*?)$/i);
  const edgeCases = edgeMatch
    ? edgeMatch[1].trim().split('\n').map(line => line.trim()).filter(Boolean)
    : [];

  return {
    code,
    explanation,
    timeComplexity: (timeMatch ? timeMatch[1].trim() : 'Not specified'),
    spaceComplexity: (spaceMatch ? spaceMatch[1].trim() : 'Not specified'),
    examples,
    edgeCases
  };
};

export const generateAlgorithm = async (request: AlgorithmRequest): Promise<AlgorithmResponse> => {
  const messages = [
    { role: 'system', content: generateSystemPrompt(request) },
    { role: 'user', content: request.prompt }
  ];

  try {
    const response = await client.chat({
      model: MODEL,
      messages,
      temperature: 0.7,
      maxTokens: 2048
    });

    const content = response.choices[0].message.content;
    return parseResponse(content);
  } catch (error) {
    console.error('Mistral API Error:', error);
    throw new Error('Failed to generate algorithm. Please try again.');
  }
};
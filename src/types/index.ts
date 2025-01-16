export type Language = {
  id: string;
  name: string;
  extension: string;
};

export type AlgorithmRequest = {
  prompt: string;
  language: string;
};

export type AlgorithmResponse = {
  code: string;
  explanation: string[];
  timeComplexity: string;
  spaceComplexity: string;
  examples: string[];
  edgeCases: string[];
};

export type CommandHistoryItem = {
  command: string;
  timestamp: number;
};
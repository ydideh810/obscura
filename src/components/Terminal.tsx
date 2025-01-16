import React, { useState } from 'react';
import type { AlgorithmRequest, AlgorithmResponse } from '../types';
import GenerateForm from './GenerateForm';
import { generateAlgorithm } from '../services/mistral';
import CodeEditor from './CodeEditor';

const Terminal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] =
    useState<AlgorithmResponse | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState('python');

  const handleFormSubmit = async (request: AlgorithmRequest) => {
    try {
      setIsLoading(true);
      setCurrentLanguage(request.language);
      const response = await generateAlgorithm(request);
      setCurrentResponse(response);
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 font-['JetBrains_Mono']">
      <div className="max-w-3xl w-full mx-auto space-y-4">
        <div className="terminal-box mb-4">
          <div className="terminal-header">ANTLOG v1.0</div>
          <div className="p-8 text-center">
            <h1 className="pixel-text pixel-title">OBSCURA</h1>
            <div className="space-y-1">
              <p className="pixel-text pixel-subtitle">Ready for Input</p>
              <p
                className="pixel-text"
                style={{ fontSize: '10px', marginTop: '16px' }}
              >
                © NIDAM All rights reserved (2025)
              </p>
            </div>
          </div>
        </div>

        <div className="terminal-box">
          <div className="terminal-header">COMMAND INPUT</div>
          <div className="p-4">
            <GenerateForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        </div>

        <div className="terminal-box">
          <div className="terminal-header">ALGORITHM OUTPUT</div>
          <div className="p-4">
            <CodeEditor response={currentResponse} language={currentLanguage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;

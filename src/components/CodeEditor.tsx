import React from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Check } from 'lucide-react';
import type { AlgorithmResponse } from '../types';

interface CodeEditorProps {
  response: AlgorithmResponse | null;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ response, language }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (response) {
      await navigator.clipboard.writeText(response.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!response) {
    return (
      <div className="h-full flex items-center justify-center opacity-80">
        <p className="text-center">
          Generate an algorithm to see the code here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="h-[400px] border border-[var(--terminal-blue)] overflow-hidden relative">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 z-10 p-1.5 bg-[var(--terminal-bg)] border border-[var(--terminal-blue)] hover:border-[var(--terminal-blue-bright)] transition-colors duration-200"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[var(--terminal-blue-bright)]" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>

        <Editor
          height="100%"
          defaultLanguage={language}
          value={response.code}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            readOnly: true,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      
      <div className="space-y-6 text-sm">
        <section>
          <h3 className="font-bold mb-2">Explanation</h3>
          <ul className="space-y-1 opacity-80">
            {response.explanation.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-bold mb-2">Complexity</h3>
          <div className="space-y-1 opacity-80">
            <p>Time: {response.timeComplexity}</p>
            <p>Space: {response.spaceComplexity}</p>
          </div>
        </section>

        <section>
          <h3 className="font-bold mb-2">Examples</h3>
          <ul className="space-y-1 opacity-80">
            {response.examples.map((example, i) => (
              <li key={i}>{example}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-bold mb-2">Edge Cases</h3>
          <ul className="space-y-1 opacity-80">
            {response.edgeCases.map((edge, i) => (
              <li key={i}>{edge}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CodeEditor;
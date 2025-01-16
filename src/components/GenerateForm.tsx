import React, { useState } from 'react';
import { Code2, Brain, Lightbulb, GraduationCap, Briefcase } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../constants';
import type { AlgorithmRequest } from '../types';
import clsx from 'clsx';

const STARTER_PROMPTS = [
  {
    id: 'creative',
    label: 'Creative Writing',
    icon: Brain,
    prompt: 'Generate an algorithm that creates unique story plots by combining different genres, characters, and plot elements.',
  },
  {
    id: 'problem',
    label: 'Problem Solving',
    icon: Lightbulb,
    prompt: 'Create an efficient pathfinding algorithm that finds the shortest route between two points while avoiding obstacles.',
  },
  {
    id: 'learning',
    label: 'Learning Tools',
    icon: GraduationCap,
    prompt: 'Design an algorithm that generates personalized practice problems based on a student\'s learning level and past performance.',
  },
  {
    id: 'professional',
    label: 'Professional Dev',
    icon: Briefcase,
    prompt: 'Implement a robust data validation and sanitization algorithm for processing user input in a secure web application.',
  },
];

interface GenerateFormProps {
  onSubmit: (request: AlgorithmRequest) => void;
  isLoading: boolean;
}

const GenerateForm: React.FC<GenerateFormProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('python');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      prompt,
      language,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {STARTER_PROMPTS.map((starter) => {
          const Icon = starter.icon;
          return (
            <button
              key={starter.id}
              type="button"
              onClick={() => setPrompt(starter.prompt)}
              className="p-6 flex flex-col items-center gap-4 text-center group pixel-button"
            >
              <Icon className="w-8 h-8 group-hover:text-[var(--terminal-bg)]" />
              <span className="font-bold">{starter.label}</span>
            </button>
          );
        })}
      </div>

      <div>
        <label className="block mb-4 pixel-text">Algorithm Description</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="pixel-input h-32"
          placeholder="Describe the algorithm you need..."
          required
        />
      </div>

      <div>
        <div>
          <label className="flex items-center gap-2 mb-4 pixel-text">
            <Code2 className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Language</span>
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="pixel-input"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 pixel-button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating...' : 'Generate Algorithm'}
      </button>
    </form>
  );
};

export default GenerateForm;
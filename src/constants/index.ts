export const SUPPORTED_LANGUAGES: Language[] = [
  { id: 'python', name: 'Python', extension: 'py' },
  { id: 'javascript', name: 'JavaScript', extension: 'js' },
  { id: 'typescript', name: 'TypeScript', extension: 'ts' },
  { id: 'java', name: 'Java', extension: 'java' },
  { id: 'cpp', name: 'C++', extension: 'cpp' },
  { id: 'rust', name: 'Rust', extension: 'rs' },
  { id: 'go', name: 'Go', extension: 'go' },
  { id: 'ruby', name: 'Ruby', extension: 'rb' },
  { id: 'csharp', name: 'C#', extension: 'cs' },
  { id: 'swift', name: 'Swift', extension: 'swift' },
];

export const INITIAL_MESSAGE = `
Welcome to Obscura - Algorithm Generation Platform
------------------------------------------------
Version 1.0.0 (c) 2024

Type 'help' for available commands
Press 'Tab' for command completion
Use ↑↓ to navigate command history

Ready.
`;

export const HELP_TEXT = `
Available Commands:
------------------
generate <prompt> [-l language] [-c complexity] [-m memory]
  Generate algorithm based on prompt
  Options:
    -l, --language    Specify programming language
    -c, --complexity  Desired time complexity
    -m, --memory      Memory constraint

clear
  Clear the terminal screen

history
  Show command history

help
  Show this help message

Examples:
  generate "binary search algorithm" -l python -c "O(log n)"
  generate "merge sort" -l typescript -m minimal
`;
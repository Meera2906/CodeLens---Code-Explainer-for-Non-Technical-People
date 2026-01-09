import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { ProgrammingLanguage } from '../types';

declare global {
  interface Window {
    Prism: any;
  }
}

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: ProgrammingLanguage;
  setLanguage: (lang: ProgrammingLanguage) => void;
  onExplain: () => void;
  isLoading: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, language, setLanguage, onExplain, isLoading }) => {
  const highlightCode = (input: string) => {
    const prismLang = language === 'auto' ? 'clike' : language;
    if (window.Prism && window.Prism.languages[prismLang]) {
      return window.Prism.highlight(input, window.Prism.languages[prismLang], prismLang);
    }
    return input;
  };

  const handleClear = () => setCode('');

  return (
    <div className="relative group transition-all duration-500 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl bg-[#0b1120] star-bg flex flex-col h-[600px]">
      {/* Header Overlay Badge & Controls */}
      <div className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-4 bg-gradient-to-b from-[#0b1120] to-transparent">
        <div className="flex gap-2">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as ProgrammingLanguage)}
            className="text-[10px] bg-slate-800/80 backdrop-blur-md text-slate-300 border border-slate-700/50 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all cursor-pointer"
          >
            <option value="auto">Auto-detect</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button 
            onClick={handleClear}
            className="text-[10px] bg-slate-800/80 backdrop-blur-md text-slate-400 border border-slate-700/50 px-2 py-1 rounded hover:text-red-400 hover:bg-red-900/20 transition-all"
          >
            Clear
          </button>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/50 px-3 py-1 rounded text-[10px] font-black text-slate-400 tracking-widest uppercase">
          Code Input
        </div>
      </div>
      
      {/* Editor Surface - With Custom Scrollbar */}
      <div className="npm-editor-container flex-grow overflow-auto custom-scrollbar pt-16 pb-32">
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlightCode(code)}
          padding={32}
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 14,
            minHeight: '100%',
            backgroundColor: 'transparent'
          }}
          className="text-slate-100"
          textareaClassName="outline-none min-h-full"
          placeholder="// Paste your code here..."
        />
      </div>

      {/* Bottom Action Area (Floating) */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/90 to-transparent z-20">
        <button
          onClick={onExplain}
          disabled={isLoading || !code.trim()}
          className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all transform active:scale-[0.98] ${
            isLoading || !code.trim() 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : 'bg-[#5b52f9] text-white hover:bg-[#4a41e6] shadow-[0_10px_30px_-10px_rgba(91,82,249,0.5)]'
          }`}
        >
          {isLoading ? (
            <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Explain as a Story
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeInput;
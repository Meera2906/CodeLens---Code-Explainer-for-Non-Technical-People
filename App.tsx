import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import ResultView from './components/ResultView';
import { ProgrammingLanguage, ExplanationState } from './types';
import { geminiService } from './services/geminiService';
import { EXAMPLE_CODE } from './constants';

const App: React.FC = () => {
  const [code, setCode] = useState(EXAMPLE_CODE);
  const [language, setLanguage] = useState<ProgrammingLanguage>('auto');
  const [darkMode, setDarkMode] = useState(true); // Defaulting to true for that premium aesthetic
  const [state, setState] = useState<ExplanationState>({
    loading: false,
    error: null,
    result: null,
  });

  // Apply dark mode class to root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleExplain = useCallback(async () => {
    if (!code.trim()) return;

    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const explanation = await geminiService.explainCode(code, language);
      setState({
        loading: false,
        error: null,
        result: explanation,
      });
      // Scroll to result on small screens
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setState({
        loading: false,
        error: err.message || "Something went wrong while generating the explanation.",
        result: null,
      });
    }
  }, [code, language]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${darkMode ? 'bg-[#0b1120] star-bg text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Header />

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 pt-10">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all transform active:scale-95 ${
              darkMode 
                ? 'bg-slate-800 text-yellow-400 border border-slate-700 hover:bg-slate-700 shadow-xl' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 shadow-sm'
            }`}
          >
            {darkMode ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-6 space-y-8">
            <div className="animate-in fade-in slide-in-from-left-4 duration-700">
              <h2 className={`text-3xl font-black mb-4 ${darkMode ? 'text-white' : 'text-slate-800'} tracking-tight`}>Algorithm Pastebin</h2>
              <p className={`text-sm leading-relaxed mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Teachers: Paste your code here. We'll break it down into a story that anyone can understand.
              </p>
              <CodeInput 
                code={code}
                setCode={setCode}
                language={language}
                setLanguage={setLanguage}
                onExplain={handleExplain}
                isLoading={state.loading}
              />
            </div>

            <div className={`border p-6 rounded-2xl transition-all duration-500 transform hover:-translate-y-1 ${darkMode ? 'bg-indigo-900/10 border-indigo-500/20' : 'bg-blue-100/20 border-blue-200 shadow-sm'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-indigo-500/20' : 'bg-blue-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${darkMode ? 'text-indigo-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-indigo-400' : 'text-blue-600'}`}>Teacher Tip</h4>
              </div>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-indigo-200/70' : 'text-blue-800/70'}`}>
                Storytelling works best with <strong>Searching</strong>, <strong>Sorting</strong>, or <strong>Filtering</strong> logic. It helps students visualize data as physical objects!
              </p>
            </div>
          </div>

          {/* Right Column: Results */}
          <div id="result-section" className="lg:col-span-6">
            {!state.result && !state.loading && !state.error && (
              <div className={`h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-[2.5rem] transition-all duration-700 ${darkMode ? 'bg-slate-800/10 border-slate-800/50' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className={`${darkMode ? 'bg-slate-800/50' : 'bg-slate-50'} p-8 rounded-full mb-8 transition-transform hover:scale-110 duration-500`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-slate-500 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Ready to Translate</h3>
                <p className={`text-sm max-w-xs mt-4 leading-relaxed ${darkMode ? 'text-slate-600' : 'text-slate-500'}`}>
                  Your algorithm is a secret code. Click <strong>"Explain as a Story"</strong> to reveal the human meaning hidden inside.
                </p>
              </div>
            )}

            {state.loading && (
              <div className="space-y-10 animate-in fade-in duration-700">
                <div className={`h-48 rounded-3xl w-full animate-pulse ${darkMode ? 'bg-slate-800/50' : 'bg-slate-200'}`}></div>
                <div className={`h-12 rounded-xl w-1/3 animate-pulse ${darkMode ? 'bg-slate-800/50' : 'bg-slate-200'}`}></div>
                <div className={`h-[400px] rounded-3xl w-full animate-pulse ${darkMode ? 'bg-slate-800/50' : 'bg-slate-200'}`}></div>
              </div>
            )}

            {state.error && (
              <div className={`border p-10 rounded-3xl text-center animate-in zoom-in duration-300 ${darkMode ? 'bg-red-900/10 border-red-500/20' : 'bg-red-50 border-red-100'}`}>
                <div className="bg-red-100 dark:bg-red-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-red-400' : 'text-red-800'}`}>Analysis Failed</h3>
                <p className={`${darkMode ? 'text-red-300/70' : 'text-red-600/70'} mt-4 mb-8 max-w-sm mx-auto`}>{state.error}</p>
                <button 
                  onClick={handleExplain}
                  className="px-10 py-4 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-900/20"
                >
                  Try Again
                </button>
              </div>
            )}

            {state.result && <ResultView result={state.result} />}
          </div>
        </div>
      </main>

      <footer className={`mt-auto pt-24 pb-10 text-center text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${darkMode ? 'text-slate-700' : 'text-slate-400'}`}>
        <p>CodeLens Educator Suite • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;
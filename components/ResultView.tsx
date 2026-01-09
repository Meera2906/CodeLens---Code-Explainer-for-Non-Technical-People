
import React, { useState } from 'react';
import { ExplanationOutput } from '../types';

interface ResultViewProps {
  result: ExplanationOutput;
}

const ResultView: React.FC<ResultViewProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'steps' | 'details'>('story');

  const Section: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-indigo-600 dark:text-indigo-400">{icon}</span>}
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h3>
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm leading-relaxed text-slate-600 dark:text-slate-300 transition-colors">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-indigo-600 dark:bg-indigo-700 text-white p-8 rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-50 text-xs font-bold uppercase tracking-widest mb-3">
              {result.algorithmType}
            </span>
            <h2 className="text-3xl font-extrabold mb-2">{result.title}</h2>
            <p className="text-indigo-100 italic text-lg opacity-90">"{result.bigPictureStory}"</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur z-10 transition-colors">
        <button 
          onClick={() => setActiveTab('story')}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'story' ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
        >
          1. The Analogy
        </button>
        <button 
          onClick={() => setActiveTab('steps')}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'steps' ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
        >
          2. Step-by-Step
        </button>
        <button 
          onClick={() => setActiveTab('details')}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'details' ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
        >
          3. Deep Dive
        </button>
      </div>

      <div className="py-4">
        {activeTab === 'story' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Section title="Why does this exist?" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
              <p>{result.whyThisExists}</p>
            </Section>

            <Section title="The Real-World Analogy" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}>
              <p className="mb-6">{result.realWorldAnalogy.scenario}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.realWorldAnalogy.mapping.map((m, idx) => (
                  <div key={idx} className="flex flex-col p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-500/20 transition-colors">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-tighter mb-1">In Code</span>
                    <span className="font-mono text-sm text-indigo-900 dark:text-indigo-300 mb-2">{m.codePart}</span>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-tighter mb-1">In Story</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{m.analogyPart}</span>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {activeTab === 'steps' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              The Step-by-Step Story
            </h3>
            <div className="space-y-4">
              {result.stepByStepStory.map((step) => (
                <div key={step.step} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-lg shadow-indigo-200 dark:shadow-none">
                      {step.step}
                    </div>
                    <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 group-last:bg-transparent mt-2"></div>
                  </div>
                  <div className="pb-8 pt-1 flex-grow">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm transition-colors">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
            <Section title="The Gentle Translation" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>}>
              <p>{result.gentleTechnicalTranslation}</p>
            </Section>

            <Section title="What if it breaks?" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}>
              <p className={`font-medium p-3 rounded-lg border flex items-start gap-2 transition-colors ${
                document.documentElement.classList.contains('dark') 
                  ? 'bg-red-900/20 border-red-500/30 text-red-300' 
                  : 'bg-red-50 border-red-100 text-red-700'
              }`}>
                <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {result.ifThisBreaks}
              </p>
            </Section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl border transition-colors ${
                document.documentElement.classList.contains('dark') 
                  ? 'bg-orange-900/20 border-orange-500/30 text-orange-200' 
                  : 'bg-orange-50 border-orange-100 text-orange-900'
              }`}>
                <h4 className={`font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-orange-400' : 'text-orange-800'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3v1m0 16v1m0-1a9 9 0 008.112-5.088l.053-.09a10.003 10.003 0 01-3.44 2.04z" /></svg>
                  Common Mistakes
                </h4>
                <ul className="space-y-2">
                  {result.commonMistakes.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm opacity-90">
                      <span className="text-orange-500 font-bold">•</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-6 rounded-xl border transition-colors ${
                document.documentElement.classList.contains('dark') 
                  ? 'bg-emerald-900/20 border-emerald-500/30 text-emerald-200' 
                  : 'bg-emerald-50 border-emerald-100 text-emerald-900'
              }`}>
                <h4 className={`font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Future Upgrades
                </h4>
                <ul className="space-y-2">
                  {result.improvementIdeas.map((i, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm opacity-90">
                      <span className="text-emerald-500 font-bold">•</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Internal helper for dark mode detection inside Section logic
const darkMode = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

export default ResultView;

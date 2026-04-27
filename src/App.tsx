/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, AlertCircle, ChevronLeft } from 'lucide-react';
import { LearningModule, ModuleState } from './types';
import { fetchLessonModule } from './services/geminiService';
import TopicSelector from './components/TopicSelector';
import LessonRenderer from './components/LessonRenderer';
import QuizRenderer from './components/QuizRenderer';
import InteractiveSandbox from './components/InteractiveSandbox';
import ChatAssistant from './components/ChatAssistant';

export default function App() {
  const [state, setState] = useState<ModuleState>(ModuleState.HOME);
  const [currentModule, setCurrentModule] = useState<LearningModule | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const PROGRESS_TOTAL = 5;
  const progressPercent = (completedModules.length / PROGRESS_TOTAL) * 100;

  const handleSelectTopic = async (topic: string) => {
    setState(ModuleState.LOADING);
    setError(null);
    try {
      const moduleData = await fetchLessonModule(topic);
      setCurrentModule(moduleData);
      setState(ModuleState.LEARNING);
    } catch (err) {
      console.error(err);
      setError("Failed to generate module. Please try again.");
      setState(ModuleState.HOME);
    }
  };

  const handleBackToHome = () => {
    setState(ModuleState.HOME);
    setCurrentModule(null);
  };

  const startQuiz = () => setState(ModuleState.QUIZ);

  const handleQuizComplete = () => {
    if (currentModule) {
      if (!completedModules.includes(currentModule.id)) {
        setCompletedModules(prev => [...prev, currentModule.id]);
      }
      setState(ModuleState.SANDBOX);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shrink-0">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={handleBackToHome}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">CitizenAcademy <span className="text-slate-400 font-normal">/ Elections 2026</span></span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Progress</p>
              <p className="text-xs font-semibold text-slate-700">{completedModules.length} / {PROGRESS_TOTAL} Phases</p>
            </div>
            <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-indigo-600"
              />
            </div>
          </div>

          {state !== ModuleState.HOME && (
            <button 
              onClick={handleBackToHome}
              className="px-4 py-2 border border-slate-200 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ChevronLeft size={16} />
              Save & Exit
            </button>
          )}
        </div>
      </nav>

      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto mt-8 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-3 z-50 relative"
            >
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {state === ModuleState.HOME && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12"
            >
              <TopicSelector 
                onSelect={handleSelectTopic} 
                completedModules={completedModules}
              />
            </motion.div>
          )}

          {state === ModuleState.LOADING && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex flex-col items-center justify-center bg-white z-40"
            >
              <div className="relative">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
              </div>
              <p className="mt-6 text-slate-500 font-medium animate-pulse">
                Gemini is preparing your curriculum...
              </p>
            </motion.div>
          )}

          {state === ModuleState.LEARNING && currentModule && (
            <motion.div
              key="learning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LessonRenderer 
                module={currentModule} 
                onBack={handleBackToHome}
                onComplete={startQuiz}
              />
            </motion.div>
          )}

          {state === ModuleState.QUIZ && currentModule && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuizRenderer 
                module={currentModule}
                onComplete={handleQuizComplete}
                onRetry={() => setState(ModuleState.LEARNING)}
              />
            </motion.div>
          )}

          {state === ModuleState.SANDBOX && currentModule && (
            <motion.div
              key="sandbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InteractiveSandbox 
                phaseIndex={currentModule.id === 'voter-registration' ? 0 : 
                            currentModule.id === 'nomination-scrutiny' ? 1 :
                            currentModule.id === 'campaign-ethics' ? 2 :
                            currentModule.id === 'voter-turnout' ? 3 : 
                            currentModule.id === 'counting-results' ? 4 : 
                            parseInt(currentModule.id.split('-')[1]) - 1 || 0}
                onFinish={() => setState(ModuleState.HOME)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <ChatAssistant />
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, Trophy, RefreshCcw } from "lucide-react";
import { LearningModule } from "../types";

interface QuizRendererProps {
  module: LearningModule;
  onComplete: (score: number) => void;
  onRetry: () => void;
}

export default function QuizRenderer({ module, onComplete, onRetry }: QuizRendererProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = module.quiz[currentIndex];

  const handleOptionSelect = (idx: number) => {
    if (showFeedback) return;
    setSelectedOption(idx);
    setShowFeedback(true);
    
    if (idx === currentQuestion.correctIndex) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentIndex < module.quiz.length - 1) {
        setCurrentIndex(c => c + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  if (isFinished) {
    const passed = score >= module.quiz.length * 0.7;
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto px-6 py-16 text-center"
      >
        <div className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center mb-8 ${passed ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
          <Trophy size={48} />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Knowledge Check Complete</h2>
        <p className="text-slate-500 mb-12 font-medium">You scored {score} out of {module.quiz.length}</p>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-12 text-left shadow-sm">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Module Summary</h4>
          <p className="text-slate-600 leading-relaxed font-medium">{module.summary}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRetry}
            className="secondary-button w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <RefreshCcw size={16} />
            Review Curriculum
          </button>
          <button
            onClick={() => onComplete(score)}
            className="primary-button w-full sm:w-auto flex items-center justify-center gap-2"
          >
            {(module.id === 'module-5' || module.title.includes('Phase 5')) ? 'Claim Certificate' : 'Complete Module'}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 min-h-[600px] flex flex-col justify-center">
      <div className="mb-12 relative">
        <div className="absolute -top-8 left-0 flex items-center gap-2">
          <div className="w-12 h-1 text-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500" 
              style={{ width: `${((currentIndex + 1) / module.quiz.length) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">
            Phase {currentIndex + 1} / {module.quiz.length}
          </span>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {currentQuestion.question}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQuestion.correctIndex;
          const showFeedbackMode = selectedOption !== null;
          const showCorrect = showFeedbackMode && isCorrect;
          const showWrong = showFeedbackMode && isSelected && !isCorrect;

          return (
            <motion.div
              layout
              key={option}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <button
                disabled={showFeedbackMode}
                onClick={() => handleOptionSelect(idx)}
                className={`
                  w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all text-left group cursor-pointer
                  ${!showFeedbackMode && 'hover:border-indigo-400 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10 border-slate-100 bg-white'}
                  ${showCorrect && 'border-green-500 bg-green-50 shadow-sm shadow-green-500/20 ring-4 ring-green-100'}
                  ${showWrong && 'border-red-500 bg-red-50 shadow-sm shadow-red-500/20 ring-4 ring-red-100'}
                  ${showFeedbackMode && !showCorrect && !showWrong && 'opacity-40 grayscale border-slate-100'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-8 h-8 flex items-center justify-center rounded-lg border-2 font-bold text-xs transition-all
                    ${showCorrect ? 'bg-green-500 border-green-500 text-white' : showWrong ? 'bg-red-500 border-red-500 text-white' : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-600'}
                  `}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`text-base font-bold transition-colors ${showCorrect ? 'text-green-900' : showWrong ? 'text-red-900' : 'text-slate-700'}`}>
                    {option}
                  </span>
                </div>
                
                <AnimatePresence>
                  {showCorrect && (
                    <motion.div 
                      initial={{ scale: 0, rotate: -45 }} 
                      animate={{ scale: 1, rotate: 0 }}
                      className="bg-green-100 p-1.5 rounded-full"
                    >
                      <Check className="text-green-600" size={16} />
                    </motion.div>
                  )}
                  {showWrong && (
                    <motion.div 
                      initial={{ scale: 0, rotate: 45 }} 
                      animate={{ scale: 1, rotate: 0 }}
                      className="bg-red-100 p-1.5 rounded-full"
                    >
                      <X className="text-red-600" size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-10 p-5 rounded-2xl border flex gap-4 ${
              selectedOption === currentQuestion.correctIndex 
                ? 'bg-green-50 border-green-100 text-green-800' 
                : 'bg-red-50 border-red-100 text-red-800'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
               selectedOption === currentQuestion.correctIndex ? 'bg-green-200' : 'bg-red-200'
            }`}>
              {selectedOption === currentQuestion.correctIndex ? <Check size={20} /> : <X size={20} />}
            </div>
            <div>
              <p className="font-bold text-sm uppercase tracking-tight mb-1">
                {selectedOption === currentQuestion.correctIndex ? 'Excellent!' : 'Not quite right...'}
              </p>
              <p className="text-sm font-medium opacity-80 leading-relaxed italic">
                {selectedOption === currentQuestion.correctIndex 
                  ? "That's exactly correct as per ECI protocols." 
                  : `The correct answer was: ${currentQuestion.options[currentQuestion.correctIndex]}. Review the curriculum to master this phase.`}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

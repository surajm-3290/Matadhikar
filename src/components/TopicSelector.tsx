/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { CheckCircle2, ChevronRight, GraduationCap, Lock } from "lucide-react";
import { TOPICS } from "../types";

interface TopicSelectorProps {
  onSelect: (topic: string) => void;
  completedModules: string[];
}

export default function TopicSelector({ onSelect, completedModules }: TopicSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-6">
          <GraduationCap size={40} />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Election Academy
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Master the mechanics of democracy. Complete each phase sequentially to unlock your interactive diploma.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-1">
        {TOPICS.map((topic, index) => {
          // A module is unlocked if it's the first one, or if the previous one is completed
          // We map module-1, module-2... to TOPICS index
          const moduleId = `module-${index + 1}`;
          const isCompleted = completedModules.includes(moduleId) || completedModules.includes(topic.id);
          const isUnlocked = index === 0 || completedModules.includes(`module-${index}`) || completedModules.includes(TOPICS[index-1].id);

          return (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              disabled={!isUnlocked}
              onClick={() => onSelect(topic.title)}
              className={`
                group relative flex items-center justify-between p-6 bg-white border rounded-2xl transition-all text-left overflow-hidden
                ${isUnlocked 
                  ? 'border-slate-200 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer' 
                  : 'border-slate-100 opacity-60 grayscale cursor-not-allowed'}
              `}
            >
              <div className="flex items-center gap-6">
                <div className={`
                  w-12 h-12 flex items-center justify-center rounded-xl font-mono font-bold transition-colors
                  ${isCompleted 
                    ? 'bg-green-100 text-green-600' 
                    : isUnlocked 
                      ? 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600' 
                      : 'bg-slate-50 text-slate-300'}
                `}>
                  {isCompleted ? <CheckCircle2 size={24} /> : `0${index + 1}`}
                </div>
                <div>
                  <h3 className={`text-xl font-bold transition-colors ${isUnlocked ? 'text-slate-900 group-hover:text-indigo-600' : 'text-slate-400'}`}>
                    {topic.title}
                  </h3>
                  <p className="text-slate-500 text-sm">{topic.detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {!isUnlocked ? (
                  <Lock className="text-slate-300" size={20} />
                ) : (
                  <>
                    <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold text-indigo-600">
                        {isCompleted ? 'Review Module' : 'Start Module'}
                      </span>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </>
                )}
              </div>
              
              {isUnlocked && !isCompleted && (
                <div className="absolute left-0 bottom-0 h-1 bg-indigo-500 w-0 group-hover:w-full transition-all duration-500" />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-20 pt-12 border-t border-slate-100 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
          <CheckCircle2 size={16} className="text-green-500" />
          <span>Curriculum verified by Gemini AI Civil Education Engine</span>
        </div>
      </div>
    </div>
  );
}

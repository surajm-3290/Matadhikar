/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import Markdown from "react-markdown";
import { ArrowLeft, ArrowRight, Image as ImageIcon, HelpCircle, Play, Video } from "lucide-react";
import { LearningModule } from "../types";
import { useState } from "react";

const LORE_TIPS = [
  { q: "Who was India's first Chief Election Commissioner?", a: "Sukumar Sen, an ICS officer who managed the massive 1951-52 general elections." },
  { q: "What makes the indelible ink so special?", a: "It contains Silver Nitrate. When applied to the skin, it reacts with salt on the skin and sunlight to form a dark stain that lasts for weeks." },
  { q: "Where were EVMs first used in India?", a: "They were first used in the 1982 by-election to the Paravur Assembly constituency in Kerala." },
  { q: "Which district has the world's highest polling station?", a: "Tashigang in Himachal Pradesh, located at 15,256 feet, is the world's highest polling booth." },
  { q: "What is the '7-second rule' for VVPAT?", a: "After you press the button on the EVM, the VVPAT slip is visible through a transparent window for exactly 7 seconds before falling into the box." },
];

interface LessonRendererProps {
  module: LearningModule;
  onBack: () => void;
  onComplete: () => void;
}

export default function LessonRenderer({ module, onBack, onComplete }: LessonRendererProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const section = module.sections[currentSection];

  const next = () => {
    setShowVideo(false);
    if (currentSection < module.sections.length - 1) {
      setCurrentSection(curr => curr + 1);
    } else {
      onComplete();
    }
  };

  const prev = () => {
    setShowVideo(false);
    if (currentSection > 0) {
      setCurrentSection(curr => curr - 1);
    } else {
      onBack();
    }
  };

  const progress = ((currentSection + 1) / module.sections.length) * 100;

  return (
    <div className="max-w-6xl mx-auto px-8 py-12 flex flex-col min-h-full">
      {/* Progress Bar */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-indigo-600"
          />
        </div>
        <span className="text-xs font-bold text-slate-500 tracking-wider uppercase shrink-0">
          {Math.round(progress)}% COMPLETE
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 flex-1 items-start">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="theme-card flex flex-col min-h-[500px] shadow-lg"
        >
          <div className="mb-8">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase mb-2 block"
            >
              Learning Objective {currentSection + 1}
            </motion.span>
            <motion.h2 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              {section.heading}
            </motion.h2>
          </div>

          <div className="prose prose-slate prose-lg max-w-none flex-1">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 leading-relaxed font-medium"
            >
              <Markdown>{section.content}</Markdown>
            </motion.div>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3 mb-8"
          >
            <HelpCircle size={20} className="text-indigo-600 shrink-0 mt-1" />
            <div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Did you know? {LORE_TIPS[currentSection % LORE_TIPS.length].q}
              </p>
              <p className="text-sm text-slate-600 italic">
                {LORE_TIPS[currentSection % LORE_TIPS.length].a}
              </p>
            </div>
          </motion.div>

          <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={prev}
              className="secondary-button flex items-center gap-2 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              {currentSection === 0 ? "Overview" : "Previous"}
            </button>
            
            <button
              onClick={next}
              className="primary-button flex items-center gap-2 px-8 py-3 shadow-lg shadow-indigo-500/30"
            >
              {currentSection === module.sections.length - 1 ? "Start Assessment" : "Next Topic"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Interactive Preview Card (Dark aesthetic) */}
        <div className="dark-card h-full min-h-[500px] flex flex-col relative overflow-hidden">
          <div className="absolute top-4 right-6 z-20">
             <span className="px-2 py-1 bg-white/10 rounded text-[9px] font-mono tracking-widest uppercase border border-white/10">
               {section.videoUrl ? 'Video Tutorial Available' : 'Reference View'}
             </span>
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider opacity-40 mb-8 flex items-center gap-2">
            {section.videoUrl ? <Video size={14} /> : <ImageIcon size={14} />}
            {section.videoUrl ? 'Educational Media' : 'Visual Context'}
          </h3>
          
          <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-6">
            {section.videoUrl && !showVideo ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-indigo-500/30 bg-indigo-500/5 group">
                <img 
                  src={`https://img.youtube.com/vi/${section.videoUrl.split('/').pop()?.split('?')[0]}/maxresdefault.jpg`}
                  alt="Video Thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                  <button 
                    onClick={() => setShowVideo(true)}
                    className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/50 hover:scale-110 active:scale-95 transition-all cursor-pointer group-hover:bg-indigo-500"
                  >
                    <Play size={32} fill="currentColor" />
                  </button>
                  <p className="text-sm font-bold text-white uppercase tracking-widest bg-black/40 px-4 py-1 rounded backdrop-blur-sm">
                    Watch Phase 1 Guide
                  </p>
                </div>
              </div>
            ) : section.videoUrl && showVideo ? (
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={`${section.videoUrl}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center p-4">
                <img 
                  src={`https://picsum.photos/seed/${encodeURIComponent(section.heading)}/800/450`}
                  alt={section.heading}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                  referrerPolicy="no-referrer"
                />
                <div className="relative z-10 p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 max-w-xs">
                  <p className="text-[11px] font-mono text-indigo-300 uppercase tracking-tighter mb-2 italic">Gemini Visualization Prompt:</p>
                  <p className="text-sm font-medium text-white/90 leading-relaxed">
                    {section.visualPrompt}
                  </p>
                </div>
              </div>
            )}

            <div className="w-full space-y-4">
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-left">
                <p className="text-xs leading-relaxed text-indigo-100">
                  <span className="text-indigo-400 font-bold uppercase block mb-1 text-[10px] tracking-widest italic">Educational Insights</span>
                  Observe the nuances in {section.heading.toLowerCase()}. This phase is critical for the legal integrity of the electoral process.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-2">
            {module.sections.map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 h-1 rounded-full transition-all ${i <= currentSection ? 'bg-indigo-500' : 'bg-white/10'}`} 
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-12 flex items-center justify-center py-6 border-t border-slate-100">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic flex items-center gap-4">
          <span>Module Powered by Gemini Global Intelligence</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        </div>
      </footer>
    </div>
  );
}

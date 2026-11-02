import React from 'react';
import { ArrowRight, BookOpen, CheckCircle, FileText, Cpu, Sparkles } from 'lucide-react';

interface VortxNavbarProps {
  currentView: 'landing' | 'worksheet' | 'grading' | 'teacher';
  setCurrentView: (view: 'landing' | 'worksheet' | 'grading' | 'teacher') => void;
  onOpenWorksheet: () => void;
  hasGradingResult: boolean;
}

export const VortxNavbar: React.FC<VortxNavbarProps> = ({
  currentView,
  setCurrentView,
  onOpenWorksheet,
  hasGradingResult,
}) => {
  return (
    <nav className="relative z-20 flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 w-full">
      {/* Logo block */}
      <div
        onClick={() => setCurrentView('landing')}
        className="anim-stagger flex flex-col items-center cursor-pointer group"
        style={{ animationDelay: '0.1s' }}
      >
        <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
          <svg
            viewBox="0 0 256 256"
            className="w-full h-full fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          >
            {/* 4 quarter-circle shapes forming vortex/plus pattern */}
            <path d="M128 128 L128 32 A96 96 0 0 1 224 128 Z" />
            <path d="M128 128 L224 128 A96 96 0 0 1 128 224 Z" />
            <path d="M128 128 L128 224 A96 96 0 0 1 32 128 Z" />
            <path d="M128 128 L32 128 A96 96 0 0 1 128 32 Z" />
            <circle cx="128" cy="128" r="16" className="fill-black" />
          </svg>
        </div>
        <span className="text-white text-[10px] md:text-xs tracking-[0.4em] mt-1 font-light group-hover:text-cyan-300 transition-colors">
          V O R T X
        </span>
      </div>

      {/* Navigation center quick links */}
      <div className="hidden lg:flex items-center gap-1.5 p-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl">
        <button
          onClick={() => setCurrentView('landing')}
          className={`px-4 py-2 text-xs uppercase tracking-wider rounded-lg transition-all ${
            currentView === 'landing'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setCurrentView('worksheet')}
          className={`px-4 py-2 text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 ${
            currentView === 'worksheet'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          ใบงานนักศึกษา
        </button>
        <button
          onClick={() => setCurrentView('grading')}
          className={`px-4 py-2 text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 ${
            currentView === 'grading'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
          ระบบตรวจอัตโนมัติ
          {hasGradingResult && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          )}
        </button>
        <button
          onClick={() => setCurrentView('teacher')}
          className={`px-4 py-2 text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 ${
            currentView === 'teacher'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          เฉลย & อาจารย์
        </button>
      </div>

      {/* Nav buttons from prompt specification */}
      <div
        className="anim-stagger flex items-center gap-3"
        style={{ animationDelay: '0.2s' }}
      >
        <button
          onClick={() => setCurrentView('teacher')}
          className="hidden md:block px-5 py-2.5 text-white text-sm hover:bg-white/10 btn-cut-border cursor-pointer transition-transform active:scale-95"
          title="Neural Synergy - ระบบประมวลผลคำตอบอัตโนมัติ"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            Neural Synergy
          </span>
        </button>
        <button
          onClick={onOpenWorksheet}
          className="px-5 py-2.5 bg-white text-black text-sm hover:bg-white/90 btn-cut cursor-pointer font-medium transition-transform active:scale-95 flex items-center gap-2"
        >
          <span>Cyber Synthesis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};

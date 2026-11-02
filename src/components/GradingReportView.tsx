import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ArrowLeft,
  Printer,
  Download,
  Award,
  Sparkles,
  BarChart3,
  Calendar,
  Hash,
  User,
} from 'lucide-react';
import { GradingResult } from '../types.ts';

interface GradingReportViewProps {
  result: GradingResult;
  onBackToWorksheet: () => void;
  onPrint: () => void;
}

export const GradingReportView: React.FC<GradingReportViewProps> = ({
  result,
  onBackToWorksheet,
  onPrint,
}) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_20px_rgba(52,211,153,0.3)]';
      case 'B+':
      case 'B':
        return 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.3)]';
      case 'C+':
      case 'C':
        return 'text-amber-400 border-amber-500/40 bg-amber-500/10 shadow-[0_0_20px_rgba(251,191,36,0.3)]';
      default:
        return 'text-rose-400 border-rose-500/40 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.3)]';
    }
  };

  const correctCount = result.items.filter((i) => i.status === 'correct').length;
  const partialCount = result.items.filter((i) => i.status === 'partial').length;
  const incorrectCount = result.items.filter(
    (i) => i.status === 'incorrect' || i.status === 'empty'
  ).length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4 p-4 bg-neutral-900/90 border border-white/10 rounded-2xl backdrop-blur-md">
        <button
          onClick={onBackToWorksheet}
          className="px-4 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2 transition-all cursor-pointer font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปแก้ไขคำตอบ</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrint}
            className="px-4 py-2 text-xs bg-white text-black font-semibold rounded-lg flex items-center gap-2 hover:bg-white/90 transition-all cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์ผลการตรวจ</span>
          </button>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-black border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AUTOMATED EVALUATION ENGINE COMPLETE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ผลการประเมินและตรวจใบงานอัตโนมัติ
            </h1>
            <p className="text-sm text-white/70">
              ใบงานเรื่อง ภาพรวมของโปรแกรมเครือข่ายและโมเดลการสื่อสาร
            </p>

            {/* Student metadata badges */}
            <div className="flex flex-wrap items-center gap-3 pt-3 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5 text-white/90 font-mono">
                <Hash className="w-3.5 h-3.5 text-cyan-400" />
                รหัส: <strong className="text-white">{result.studentId || 'ไม่ระบุ'}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5 text-white/90">
                <User className="w-3.5 h-3.5 text-purple-400" />
                ชื่อ-สกุล: <strong className="text-white">{result.fullName || 'ไม่ระบุ'}</strong>
              </span>
              {result.section && (
                <span className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white/90">
                  กลุ่มเรียน: {result.section}
                </span>
              )}
              <span className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5 text-white/60 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                เวลาตรวจ: {result.evaluatedAt}
              </span>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 max-w-md">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 text-center">
                <span className="text-xs text-emerald-400 block font-medium">ถูกต้องสมบูรณ์</span>
                <span className="text-xl font-bold font-mono text-emerald-300">
                  {correctCount} ข้อ
                </span>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-center">
                <span className="text-xs text-amber-400 block font-medium">ถูกต้องบางส่วน</span>
                <span className="text-xl font-bold font-mono text-amber-300">
                  {partialCount} ข้อ
                </span>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-2.5 text-center">
                <span className="text-xs text-rose-400 block font-medium">ต้องแก้ไข</span>
                <span className="text-xl font-bold font-mono text-rose-300">
                  {incorrectCount} ข้อ
                </span>
              </div>
            </div>
          </div>

          {/* Right score & grade badge */}
          <div className="flex flex-col items-center justify-center p-6 bg-black/70 border border-white/10 rounded-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-white/60 mb-1">
              คะแนนรวมสุทธิ
            </span>
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter">
                {result.totalScore}
              </span>
              <span className="text-xl text-white/40 font-light">/{result.maxScore}</span>
            </div>

            <div
              className={`mt-4 px-6 py-2 rounded-xl border text-2xl font-black tracking-wider flex items-center gap-2 ${getGradeColor(
                result.grade
              )}`}
            >
              <Award className="w-6 h-6" />
              <span>GRADE {result.grade}</span>
            </div>
            <span className="text-[11px] text-white/50 font-mono mt-2">
              คิดเป็น {result.percentage}% ของคะแนนเต็ม
            </span>
          </div>
        </div>
      </div>

      {/* Section Score Breakdown */}
      <div className="bg-neutral-950/70 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          สรุปคะแนนแยกตามหมวดหมู่
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-neutral-900/80 rounded-xl border border-white/5">
            <span className="text-white/60 block truncate">ส่วนที่ 1: พารามิเตอร์</span>
            <div className="text-lg font-bold font-mono text-cyan-300 mt-1">
              {result.sectionScores.part1.score} / {result.sectionScores.part1.max}
            </div>
          </div>
          <div className="p-3 bg-neutral-900/80 rounded-xl border border-white/5">
            <span className="text-white/60 block truncate">ส่วนที่ 2.1: Python Socket</span>
            <div className="text-lg font-bold font-mono text-purple-300 mt-1">
              {result.sectionScores.part2_1.score} / {result.sectionScores.part2_1.max}
            </div>
          </div>
          <div className="p-3 bg-neutral-900/80 rounded-xl border border-white/5">
            <span className="text-white/60 block truncate">ส่วนที่ 2.2: Packet Switch</span>
            <div className="text-lg font-bold font-mono text-emerald-300 mt-1">
              {result.sectionScores.part2_2.score} / {result.sectionScores.part2_2.max}
            </div>
          </div>
          <div className="p-3 bg-neutral-900/80 rounded-xl border border-white/5">
            <span className="text-white/60 block truncate">ส่วนที่ 2.3: ทิศทาง Duplex</span>
            <div className="text-lg font-bold font-mono text-amber-300 mt-1">
              {result.sectionScores.part2_3.score} / {result.sectionScores.part2_3.max}
            </div>
          </div>
          <div className="p-3 bg-neutral-900/80 rounded-xl border border-white/5">
            <span className="text-white/60 block truncate">ส่วนที่ 2.4: Docker Config</span>
            <div className="text-lg font-bold font-mono text-cyan-300 mt-1">
              {result.sectionScores.part2_4.score} / {result.sectionScores.part2_4.max}
            </div>
          </div>
          <div className="p-3 bg-neutral-900/80 rounded-xl border border-white/5">
            <span className="text-white/60 block truncate">ส่วนที่ 3: สรุปความเข้าใจ</span>
            <div className="text-lg font-bold font-mono text-pink-300 mt-1">
              {result.sectionScores.part3_summary.score} / {result.sectionScores.part3_summary.max}
            </div>
          </div>
          <div className="p-3 bg-neutral-900/80 rounded-xl border border-white/5">
            <span className="text-white/60 block truncate">ตอนที่ 3: เติมคำ Socket</span>
            <div className="text-lg font-bold font-mono text-indigo-300 mt-1">
              {result.sectionScores.part3_blanks.score} / {result.sectionScores.part3_blanks.max}
            </div>
          </div>
          <div className="p-3 bg-neutral-900/80 rounded-xl border border-white/5">
            <span className="text-white/60 block truncate">ตอนที่ 4: เติมคำ Docker</span>
            <div className="text-lg font-bold font-mono text-teal-300 mt-1">
              {result.sectionScores.part4_blanks.score} / {result.sectionScores.part4_blanks.max}
            </div>
          </div>
        </div>
      </div>

      {/* Item-by-item Detailed Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">รายละเอียดการตรวจคำตอบรายข้อ (Detailed Review)</h3>

        <div className="space-y-4">
          {result.items.map((item, idx) => {
            const isOk = item.status === 'correct';
            const isPartial = item.status === 'partial';

            return (
              <div
                key={item.id}
                className="bg-neutral-950/80 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-white/50">{item.section}</span>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {isOk && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {isPartial && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
                      {!isOk && !isPartial && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                      <span>{item.title}</span>
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-md font-mono font-bold ${
                        isOk
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : isPartial
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {item.score} / {item.maxScore} คะแนน
                    </span>
                  </div>
                </div>

                {/* Answers Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                  <div className="bg-black/60 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-white/50 uppercase block mb-1">
                      คำตอบของนักศึกษา:
                    </span>
                    <pre className="text-white/90 whitespace-pre-wrap font-sans text-xs">
                      {item.userAnswer}
                    </pre>
                  </div>
                  <div className="bg-black/60 p-3 rounded-xl border border-cyan-500/20">
                    <span className="text-[10px] text-cyan-400 uppercase block mb-1">
                      เฉลย / คำตอบที่ถูกต้องตามรหัส:
                    </span>
                    <pre className="text-cyan-300 whitespace-pre-wrap font-sans text-xs">
                      {item.expected}
                    </pre>
                  </div>
                </div>

                {/* System Feedback */}
                <div className="bg-neutral-900/60 p-3 rounded-xl border border-white/5 text-xs text-white/80">
                  <span className="font-semibold text-white/90 mr-1.5">คำแนะนำระบบ:</span>
                  <span>{item.feedback}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

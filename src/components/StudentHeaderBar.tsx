import React from 'react';
import { User, Hash, Users, Cpu, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { StudentParams } from '../types.ts';

interface StudentHeaderBarProps {
  studentId: string;
  fullName: string;
  section: string;
  onStudentIdChange: (val: string) => void;
  onFullNameChange: (val: string) => void;
  onSectionChange: (val: string) => void;
  params: StudentParams;
  onLoadPreset: (presetId: string, presetName: string, presetSec: string) => void;
}

export const StudentHeaderBar: React.FC<StudentHeaderBarProps> = ({
  studentId,
  fullName,
  section,
  onStudentIdChange,
  onFullNameChange,
  onSectionChange,
  params,
  onLoadPreset,
}) => {
  return (
    <div className="w-full bg-neutral-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
      {/* Decorative cyber grid accent */}
      <div className="absolute top-0 right-0 w-96 h-40 bg-gradient-to-l from-cyan-500/10 via-purple-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              <Sparkles className="w-3 h-3" />
              DYNAMIC PARAMETER ENGINE
            </span>
            <span className="text-white/40 text-xs font-mono">vortx-auto-calc</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            ข้อมูลนักศึกษา & พารามิเตอร์เฉพาะบุคคล
          </h2>
          <p className="text-xs text-white/60">
            ระบบจะดึงเลข 3 ตัวท้าย (X, Y, Z) และเลข 4 ตัวท้ายเพื่อสร้างโจทย์และเฉลยเฉพาะของคุณโดยอัตโนมัติ
          </p>
        </div>

        {/* Quick Demo Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-white/50 font-mono">ตัวอย่างทดสอบ:</span>
          <button
            type="button"
            onClick={() => onLoadPreset('6814952010', 'สมชาย ใจมั่นคง', 'CS68-01')}
            className="px-2.5 py-1 text-xs bg-white/5 hover:bg-white/15 text-white/80 rounded-md border border-white/10 transition-all font-mono hover:border-cyan-400/50"
          >
            6814952010 (X=0 เลขคู่)
          </button>
          <button
            type="button"
            onClick={() => onLoadPreset('6814952567', 'กัญญาภัทร รุ่งเรือง', 'CS68-02')}
            className="px-2.5 py-1 text-xs bg-white/5 hover:bg-white/15 text-white/80 rounded-md border border-white/10 transition-all font-mono hover:border-cyan-400/50"
          >
            6814952567 (X=5 เลขคี่)
          </button>
        </div>
      </div>

      {/* Input Fields: Student ID, Full Name, Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Student ID */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/80 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-cyan-400" />
            <span>รหัสนักศึกษา (Student ID)</span>
            <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={studentId}
              onChange={(e) => onStudentIdChange(e.target.value)}
              placeholder="เช่น 6814952010 หรือ 6814952567"
              className="w-full bg-black/60 border border-white/20 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm font-mono tracking-wider transition-all"
            />
            {params.isValid && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 text-xs font-mono flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Valid
              </span>
            )}
          </div>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/80 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span>ชื่อ-นามสกุล (Full Name)</span>
            <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            placeholder="เช่น นายชลธี มั่นใจ หรือ สมชาย วรการ"
            className="w-full bg-black/60 border border-white/20 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm transition-all"
          />
        </div>

        {/* Section */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/80 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>กลุ่มเรียน (Class Section)</span>
          </label>
          <input
            type="text"
            value={section}
            onChange={(e) => onSectionChange(e.target.value)}
            placeholder="เช่น กลุ่ม 1 หรือ Sec 02"
            className="w-full bg-black/60 border border-white/20 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm transition-all"
          />
        </div>
      </div>

      {/* Dynamic Calculated Badges */}
      <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col">
          <span className="text-[10px] text-white/50 uppercase font-mono tracking-wider">
            ตัวแปร 3 ตัวท้าย
          </span>
          <div className="text-sm font-bold font-mono text-cyan-300 mt-0.5">
            X={params.X}, Y={params.Y}, Z={params.Z}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col">
          <span className="text-[10px] text-white/50 uppercase font-mono tracking-wider">
            IP Address เซิร์ฟเวอร์
          </span>
          <div className="text-sm font-bold font-mono text-white mt-0.5 truncate">
            {params.ipAddress}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col">
          <span className="text-[10px] text-white/50 uppercase font-mono tracking-wider">
            Port Number
          </span>
          <div className="text-sm font-bold font-mono text-emerald-300 mt-0.5">
            {params.portNumber}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col">
          <span className="text-[10px] text-white/50 uppercase font-mono tracking-wider">
            ขนาดข้อมูลรวม
          </span>
          <div className="text-sm font-bold font-mono text-amber-300 mt-0.5">
            {params.totalBytes} ไบต์
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col">
          <span className="text-[10px] text-white/50 uppercase font-mono tracking-wider">
            โหมด Duplex (ข้อ 2.3)
          </span>
          <div className="text-xs font-semibold text-purple-300 mt-0.5 flex items-center gap-1">
            <span
              className={`w-2 h-2 rounded-full ${
                params.duplexRequired === 'Full-Duplex' ? 'bg-cyan-400' : 'bg-orange-400'
              }`}
            />
            {params.duplexRequired} (X={params.X} {params.X % 2 === 0 ? 'คู่' : 'คี่'})
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col">
          <span className="text-[10px] text-white/50 uppercase font-mono tracking-wider">
            4 ตัวท้าย (ข้อ 2.2)
          </span>
          <div className="text-sm font-bold font-mono text-pink-300 mt-0.5">
            {params.last4 || '0000'} ไบต์
          </div>
        </div>
      </div>
    </div>
  );
};

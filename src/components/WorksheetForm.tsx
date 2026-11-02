import React from 'react';
import {
  FileText,
  Terminal,
  Server,
  Calculator,
  Radio,
  Box,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  RotateCcw,
  Send,
  Eye,
  Printer,
  ChevronRight,
  Code2,
} from 'lucide-react';
import { StudentParams, WorksheetAnswers } from '../types.ts';

interface WorksheetFormProps {
  params: StudentParams;
  answers: WorksheetAnswers;
  onAnswerChange: <K extends keyof WorksheetAnswers>(field: K, value: WorksheetAnswers[K]) => void;
  onSubmit: () => void;
  onFillSampleAnswers: () => void;
  onClearAnswers: () => void;
  onPrintPreview: () => void;
  onOpenTeacherKey: () => void;
}

export const WorksheetForm: React.FC<WorksheetFormProps> = ({
  params,
  answers,
  onAnswerChange,
  onSubmit,
  onFillSampleAnswers,
  onClearAnswers,
  onPrintPreview,
  onOpenTeacherKey,
}) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top action toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-neutral-900/90 border border-white/10 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <span className="font-semibold text-white text-sm">ใบงานระบบตรวจอัตโนมัติ</span>
          <span className="text-xs text-white/50 hidden sm:inline">
            (ภาพรวมของโปรแกรมเครือข่ายและโมเดลการสื่อสาร)
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onFillSampleAnswers}
            className="px-3 py-1.5 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg flex items-center gap-1.5 transition-all font-medium cursor-pointer"
            title="ใส่คำตอบตัวอย่างอัตโนมัติเพื่อทดสอบระบบตรวจงาน"
          >
            <Sparkles className="w-3.5 h-3.5" />
            ใส่คำตอบตัวอย่าง (Quick Test)
          </button>
          <button
            type="button"
            onClick={onOpenTeacherKey}
            className="px-3 py-1.5 text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 rounded-lg flex items-center gap-1.5 transition-all font-medium cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            ดูเฉลยรหัสนี้
          </button>
          <button
            type="button"
            onClick={onPrintPreview}
            className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            รูปแบบ A4 กระดาษ
          </button>
          <button
            type="button"
            onClick={onClearAnswers}
            className="px-2.5 py-1.5 text-xs text-white/40 hover:text-white/80 transition-all cursor-pointer"
            title="ล้างคำตอบทั้งหมด"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Worksheet Title Card */}
      <div className="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-black border border-white/10 rounded-3xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Server className="w-48 h-48 text-cyan-400" />
        </div>
        <div className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white/80 mb-3 border border-white/10">
          NETWORK PROGRAMMING & COMMUNICATION MODELS • 2026
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          ใบงานเรื่อง ภาพรวมของโปรแกรมเครือข่ายและโมเดลการสื่อสาร
        </h1>
        <p className="text-sm text-white/70 mt-2 max-w-3xl leading-relaxed">
          กำหนดให้ <span className="text-cyan-300 font-bold font-mono">X Y Z</span> คือ เลข 3 ตัวท้ายของรหัสนักศึกษา 
          {params.isValid ? (
            <span className="ml-1 text-emerald-400 font-semibold font-mono">
              (สำหรับรหัส {params.studentId} ของคุณ: X = {params.X}, Y = {params.Y}, Z = {params.Z})
            </span>
          ) : (
            <span className="ml-1 text-amber-300">
              (กรุณากรอกรหัสนักศึกษาด้านบนเพื่อสร้างตัวแปรประจำตัว)
            </span>
          )}
        </p>
      </div>

      {/* ======================================================== */}
      {/* ส่วนที่ 1: คำนวณค่าพารามิเตอร์ประจำตัวนักศึกษาเพื่อใช้ตอบคำถาม */}
      {/* ======================================================== */}
      <div className="bg-neutral-950/70 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative">
        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              ส่วนที่ 1: คำนวณค่าพารามิเตอร์ประจำตัวนักศึกษาเพื่อใช้ตอบคำถาม
            </h3>
            <p className="text-xs text-white/60">
              คำนวณและกรอกค่าพารามิเตอร์ตามสูตรที่กำหนด (ใช้เลข 3 ตัวท้าย X, Y, Z)
            </p>
          </div>
          <span className="ml-auto text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800">
            15 คะแนน
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Question 1.1 */}
          <div className="bg-neutral-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-cyan-400 font-mono">ข้อ 1.1</span>
              <p className="text-sm font-medium text-white mt-1">
                หมายเลข IP Address ของเซิร์ฟเวอร์
              </p>
              <div className="mt-2 text-xs font-mono bg-black/60 p-2 rounded text-white/80 border border-white/10">
                สูตร: <span className="text-cyan-300">192.168.X.YZ</span>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs text-white/60 block mb-1">ตอบ (IP Address):</label>
              <input
                type="text"
                value={answers.ipAnswer}
                onChange={(e) => onAnswerChange('ipAnswer', e.target.value)}
                placeholder={params.isValid ? `เช่น ${params.ipAddress}` : 'เช่น 192.168.5.67'}
                className="w-full bg-black/80 border border-white/20 focus:border-cyan-400 rounded-lg px-3 py-2 text-sm text-white font-mono"
              />
            </div>
          </div>

          {/* Question 1.2 */}
          <div className="bg-neutral-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-400 font-mono">ข้อ 1.2</span>
              <p className="text-sm font-medium text-white mt-1">
                หมายเลข Port Number
              </p>
              <div className="mt-2 text-xs font-mono bg-black/60 p-2 rounded text-white/80 border border-white/10">
                สูตร: <span className="text-emerald-300">8000 + (X*100) + (Y*10) + Z</span>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs text-white/60 block mb-1">ตอบ (Port Number):</label>
              <input
                type="text"
                value={answers.portAnswer}
                onChange={(e) => onAnswerChange('portAnswer', e.target.value)}
                placeholder={params.isValid ? `เช่น ${params.portNumber}` : 'เช่น 8567'}
                className="w-full bg-black/80 border border-white/20 focus:border-emerald-400 rounded-lg px-3 py-2 text-sm text-white font-mono"
              />
            </div>
          </div>

          {/* Question 1.3 */}
          <div className="bg-neutral-900/60 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-400 font-mono">ข้อ 1.3</span>
              <p className="text-sm font-medium text-white mt-1">
                ขนาดข้อมูลรวม (ไบต์)
              </p>
              <div className="mt-2 text-xs font-mono bg-black/60 p-2 rounded text-white/80 border border-white/10">
                สูตร: <span className="text-amber-300">1000 + (X*50) + (Y*10) + Z ไบต์</span>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs text-white/60 block mb-1">ตอบ (ขนาดข้อมูล ไบต์):</label>
              <input
                type="text"
                value={answers.dataSizeAnswer}
                onChange={(e) => onAnswerChange('dataSizeAnswer', e.target.value)}
                placeholder={params.isValid ? `เช่น ${params.totalBytes} ไบต์` : 'เช่น 1317 ไบต์'}
                className="w-full bg-black/80 border border-white/20 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-white font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ส่วนที่ 2: โจทย์แสดงความรู้และการเขียนโปรแกรม */}
      {/* ======================================================== */}
      <div className="bg-neutral-950/70 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-8">
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              ส่วนที่ 2: โจทย์แสดงความรู้และการเขียนโปรแกรม
            </h3>
            <p className="text-xs text-white/60">
              การเขียนโค้ด Socket, Packet Switching, วิเคราะห์ทิศทาง และ Docker Container
            </p>
          </div>
          <span className="ml-auto text-xs font-mono text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-800">
            50 คะแนน
          </span>
        </div>

        {/* 2.1 Python Socket */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <h4 className="text-base font-semibold text-white">
              2.1 การตั้งค่า Socket และโปรโตคอลในภาษา Python
            </h4>
          </div>
          <p className="text-xs text-white/70">
            * เขียนโค้ดภาษา Python สำหรับสร้าง Socket และ Binding เข้ากับหมายเลข IP Address ({params.ipAddress}) และ Port Number ({params.portNumber}) ประจำตัวของคุณ
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* TCP Socket Code */}
            <div className="bg-neutral-900/70 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-cyan-300">
                  โค้ด TCP Socket:
                </span>
                <span className="text-[10px] text-white/40 font-mono">
                  socket.SOCK_STREAM
                </span>
              </div>
              <textarea
                rows={5}
                value={answers.tcpCode}
                onChange={(e) => onAnswerChange('tcpCode', e.target.value)}
                placeholder={`import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.bind(('${params.ipAddress}', ${params.portNumber}))\ns.listen(5)`}
                className="w-full bg-black border border-white/15 focus:border-cyan-400 rounded-lg p-3 text-xs font-mono text-emerald-400 leading-relaxed resize-y"
              />
              <p className="text-[11px] text-white/40 mt-1">
                Tip: ใช้ socket.AF_INET, socket.SOCK_STREAM และเรียก .bind(('{params.ipAddress}', {params.portNumber}))
              </p>
            </div>

            {/* UDP Socket Code */}
            <div className="bg-neutral-900/70 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-amber-300">
                  โค้ด UDP Socket:
                </span>
                <span className="text-[10px] text-white/40 font-mono">
                  socket.SOCK_DGRAM
                </span>
              </div>
              <textarea
                rows={5}
                value={answers.udpCode}
                onChange={(e) => onAnswerChange('udpCode', e.target.value)}
                placeholder={`import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\ns.bind(('${params.ipAddress}', ${params.portNumber}))`}
                className="w-full bg-black border border-white/15 focus:border-amber-400 rounded-lg p-3 text-xs font-mono text-amber-300 leading-relaxed resize-y"
              />
              <p className="text-[11px] text-white/40 mt-1">
                Tip: ใช้ socket.SOCK_DGRAM และ bind เข้ากับ IP/Port ประจำตัว
              </p>
            </div>
          </div>

          {/* Compare TCP vs UDP */}
          <div className="bg-neutral-900/70 border border-white/10 rounded-xl p-4">
            <label className="text-xs font-medium text-white/90 block mb-2">
              * เปรียบเทียบความแตกต่างของโค้ดเมื่อเปลี่ยนไปใช้โปรโตคอล TCP (socket.SOCK_STREAM) และ UDP (socket.SOCK_DGRAM) สำหรับพอร์ทประจำตัวของคุณ
            </label>
            <textarea
              rows={3}
              value={answers.tcpUdpComparison}
              onChange={(e) => onAnswerChange('tcpUdpComparison', e.target.value)}
              placeholder="อธิบายความแตกต่าง เช่น TCP เป็น Connection-oriented ต้องมีการเชื่อมต่อ (Handshake/listen/accept) และรับประกันความน่าเชื่อถือ ส่วน UDP เป็น Connectionless รวดเร็วกว่า ไม่มีการสร้าง connection สามารถส่งข้อมูลผ่าน sendto/recvfrom ได้ทันที..."
              className="w-full bg-black border border-white/15 focus:border-purple-400 rounded-lg p-3 text-xs text-white leading-relaxed resize-y"
            />
          </div>
        </div>

        {/* 2.2 Packet Switching Calculation */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <h4 className="text-base font-semibold text-white">
              2.2 การคำนวณการส่งข้อมูลแบบ Packet Switching
            </h4>
          </div>
          <p className="text-xs text-white/70">
            * นำขนาดข้อมูลรวม จากประจำตัวของคุณ 4 ตัวท้าย ({params.last4 || 'xxxx'} ไบต์) มาคำนวณหากต้องแบ่งข้อมูลออกเป็นแพ็กเก็ต แพ็กเก็ตละ 128 ไบต์ จะต้องใช้ทั้งหมดกี่แพ็กเก็ต
            <span className="text-cyan-300 font-mono block mt-1">
              (ตัวอย่างในโจทย์: รหัสลงท้าย 2010 ไบต์ แบ่งทีละ 128 ไบต์ ได้ 15.70 ปัดเป็น 16 แพ็กเก็ต)
            </span>
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-white/20 text-xs">
              <thead>
                <tr className="bg-white/10 text-white font-mono">
                  <th className="p-3 text-left border border-white/20">ขนาดข้อมูลรวม (Bytes)</th>
                  <th className="p-3 text-left border border-white/20">การคำนวณ (ข้อมูล ÷ 128)</th>
                  <th className="p-3 text-left border border-white/20">ผลหารทศนิยม</th>
                  <th className="p-3 text-left border border-white/20">จำนวนแพ็กเก็ตจริง</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-mono">
                {/* 512 Bytes */}
                <tr className="hover:bg-white/5">
                  <td className="p-3 font-semibold text-white border border-white/20">512 ไบต์</td>
                  <td className="p-2 border border-white/20">
                    <input
                      type="text"
                      value={answers.packet512Calc}
                      onChange={(e) => onAnswerChange('packet512Calc', e.target.value)}
                      placeholder="512 / 128"
                      className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white"
                    />
                  </td>
                  <td className="p-2 border border-white/20">
                    <input
                      type="text"
                      value={answers.packet512Decimal}
                      onChange={(e) => onAnswerChange('packet512Decimal', e.target.value)}
                      placeholder="4.00"
                      className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white"
                    />
                  </td>
                  <td className="p-2 border border-white/20">
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={answers.packet512Count}
                        onChange={(e) => onAnswerChange('packet512Count', e.target.value)}
                        placeholder="4"
                        className="w-16 bg-black/60 border border-white/10 rounded px-2 py-1 text-cyan-300 font-bold"
                      />
                      <span className="text-white/60">แพ็กเก็ต</span>
                    </div>
                  </td>
                </tr>

                {/* 1,000 Bytes */}
                <tr className="hover:bg-white/5">
                  <td className="p-3 font-semibold text-white border border-white/20">1,000 ไบต์</td>
                  <td className="p-2 border border-white/20">
                    <input
                      type="text"
                      value={answers.packet1000Calc}
                      onChange={(e) => onAnswerChange('packet1000Calc', e.target.value)}
                      placeholder="1000 / 128"
                      className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white"
                    />
                  </td>
                  <td className="p-2 border border-white/20">
                    <input
                      type="text"
                      value={answers.packet1000Decimal}
                      onChange={(e) => onAnswerChange('packet1000Decimal', e.target.value)}
                      placeholder="7.81"
                      className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white"
                    />
                  </td>
                  <td className="p-2 border border-white/20">
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={answers.packet1000Count}
                        onChange={(e) => onAnswerChange('packet1000Count', e.target.value)}
                        placeholder="8"
                        className="w-16 bg-black/60 border border-white/10 rounded px-2 py-1 text-cyan-300 font-bold"
                      />
                      <span className="text-white/60">แพ็กเก็ต</span>
                    </div>
                  </td>
                </tr>

                {/* 1,500 Bytes (Example in Sheet) */}
                <tr className="bg-white/5 text-white/70">
                  <td className="p-3 font-semibold border border-white/20">1,500 ไบต์ (ตัวอย่าง)</td>
                  <td className="p-3 border border-white/20">1,500 / 128</td>
                  <td className="p-3 border border-white/20">11.72</td>
                  <td className="p-3 font-bold text-white border border-white/20">12 แพ็กเก็ต</td>
                </tr>

                {/* 4 digits personal row */}
                <tr className="bg-cyan-950/20 border-2 border-cyan-400/40">
                  <td className="p-3 font-semibold text-cyan-300 border border-white/20">
                    (4 ตัวท้าย) {params.last4 || 'xxxx'} ไบต์
                  </td>
                  <td className="p-2 border border-white/20">
                    <input
                      type="text"
                      value={answers.packetCustomCalc}
                      onChange={(e) => onAnswerChange('packetCustomCalc', e.target.value)}
                      placeholder={`${params.last4 || 'xxxx'} / 128`}
                      className="w-full bg-black/80 border border-cyan-400/50 rounded px-2 py-1 text-cyan-200"
                    />
                  </td>
                  <td className="p-2 border border-white/20">
                    <input
                      type="text"
                      value={answers.packetCustomDecimal}
                      onChange={(e) => onAnswerChange('packetCustomDecimal', e.target.value)}
                      placeholder={params.last4 ? (params.last4 / 128).toFixed(2) : '15.70'}
                      className="w-full bg-black/80 border border-cyan-400/50 rounded px-2 py-1 text-cyan-200"
                    />
                  </td>
                  <td className="p-2 border border-white/20">
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={answers.packetCustomCount}
                        onChange={(e) => onAnswerChange('packetCustomCount', e.target.value)}
                        placeholder={params.last4 ? Math.ceil(params.last4 / 128).toString() : '16'}
                        className="w-20 bg-black border border-cyan-400 rounded px-2 py-1 text-cyan-300 font-bold"
                      />
                      <span className="text-cyan-300 font-semibold">แพ็กเก็ต</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2.3 Duplex & Protocol Analysis */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-purple-400" />
            <h4 className="text-base font-semibold text-white">
              2.3 การวิเคราะห์ทิศทางการสื่อสารและโปรโตคอล
            </h4>
            <span className="text-xs text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800 font-mono">
              รหัสนักศึกษา {params.studentId || '681495201x'}
            </span>
          </div>

          <div className="p-3 bg-neutral-900 rounded-xl border border-white/10 text-xs space-y-1">
            <div className="text-white/80">
              * หากค่า X ของคุณเป็นเลขคู่ ให้แสดงตัวอย่างแอปพลิเคชันที่เป็นการสื่อสารแบบ{' '}
              <strong className="text-cyan-400">Full-Duplex</strong>
            </div>
            <div className="text-white/80">
              * หากค่า X ของคุณเป็นเลขคี่ ให้แสดงตัวอย่างแอปพลิเคชันที่เป็นการสื่อสารแบบ{' '}
              <strong className="text-orange-400">Half-Duplex</strong>
            </div>
            <div className="text-cyan-300 font-medium mt-1">
              👉 รหัสของคุณมีค่า X = {params.X} (เลข{params.X % 2 === 0 ? 'คู่' : 'คี่'}) จึงต้องยกตัวอย่างแบบ{' '}
              <span className="underline font-bold font-mono">
                {params.X % 2 === 0 ? 'Full-Duplex' : 'Half-Duplex'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-white/80 block mb-1">
                ตอบ ตัวอย่างแอปพลิเคชัน (ตามเงื่อนไขเลขคู่/คี่ของคุณ):
              </label>
              <textarea
                rows={2}
                value={answers.duplexApplication}
                onChange={(e) => onAnswerChange('duplexApplication', e.target.value)}
                placeholder={
                  params.X % 2 === 0
                    ? 'เช่น โทรศัพท์เคลื่อนที่ (Mobile Phone Call) หรือ Video Conference (Zoom/Google Meet/Discord) ที่คู่สนทนาสามารถพูดและฟังได้พร้อมกันในเวลาเดียวกัน...'
                    : 'เช่น วิทยุสื่อสาร (Walkie-Talkie), วิทยุตำรวจ ซึ่งผู้ส่งและผู้รับสามารถสื่อสารได้ 2 ทิศทาง แต่ต้องสลับกันส่งทีละคน ไม่สามารถพูดพร้อมกันได้...'
                }
                className="w-full bg-black border border-white/15 focus:border-purple-400 rounded-lg p-3 text-xs text-white leading-relaxed resize-y"
              />
            </div>

            <div>
              <label className="text-xs text-white/80 block mb-1">
                * อธิบายเหตุผลว่าแอปพลิเคชันที่คุณยกตัวอย่างควรเลือกใช้โปรโตคอล TCP หรือ UDP:
              </label>
              <textarea
                rows={2}
                value={answers.duplexReasonProtocol}
                onChange={(e) => onAnswerChange('duplexReasonProtocol', e.target.value)}
                placeholder="เช่น ควรเลือกใช้ UDP สำหรับ Voice/Video Call แบบ Real-time เนื่องจากต้องการความรวดเร็วและ latency ต่ำ ยอมรับข้อมูลแพ็กเก็ตสูญหายได้เล็กน้อยโดยไม่จำเป็นต้องส่งซ้ำ (no retransmission)..."
                className="w-full bg-black border border-white/15 focus:border-purple-400 rounded-lg p-3 text-xs text-white leading-relaxed resize-y"
              />
            </div>
          </div>
        </div>

        {/* 2.4 Docker Container */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-cyan-400" />
            <h4 className="text-base font-semibold text-white">
              2.4 การตั้งค่า Docker Container
            </h4>
          </div>
          <p className="text-xs text-white/70">
            * เขียนคำสั่งใน Dockerfile หรือคำสั่ง Docker Run โดยระบุการเปิดพอร์ท (EXPOSE หรือ Port Mapping) ด้วยหมายเลข Port Number ประจำตัวของคุณ (<span className="text-emerald-400 font-mono font-bold">{params.portNumber}</span>)
          </p>

          <textarea
            rows={4}
            value={answers.dockerConfig}
            onChange={(e) => onAnswerChange('dockerConfig', e.target.value)}
            placeholder={`# ตัวอย่างคำสั่ง Dockerfile หรือ Docker Run ด้วยพอร์ต ${params.portNumber}\nEXPOSE ${params.portNumber}\n# หรือคำสั่งรันคอนเทนเนอร์พร้อม Port Mapping:\ndocker run -d -p ${params.portNumber}:${params.portNumber} --name my_echo_server echo_server`}
            className="w-full bg-black border border-white/15 focus:border-cyan-400 rounded-lg p-3 text-xs font-mono text-cyan-300 leading-relaxed resize-y"
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* ส่วนที่ 3: สรุปภาพรวมความเข้าใจ */}
      {/* ======================================================== */}
      <div className="bg-neutral-950/70 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">ส่วนที่ 3: สรุปภาพรวมความเข้าใจ</h3>
            <p className="text-xs text-white/60">อธิบายข้อดีของการใช้ Docker ตามพารามิเตอร์เฉพาะบุคคล</p>
          </div>
          <span className="ml-auto text-xs font-mono text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800">
            10 คะแนน
          </span>
        </div>

        <div>
          <label className="text-xs text-white/80 block mb-2 leading-relaxed">
            * อธิบายข้อดีของการใช้ Docker ในการจำลองสภาพแวดล้อมระบบ Client และ Server ตามพารามิเตอร์เฉพาะบุคคลที่คุณได้รับ (ความยาว 3-5 บรรทัด)
          </label>
          <textarea
            rows={4}
            value={answers.dockerSummary}
            onChange={(e) => onAnswerChange('dockerSummary', e.target.value)}
            placeholder="เช่น Docker ช่วยแยกสภาพแวดล้อม (Isolation) ของแต่ละโปรเซสได้อย่างสมบูรณ์ ทำให้นักศึกษาแต่ละคนสามารถรัน Client และ Server ด้วยพอร์ตเฉพาะบุคคล (เช่น พอร์ต 8567) บนเครื่องเดียวกันได้โดยไม่มีปัญหาพอร์ตชนกัน และไม่ต้องติดตั้ง Python หรือ Dependencies บนเครื่องโฮสต์โดยตรง ทำให้การทดสอบระบบเครือข่ายเป็นไปอย่างมีประสิทธิภาพและสามารถทำซ้ำได้ทุกระบบปฏิบัติการ..."
            className="w-full bg-black border border-white/15 focus:border-emerald-400 rounded-lg p-3 text-xs text-white leading-relaxed resize-y"
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* ตอนที่ 3: การใช้งาน socket ในภาษา Python (เติมคำในช่องว่าง) */}
      {/* ======================================================== */}
      <div className="bg-neutral-950/70 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
            4
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              ตอนที่ 3: การใช้งาน socket ในภาษา Python (เติมคำในช่องว่าง)
            </h3>
            <p className="text-xs text-white/60">
              คำสั่ง: จงเติมคำหรือข้อความลงในช่องว่าง ให้ถูกต้องและสมบูรณ์
            </p>
          </div>
          <span className="ml-auto text-xs font-mono text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800">
            15 คะแนน
          </span>
        </div>

        <div className="space-y-4 text-xs text-white/90 leading-relaxed font-sans">
          {/* Item 1 */}
          <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/5 space-y-2">
            <p>
              1. ในการสร้างวัตถุ socket สำหรับการสื่อสารแบบ TCP ต้องระบุชนิดของโปรโตคอลเป็น{' '}
              <code className="text-cyan-400 font-mono">socket.SOCK_STREAM</code> แต่หากต้องการใช้โปรโตคอล UDP จะต้องระบุชนิดเป็น:
            </p>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-white/60">socket.</span>
              <input
                type="text"
                value={answers.blank1}
                onChange={(e) => onAnswerChange('blank1', e.target.value)}
                placeholder="เช่น SOCK_DGRAM"
                className="bg-black border border-white/20 focus:border-amber-400 rounded px-2.5 py-1 text-amber-300 font-mono w-48 text-xs"
              />
            </div>
          </div>

          {/* Item 2 */}
          <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/5 space-y-2">
            <p>
              2. ฟังก์ชัน <code className="text-cyan-400 font-mono">bind((HOST, PORT))</code> ของ Server ทำหน้าที่ในการผูก:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={answers.blank2_1}
                onChange={(e) => onAnswerChange('blank2_1', e.target.value)}
                placeholder="เช่น HOST หรือ หมายเลข IP"
                className="bg-black border border-white/20 focus:border-amber-400 rounded px-2.5 py-1 text-amber-300 font-mono w-44 text-xs"
              />
              <span>และ</span>
              <input
                type="text"
                value={answers.blank2_2}
                onChange={(e) => onAnswerChange('blank2_2', e.target.value)}
                placeholder="เช่น PORT หรือ หมายเลขพอร์ต"
                className="bg-black border border-white/20 focus:border-amber-400 rounded px-2.5 py-1 text-amber-300 font-mono w-44 text-xs"
              />
              <span>เข้ากับ Socket ของเซิร์ฟเวอร์</span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/5 space-y-2">
            <p>
              3. ใน TCP Server ฟังก์ชันที่ใช้ในการเปิดรับและรอการเชื่อมต่อจาก Client คือฟังก์ชัน:
            </p>
            <div className="flex items-center gap-1 font-mono">
              <input
                type="text"
                value={answers.blank3}
                onChange={(e) => onAnswerChange('blank3', e.target.value)}
                placeholder="เช่น listen"
                className="bg-black border border-white/20 focus:border-amber-400 rounded px-2.5 py-1 text-amber-300 font-mono w-40 text-xs"
              />
              <span className="text-white/60">()</span>
            </div>
          </div>

          {/* Item 4 */}
          <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/5 space-y-2">
            <p>
              4. สำหรับ UDP Server เมื่อต้องการรับข้อมูลพร้อมกับรับที่อยู่ (IP & Port) ของผู้ส่ง จะต้องใช้ฟังก์ชัน{' '}
              <code className="text-cyan-400 font-mono">recvfrom()</code> ในขณะที่การส่งข้อมูลกลับไปยังผู้ส่งจะใช้ฟังก์ชัน:
            </p>
            <div className="flex items-center gap-1 font-mono">
              <input
                type="text"
                value={answers.blank4}
                onChange={(e) => onAnswerChange('blank4', e.target.value)}
                placeholder="เช่น sendto"
                className="bg-black border border-white/20 focus:border-amber-400 rounded px-2.5 py-1 text-amber-300 font-mono w-40 text-xs"
              />
              <span className="text-white/60">(data, addr)</span>
            </div>
          </div>

          {/* Item 5 */}
          <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/5 space-y-2">
            <p>
              5. เมื่อต้องการแปลงข้อความสตริง (String) ใน Python ให้เป็นข้อมูลชนิดไบต์ (Bytes) เพื่อส่งผ่าน Socket จะต้องใช้เมธอด{' '}
              <code className="text-cyan-400 font-mono">.encode()</code> และเมื่อรับข้อมูลไบต์กลับมา ต้องการแปลงเป็นสตริงจะต้องใช้เมธอด:
            </p>
            <div className="flex items-center gap-1 font-mono">
              <span className="text-white/60">.</span>
              <input
                type="text"
                value={answers.blank5}
                onChange={(e) => onAnswerChange('blank5', e.target.value)}
                placeholder="เช่น decode"
                className="bg-black border border-white/20 focus:border-amber-400 rounded px-2.5 py-1 text-amber-300 font-mono w-40 text-xs"
              />
              <span className="text-white/60">()</span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ตอนที่ 4: คำสั่งและการจัดการคอนเทนเนอร์ด้วย Docker */}
      {/* ======================================================== */}
      <div className="bg-neutral-950/70 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
            5
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              ตอนที่ 4: คำสั่งและการจัดการคอนเทนเนอร์ด้วย Docker (เติมคำในช่องว่าง)
            </h3>
            <p className="text-xs text-white/60">
              เติมคำสั่ง คำหลัก หรือ Option ให้คำสั่ง Docker ทำงานได้อย่างถูกต้อง
            </p>
          </div>
          <span className="ml-auto text-xs font-mono text-blue-300 bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-800">
            10 คะแนน
          </span>
        </div>

        <div className="space-y-4 text-xs text-white/90 leading-relaxed font-sans">
          {/* Item 6 */}
          <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/5 space-y-2">
            <p>
              6. คำสั่ง Docker ที่ใช้ในการสร้าง Network จำลอง เพื่อให้ Container สามารถสื่อสารกันผ่านชื่อ (Container Name) ได้ คือคำสั่ง:
            </p>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-white/80">docker network</span>
              <input
                type="text"
                value={answers.blank6}
                onChange={(e) => onAnswerChange('blank6', e.target.value)}
                placeholder="เช่น create"
                className="bg-black border border-white/20 focus:border-blue-400 rounded px-2.5 py-1 text-blue-300 font-mono w-32 text-xs"
              />
              <span className="text-white/60">&lt;network_name&gt;</span>
            </div>
          </div>

          {/* Item 7 */}
          <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/5 space-y-2">
            <p>
              7. คำสั่งที่ใช้ในการ สร้าง Docker Image จากไฟล์ Dockerfile คือ:
            </p>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-white/80">docker</span>
              <input
                type="text"
                value={answers.blank7}
                onChange={(e) => onAnswerChange('blank7', e.target.value)}
                placeholder="เช่น build"
                className="bg-black border border-white/20 focus:border-blue-400 rounded px-2.5 py-1 text-blue-300 font-mono w-32 text-xs"
              />
              <span className="text-white/60">-f Dockerfile.server -t echo_server .</span>
            </div>
          </div>

          {/* Item 8 */}
          <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/5 space-y-2">
            <p>
              8. การรัน Container ในโหมด Background (ไม่แสดง log บนหน้าจอหลัก) จะต้องใส่ Option ______ แต่หากต้องการเปิดโหมด Interactive ที่รับอินพุตจากผู้ใช้ได้ จะต้องใส่ Option ______:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-white/70">โหมด Background ใส่:</span>
              <input
                type="text"
                value={answers.blank8_1}
                onChange={(e) => onAnswerChange('blank8_1', e.target.value)}
                placeholder="เช่น -d"
                className="bg-black border border-white/20 focus:border-blue-400 rounded px-2.5 py-1 text-blue-300 font-mono w-24 text-xs"
              />
              <span className="text-white/70 ml-2">โหมด Interactive ใส่:</span>
              <input
                type="text"
                value={answers.blank8_2}
                onChange={(e) => onAnswerChange('blank8_2', e.target.value)}
                placeholder="เช่น -it"
                className="bg-black border border-white/20 focus:border-blue-400 rounded px-2.5 py-1 text-blue-300 font-mono w-24 text-xs"
              />
            </div>
          </div>

          {/* Item 9 */}
          <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/5 space-y-2">
            <p>
              9. ตัวอย่างคำสั่งรัน Client Container ให้เชื่อมต่อกับ Network ชื่อ <code className="text-cyan-300 font-mono">udp_network</code>:
            </p>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-white/80">docker run -it --name udp_client --network</span>
              <input
                type="text"
                value={answers.blank9}
                onChange={(e) => onAnswerChange('blank9', e.target.value)}
                placeholder="เช่น udp_network"
                className="bg-black border border-white/20 focus:border-blue-400 rounded px-2.5 py-1 text-blue-300 font-mono w-36 text-xs"
              />
              <span className="text-white/80">udp_client</span>
            </div>
          </div>

          {/* Item 10 */}
          <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/5 space-y-2">
            <p>
              10. เมื่อทดสอบการทำงานเสร็จเรียบร้อยแล้ว หากต้องการ หยุดการทำงาน และ ลบคอนเทนเนอร์ ชื่อ <code className="text-cyan-300 font-mono">udp_server</code> จะต้องใช้ชุดคำสั่ง:
            </p>
            <div className="space-y-2 font-mono pl-4">
              <div className="flex items-center gap-2">
                <span className="text-white/70">* หยุดทำงาน: docker</span>
                <input
                  type="text"
                  value={answers.blank10_1}
                  onChange={(e) => onAnswerChange('blank10_1', e.target.value)}
                  placeholder="เช่น stop"
                  className="bg-black border border-white/20 focus:border-blue-400 rounded px-2.5 py-1 text-blue-300 font-mono w-28 text-xs"
                />
                <span className="text-white/70">udp_server</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/70">* ลบคอนเทนเนอร์: docker</span>
                <input
                  type="text"
                  value={answers.blank10_2}
                  onChange={(e) => onAnswerChange('blank10_2', e.target.value)}
                  placeholder="เช่น rm"
                  className="bg-black border border-white/20 focus:border-blue-400 rounded px-2.5 py-1 text-blue-300 font-mono w-28 text-xs"
                />
                <span className="text-white/70">udp_server</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Submit Action */}
      <div className="sticky bottom-4 z-30 p-4 bg-black/90 border border-white/20 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-white/50 block">ส่งใบงานเพื่อประมวลผลทันที</span>
          <span className="text-sm font-semibold text-white">
            ระบบจะตรวจคำตอบและคำนวณคะแนนตามรหัส {params.studentId || 'ของคุณ'}
          </span>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onSubmit}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold text-sm hover:bg-white/90 btn-cut transition-all cursor-pointer flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <span>ส่งตรวจงานอัตโนมัติ (AUTO-GRADE)</span>
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

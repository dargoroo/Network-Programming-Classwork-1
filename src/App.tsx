/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, FileText, Cpu, Printer, Play } from 'lucide-react';
import { StudentParams, WorksheetAnswers, GradingResult } from './types.ts';
import { parseStudentId, gradeWorksheet } from './utils/grader.ts';
import { VortxNavbar } from './components/VortxNavbar.tsx';
import { StudentHeaderBar } from './components/StudentHeaderBar.tsx';
import { WorksheetForm } from './components/WorksheetForm.tsx';
import { GradingReportView } from './components/GradingReportView.tsx';
import { TeacherSolutionEngine } from './components/TeacherSolutionEngine.tsx';
import { PrintableWorksheet } from './components/PrintableWorksheet.tsx';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260717_120352_eb988725-1351-43b3-8095-16e4a1005e3d.mp4';

const initialAnswers: WorksheetAnswers = {
  ipAnswer: '',
  portAnswer: '',
  dataSizeAnswer: '',
  tcpCode: '',
  udpCode: '',
  tcpUdpComparison: '',
  packet512Calc: '',
  packet512Decimal: '',
  packet512Count: '',
  packet1000Calc: '',
  packet1000Decimal: '',
  packet1000Count: '',
  packet1500Calc: '1,500 / 128',
  packet1500Decimal: '11.72',
  packet1500Count: '12',
  packetCustomBytes: '',
  packetCustomCalc: '',
  packetCustomDecimal: '',
  packetCustomCount: '',
  duplexApplication: '',
  duplexReasonProtocol: '',
  dockerConfig: '',
  dockerSummary: '',
  blank1: '',
  blank2_1: '',
  blank2_2: '',
  blank3: '',
  blank4: '',
  blank5: '',
  blank6: '',
  blank7: '',
  blank8_1: '',
  blank8_2: '',
  blank9: '',
  blank10_1: '',
  blank10_2: '',
};

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'worksheet' | 'grading' | 'teacher' | 'print'>('landing');

  // Student details
  const [studentId, setStudentId] = useState('6814952010');
  const [fullName, setFullName] = useState('สมชาย ใจมั่นคง');
  const [section, setSection] = useState('CS68-01');

  // Answers & Grading
  const [answers, setAnswers] = useState<WorksheetAnswers>(initialAnswers);
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null);

  // Dynamic parameters from student ID
  const params: StudentParams = useMemo(() => {
    return parseStudentId(studentId, fullName, section);
  }, [studentId, fullName, section]);

  const handleAnswerChange = <K extends keyof WorksheetAnswers>(field: K, value: WorksheetAnswers[K]) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFillSampleAnswers = () => {
    const isEven = params.X % 2 === 0;
    const customBytes = params.last4 || 2010;
    const customDecimal = (customBytes / 128).toFixed(2);
    const customPackets = Math.ceil(customBytes / 128).toString();

    setAnswers({
      ipAnswer: params.ipAddress,
      portAnswer: params.portNumber.toString(),
      dataSizeAnswer: `${params.totalBytes} ไบต์`,
      tcpCode: `import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.bind(('${params.ipAddress}', ${params.portNumber}))\ns.listen(5)\nconn, addr = s.accept()`,
      udpCode: `import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\ns.bind(('${params.ipAddress}', ${params.portNumber}))\ndata, addr = s.recvfrom(1024)`,
      tcpUdpComparison: `TCP (SOCK_STREAM) เป็น Connection-oriented มีการทำ 3-Way Handshake ข้อมูลจัดส่งอย่างน่าเชื่อถือและเรียงลำดับ ในขณะที่ UDP (SOCK_DGRAM) เป็น Connectionless รวดเร็วกว่า ไม่มี overhead แต่ไม่รับประกันความสูญหาย`,
      packet512Calc: '512 / 128',
      packet512Decimal: '4.00',
      packet512Count: '4',
      packet1000Calc: '1000 / 128',
      packet1000Decimal: '7.81',
      packet1000Count: '8',
      packet1500Calc: '1500 / 128',
      packet1500Decimal: '11.72',
      packet1500Count: '12',
      packetCustomBytes: `${customBytes} ไบต์`,
      packetCustomCalc: `${customBytes} / 128`,
      packetCustomDecimal: customDecimal,
      packetCustomCount: customPackets,
      duplexApplication: isEven
        ? 'แอปพลิเคชัน Video Call / VoIP (เช่น Zoom หรือ Discord) ที่สามารถสนทนาเสียงและรับข้อมูลภาพได้พร้อมกันสองทิศทาง (Full-Duplex)'
        : 'วิทยุสื่อสาร Walkie-Talkie ที่ผู้สื่อสารต้องสลับกันกดปุ่มพูด (Push-to-Talk) ผลัดกันส่งทีละคน ไม่สามารถคุยพร้อมกันได้ (Half-Duplex)',
      duplexReasonProtocol: isEven
        ? 'เลือกใช้โปรโตคอล UDP (ร่วมกับ RTP/WebRTC) เนื่องจากต้องการความเร็ว Real-time สูงและ Latency ต่ำ ยอมรับข้อมูลเสียงตกหล่นเล็กน้อยได้'
        : 'เลือกใช้โปรโตคอล UDP เนื่องจากเป็นการส่งแพ็กเก็ตข้อความเสียงแบบสั้น ไม่ต้องการการเชื่อมต่อถาวรเพื่อประหยัดแบนด์วิดท์',
      dockerConfig: `# Dockerfile สำหรับเซิร์ฟเวอร์\nFROM python:3.11-slim\nWORKDIR /app\nCOPY server.py .\nEXPOSE ${params.portNumber}\nCMD ["python", "server.py"]\n\n# หรือคำสั่งรัน:\ndocker run -d -p ${params.portNumber}:${params.portNumber} --name net_server my_image`,
      dockerSummary: `Docker ช่วยแยกสภาพแวดล้อม (Isolation) ในการทดสอบระบบ Client และ Server ของนักศึกษาแต่ละคนได้อย่างเป็นอิสระ ป้องกันปัญหาหมายเลขพอร์ตประจำตัว ${params.portNumber} ชนกับเครื่องอื่น และช่วยจำลองระบบเครือข่ายเสมือนได้อย่างสะดวกรวดเร็ว`,
      blank1: 'SOCK_DGRAM',
      blank2_1: 'HOST',
      blank2_2: 'PORT',
      blank3: 'listen',
      blank4: 'sendto',
      blank5: 'decode',
      blank6: 'create',
      blank7: 'build',
      blank8_1: '-d',
      blank8_2: '-it',
      blank9: 'udp_network',
      blank10_1: 'stop',
      blank10_2: 'rm',
    });
  };

  const handleClearAnswers = () => {
    setAnswers(initialAnswers);
    setGradingResult(null);
  };

  const handleGradeSubmission = () => {
    const result = gradeWorksheet(answers, params);
    setGradingResult(result);
    setCurrentView('grading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadPreset = (presetId: string, presetName: string, presetSec: string) => {
    setStudentId(presetId);
    setFullName(presetName);
    setSection(presetSec);
  };

  return (
    <div className="min-h-screen w-full bg-black p-3 md:p-4 font-inter text-white">
      {/* Liquid Glass Outer Container */}
      <div className="w-full min-h-[calc(100vh-2rem)] rounded-2xl flex flex-col overflow-hidden relative bg-black border border-white/10 shadow-2xl">
        {/* Background Looping Video from CloudFront specification */}
        <video
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover anim-fade pointer-events-none opacity-40 mix-blend-screen"
          style={{ animationDelay: '0.2s' }}
        />

        {/* Ambient Dark Gradients & Cyber Lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/95 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Navbar */}
        <VortxNavbar
          currentView={currentView === 'print' ? 'worksheet' : currentView}
          setCurrentView={(v) => {
            setCurrentView(v);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenWorksheet={() => {
            setCurrentView('worksheet');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          hasGradingResult={!!gradingResult}
        />

        {/* Main View Switcher */}
        {currentView === 'landing' && (
          <div className="relative z-10 flex-1 flex flex-col justify-between px-6 md:px-10 pb-8 md:pb-10 pt-4 md:pt-6">
            {/* Top section */}
            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center relative my-auto min-h-[460px]">
              {/* Left column from prompt */}
              <div
                className="anim-stagger hidden lg:flex flex-col gap-6 absolute left-0 top-[18%]"
                style={{ animationDelay: '0.4s' }}
              >
                <p className="text-white/80 text-base leading-relaxed max-w-[220px]">
                  Come with us
                  <br />
                  exploring the
                  <br />
                  horizon
                </p>

                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full border border-white/40" />
                    <div className="w-4 h-4 rounded-full border border-white/40" />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-white/70 text-xs">
                      Perpetual
                      <br />
                      Immersion
                    </span>
                    <span className="text-white/50 text-xs font-mono">01</span>
                  </div>
                </div>
              </div>

              {/* Center heading from prompt */}
              <div
                className="anim-stagger w-full text-center max-w-4xl mx-auto flex flex-col items-center justify-center"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white/80 border border-white/15 backdrop-blur-md mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>NETWORK AUTOMATION & INTELLIGENT AUTO-GRADING</span>
                </div>

                <h1
                  className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.1] tracking-[-0.04em]"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.25)' }}
                >
                  Forging Tomorrow
                  <br />
                  Virtual Horizon
                  <br />
                  VortxLab Creations
                </h1>

                <p className="mt-4 text-xs sm:text-sm text-white/70 max-w-xl font-light leading-relaxed">
                  ระบบ Automation แปลงใบงานกระดาษสู่ระบบตรวจงานอัตโนมัติ คำนวณพารามิเตอร์เฉพาะบุคคล (IP, Port, Packet Switching) และประเมินผลคำตอบแบบเรียลไทม์
                </p>

                {/* Hero Student Quick Start Form */}
                <div className="mt-8 w-full max-w-2xl bg-black/60 border border-white/15 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-2xl text-left">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-semibold text-cyan-300 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      ระบุข้อมูลเพื่อเริ่มทำใบงานระบบตรวจอัตโนมัติ
                    </span>
                    <span className="text-[11px] text-white/40 font-mono">
                      X={params.X}, Y={params.Y}, Z={params.Z}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-[11px] text-white/70 block mb-1">
                        รหัสนักศึกษา (3 ตัวท้าย = X, Y, Z) *
                      </label>
                      <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="เช่น 6814952010"
                        className="w-full bg-black/80 border border-white/20 focus:border-cyan-400 rounded-lg px-3 py-2 text-xs font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-white/70 block mb-1">
                        ชื่อ-นามสกุล *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="เช่น สมชาย ใจมั่นคง"
                        className="w-full bg-black/80 border border-white/20 focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-white/60">
                      <span>IP: <strong className="text-white">{params.ipAddress}</strong></span>
                      <span>•</span>
                      <span>Port: <strong className="text-emerald-400">{params.portNumber}</strong></span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentView('worksheet');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 bg-white text-black text-xs font-semibold hover:bg-white/90 btn-cut flex items-center gap-2 cursor-pointer transition-transform active:scale-95 shadow-md"
                    >
                      <span>เปิดใบงานนักศึกษา</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row from prompt specification */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mt-8 pt-4">
              {/* Col 1 */}
              <div
                className="anim-stagger flex items-center justify-center md:justify-end"
                style={{ animationDelay: '0.7s' }}
              >
                <p className="text-white text-sm leading-relaxed max-w-[260px] text-center md:text-left md:ml-auto">
                  We push past conventions, reshaping the virtual terrain with next-level technologies.
                </p>
              </div>

              {/* Col 2 */}
              <div
                className="anim-stagger flex flex-col items-center gap-6 md:gap-14"
                style={{ animationDelay: '0.85s' }}
              >
                <span className="text-white text-2xl md:text-3xl font-medium tracking-tight">
                  Net Dynamics
                </span>
                <button
                  onClick={() => {
                    setCurrentView('worksheet');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full max-w-[280px] py-3.5 bg-white flex items-center justify-center gap-2 text-black hover:bg-white/90 transition-colors group btn-cut cursor-pointer shadow-lg"
                >
                  <span className="text-sm font-medium">Discover Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Col 3: Social Buttons */}
              <div
                className="anim-stagger flex items-center justify-center md:justify-end gap-3"
                style={{ animationDelay: '1s' }}
              >
                {/* X (Twitter) */}
                <a
                  href="#x"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 bg-white flex items-center justify-center text-black hover:bg-white/90 transition-colors btn-cut-sm cursor-pointer"
                  title="X (Twitter)"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="#linkedin"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 bg-white flex items-center justify-center text-black hover:bg-white/90 transition-colors btn-cut-sm cursor-pointer"
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="#facebook"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 bg-white flex items-center justify-center text-black hover:bg-white/90 transition-colors btn-cut-sm cursor-pointer"
                  title="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Worksheet Interactive View */}
        {currentView === 'worksheet' && (
          <div className="relative z-10 flex-1 px-4 sm:px-8 py-6 overflow-y-auto">
            <div className="mb-6">
              <StudentHeaderBar
                studentId={studentId}
                fullName={fullName}
                section={section}
                onStudentIdChange={setStudentId}
                onFullNameChange={setFullName}
                onSectionChange={setSection}
                params={params}
                onLoadPreset={handleLoadPreset}
              />
            </div>

            <WorksheetForm
              params={params}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              onSubmit={handleGradeSubmission}
              onFillSampleAnswers={handleFillSampleAnswers}
              onClearAnswers={handleClearAnswers}
              onPrintPreview={() => setCurrentView('print')}
              onOpenTeacherKey={() => setCurrentView('teacher')}
            />
          </div>
        )}

        {/* Grading Report View */}
        {currentView === 'grading' && (
          <div className="relative z-10 flex-1 px-4 sm:px-8 py-6 overflow-y-auto">
            {gradingResult ? (
              <GradingReportView
                result={gradingResult}
                onBackToWorksheet={() => setCurrentView('worksheet')}
                onPrint={() => setCurrentView('print')}
              />
            ) : (
              <div className="text-center py-20">
                <p className="text-white/60 mb-4">ยังไม่มีผลการตรวจ กรุณาส่งใบงานเพื่อประมวลผล</p>
                <button
                  onClick={() => setCurrentView('worksheet')}
                  className="px-6 py-2.5 bg-white text-black font-semibold rounded-lg"
                >
                  ไปที่ใบงาน
                </button>
              </div>
            )}
          </div>
        )}

        {/* Teacher Master Solution View */}
        {currentView === 'teacher' && (
          <div className="relative z-10 flex-1 px-4 sm:px-8 py-6 overflow-y-auto">
            <TeacherSolutionEngine />
          </div>
        )}

        {/* Printable Worksheet View */}
        {currentView === 'print' && (
          <div className="relative z-10 flex-1 px-4 sm:px-8 py-6 overflow-y-auto bg-neutral-900">
            <PrintableWorksheet
              params={params}
              answers={answers}
              onBack={() => setCurrentView('worksheet')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

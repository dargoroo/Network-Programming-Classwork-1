import React, { useState } from 'react';
import { Cpu, Search, Check, Copy, Sparkles, BookOpen, Layers, Users, ArrowRight } from 'lucide-react';
import { parseStudentId } from '../utils/grader.ts';

export const TeacherSolutionEngine: React.FC = () => {
  const [queryId, setQueryId] = useState('6814952010');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const params = parseStudentId(queryId, 'ตัวอย่างนักศึกษา', 'Sec 1');
  const isEven = params.X % 2 === 0;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sampleBatch = [
    { id: '6814952010', name: 'สมชาย ใจมั่นคง', x: 0, y: 1, z: 0, mode: 'Full-Duplex', ip: '192.168.0.10', port: 8010 },
    { id: '6814952567', name: 'กัญญาภัทร รุ่งเรือง', x: 5, y: 6, z: 7, mode: 'Half-Duplex', ip: '192.168.5.67', port: 8567 },
    { id: '6814952248', name: 'ปกรณ์ ธีรภัทร', x: 2, y: 4, z: 8, mode: 'Full-Duplex', ip: '192.168.2.48', port: 8248 },
    { id: '6814952913', name: 'วราภรณ์ วิริยะ', x: 9, y: 1, z: 3, mode: 'Half-Duplex', ip: '192.168.9.13', port: 8913 },
    { id: '6814952402', name: 'ธนกฤต ศิริสุข', x: 4, y: 0, z: 2, mode: 'Full-Duplex', ip: '192.168.4.02', port: 8402 },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-purple-950/80 via-neutral-900 to-black border border-white/10 rounded-3xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40 mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>INSTRUCTOR SUITE & DYNAMIC SOLUTION ENGINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          ระบบคำนวณเฉลยอัตโนมัติรายบุคคล (Master Answer Key)
        </h1>
        <p className="text-sm text-white/70 mt-2 max-w-3xl leading-relaxed">
          อาจารย์หรือผู้ตรวจสามารถกรอกรหัสนักศึกษาใดๆ เพื่อดูเฉลย ค่าพารามิเตอร์ ผลการคำนวณแพ็กเก็ต และโค้ดตัวอย่างที่ตรงกับรหัสนั้นได้อย่างแม่นยำ
        </p>
      </div>

      {/* Query Bar */}
      <div className="bg-neutral-950/80 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={queryId}
              onChange={(e) => setQueryId(e.target.value)}
              placeholder="กรอกรหัสนักศึกษา เช่น 6814952010 หรือ 6814952567"
              className="w-full bg-black/60 border border-white/20 focus:border-purple-400 rounded-xl pl-10 pr-4 py-2.5 text-white font-mono text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setQueryId('6814952010')}
              className="px-3 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all font-mono"
            >
              ทดสอบ 6814952010
            </button>
            <button
              onClick={() => setQueryId('6814952567')}
              className="px-3 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all font-mono"
            >
              ทดสอบ 6814952567
            </button>
          </div>
        </div>
      </div>

      {/* Master Key Card for Queried ID */}
      <div className="bg-neutral-950/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-mono text-purple-400 uppercase">
              MASTER ANSWER KEY FOR ID
            </span>
            <h2 className="text-xl font-bold text-white font-mono">
              {params.studentId || 'ไม่ระบุรหัส'} (X={params.X}, Y={params.Y}, Z={params.Z})
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-white/80">
              IP: <strong className="text-cyan-300 font-mono">{params.ipAddress}</strong>
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-white/80">
              Port: <strong className="text-emerald-300 font-mono">{params.portNumber}</strong>
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-white/80">
              Mode: <strong className="text-purple-300 font-mono">{params.duplexRequired}</strong>
            </span>
          </div>
        </div>

        {/* Section 1 Key */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-cyan-300 font-mono flex items-center gap-2">
            <span>[ส่วนที่ 1]</span>
            <span>เฉลยค่าพารามิเตอร์ประจำตัว</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-black/60 rounded-xl border border-white/5 font-mono">
              <span className="text-white/50 block">1.1 IP Address เซิร์ฟเวอร์:</span>
              <span className="text-sm font-bold text-white mt-1 block">{params.ipAddress}</span>
              <span className="text-[10px] text-white/40 block mt-1">สูตร: 192.168.X.YZ</span>
            </div>
            <div className="p-3 bg-black/60 rounded-xl border border-white/5 font-mono">
              <span className="text-white/50 block">1.2 Port Number:</span>
              <span className="text-sm font-bold text-emerald-300 mt-1 block">
                {params.portNumber}
              </span>
              <span className="text-[10px] text-white/40 block mt-1">
                8000 + ({params.X}*100) + ({params.Y}*10) + {params.Z}
              </span>
            </div>
            <div className="p-3 bg-black/60 rounded-xl border border-white/5 font-mono">
              <span className="text-white/50 block">1.3 ขนาดข้อมูลรวม:</span>
              <span className="text-sm font-bold text-amber-300 mt-1 block">
                {params.totalBytes} ไบต์
              </span>
              <span className="text-[10px] text-white/40 block mt-1">
                1000 + ({params.X}*50) + ({params.Y}*10) + {params.Z}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2.1 Code Key */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-purple-300 font-mono flex items-center gap-2">
            <span>[ส่วนที่ 2.1]</span>
            <span>เฉลยโค้ด Python TCP & UDP Socket</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-black/80 rounded-xl p-4 border border-white/10 relative">
              <span className="text-cyan-400 font-semibold block mb-2"># โค้ด TCP Socket:</span>
              <pre className="text-white/90 leading-relaxed overflow-x-auto">
{`import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('${params.ipAddress}', ${params.portNumber}))
s.listen(5)
conn, addr = s.accept()`}
              </pre>
            </div>
            <div className="bg-black/80 rounded-xl p-4 border border-white/10 relative">
              <span className="text-amber-400 font-semibold block mb-2"># โค้ด UDP Socket:</span>
              <pre className="text-white/90 leading-relaxed overflow-x-auto">
{`import socket

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind(('${params.ipAddress}', ${params.portNumber}))
data, addr = s.recvfrom(1024)`}
              </pre>
            </div>
          </div>
        </div>

        {/* Section 2.2 Packet Switching Key */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-emerald-300 font-mono flex items-center gap-2">
            <span>[ส่วนที่ 2.2]</span>
            <span>เฉลยการคำนวณ Packet Switching (÷ 128 ไบต์)</span>
          </h3>
          <div className="overflow-x-auto text-xs font-mono">
            <table className="w-full border-collapse border border-white/20">
              <thead>
                <tr className="bg-white/10 text-white">
                  <th className="p-2.5 text-left border border-white/20">ขนาดข้อมูล</th>
                  <th className="p-2.5 text-left border border-white/20">การคำนวณ</th>
                  <th className="p-2.5 text-left border border-white/20">ทศนิยม</th>
                  <th className="p-2.5 text-left border border-white/20">จำนวนแพ็กเก็ตจริง</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="p-2.5 border border-white/20 text-white">512 ไบต์</td>
                  <td className="p-2.5 border border-white/20 text-white/70">512 / 128</td>
                  <td className="p-2.5 border border-white/20 text-white/70">4.00</td>
                  <td className="p-2.5 border border-white/20 text-emerald-400 font-bold">4 แพ็กเก็ต</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-white/20 text-white">1,000 ไบต์</td>
                  <td className="p-2.5 border border-white/20 text-white/70">1000 / 128</td>
                  <td className="p-2.5 border border-white/20 text-white/70">7.8125</td>
                  <td className="p-2.5 border border-white/20 text-emerald-400 font-bold">8 แพ็กเก็ต</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-white/20 text-white">1,500 ไบต์ (ตัวอย่าง)</td>
                  <td className="p-2.5 border border-white/20 text-white/70">1,500 / 128</td>
                  <td className="p-2.5 border border-white/20 text-white/70">11.72</td>
                  <td className="p-2.5 border border-white/20 text-emerald-400 font-bold">12 แพ็กเก็ต</td>
                </tr>
                <tr className="bg-emerald-950/20">
                  <td className="p-2.5 border border-white/20 text-cyan-300 font-bold">
                    (4 ตัวท้าย) {params.last4} ไบต์
                  </td>
                  <td className="p-2.5 border border-white/20 text-cyan-300">
                    {params.last4} / 128
                  </td>
                  <td className="p-2.5 border border-white/20 text-cyan-300">
                    {(params.last4 / 128).toFixed(2)}
                  </td>
                  <td className="p-2.5 border border-white/20 text-emerald-400 font-bold text-sm">
                    {Math.ceil(params.last4 / 128)} แพ็กเก็ต (ปัดเศษขึ้น)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2.3 & 2.4 & Fill in the blanks */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-amber-300 font-mono flex items-center gap-2">
            <span>[ตอนที่ 3 & 4]</span>
            <span>เฉลยคำตอบเติมคำในช่องว่าง</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-black/60 rounded-xl border border-white/5 space-y-1">
              <span className="text-white/60 font-semibold block">ตอนที่ 3: Socket ใน Python</span>
              <p className="text-white/80">ข้อ 1: <strong className="text-cyan-300 font-mono">socket.SOCK_DGRAM</strong></p>
              <p className="text-white/80">ข้อ 2: <strong className="text-cyan-300 font-mono">HOST</strong> และ <strong className="text-cyan-300 font-mono">PORT</strong></p>
              <p className="text-white/80">ข้อ 3: <strong className="text-cyan-300 font-mono">listen()</strong></p>
              <p className="text-white/80">ข้อ 4: <strong className="text-cyan-300 font-mono">sendto()</strong></p>
              <p className="text-white/80">ข้อ 5: <strong className="text-cyan-300 font-mono">decode()</strong></p>
            </div>
            <div className="p-3 bg-black/60 rounded-xl border border-white/5 space-y-1">
              <span className="text-white/60 font-semibold block">ตอนที่ 4: Docker Container</span>
              <p className="text-white/80">ข้อ 6: <strong className="text-emerald-300 font-mono">create</strong></p>
              <p className="text-white/80">ข้อ 7: <strong className="text-emerald-300 font-mono">build</strong></p>
              <p className="text-white/80">ข้อ 8: Option <strong className="text-emerald-300 font-mono">-d</strong> และ <strong className="text-emerald-300 font-mono">-it</strong></p>
              <p className="text-white/80">ข้อ 9: <strong className="text-emerald-300 font-mono">udp_network</strong></p>
              <p className="text-white/80">ข้อ 10: docker <strong className="text-emerald-300 font-mono">stop</strong> และ docker <strong className="text-emerald-300 font-mono">rm</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Batch Overview Simulation */}
      <div className="bg-neutral-950/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            ตัวอย่างการตรวจข้อสอบทั้งห้องเรียน (Batch Automation Simulation)
          </h3>
          <span className="text-xs text-white/50 font-mono">Classroom Demo</span>
        </div>
        <p className="text-xs text-white/70">
          ระบบสามารถตรวจคำตอบนักศึกษาทั้งชั้นปีพร้อมกัน โดยคำนวณสูตรและเฉลยของแต่ละคนจากรหัสนักศึกษาแบบเรียลไทม์
        </p>

        <div className="overflow-x-auto text-xs font-mono">
          <table className="w-full border-collapse border border-white/10">
            <thead>
              <tr className="bg-white/5 text-white/80">
                <th className="p-2.5 text-left border border-white/10">รหัสนักศึกษา</th>
                <th className="p-2.5 text-left border border-white/10">ชื่อ-นามสกุล</th>
                <th className="p-2.5 text-left border border-white/10">ค่า X, Y, Z</th>
                <th className="p-2.5 text-left border border-white/10">โหมดสื่อสาร</th>
                <th className="p-2.5 text-left border border-white/10">IP ประจำตัว</th>
                <th className="p-2.5 text-left border border-white/10">Port ประจำตัว</th>
                <th className="p-2.5 text-left border border-white/10">แอคชั่น</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sampleBatch.map((stu) => (
                <tr key={stu.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-2.5 border border-white/10 font-bold text-white">{stu.id}</td>
                  <td className="p-2.5 border border-white/10 font-sans text-white/90">{stu.name}</td>
                  <td className="p-2.5 border border-white/10 text-cyan-300">
                    X={stu.x}, Y={stu.y}, Z={stu.z}
                  </td>
                  <td className="p-2.5 border border-white/10">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] ${
                        stu.mode === 'Full-Duplex'
                          ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                          : 'bg-orange-500/10 text-orange-300 border border-orange-500/30'
                      }`}
                    >
                      {stu.mode}
                    </span>
                  </td>
                  <td className="p-2.5 border border-white/10 text-white/80">{stu.ip}</td>
                  <td className="p-2.5 border border-white/10 text-emerald-300">{stu.port}</td>
                  <td className="p-2.5 border border-white/10">
                    <button
                      onClick={() => setQueryId(stu.id)}
                      className="px-2.5 py-1 text-[11px] bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                    >
                      ดูเฉลย
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

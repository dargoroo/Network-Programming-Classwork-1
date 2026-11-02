import React from 'react';
import { ArrowLeft, Printer } from 'lucide-react';
import { StudentParams, WorksheetAnswers } from '../types.ts';

interface PrintableWorksheetProps {
  params: StudentParams;
  answers: WorksheetAnswers;
  onBack: () => void;
}

export const PrintableWorksheet: React.FC<PrintableWorksheetProps> = ({
  params,
  answers,
  onBack,
}) => {
  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Action Bar (hidden on print) */}
      <div className="no-print flex items-center justify-between gap-4 p-4 bg-neutral-900 border border-white/10 rounded-2xl mb-8">
        <button
          onClick={onBack}
          className="px-4 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปหน้าระบบ</span>
        </button>
        <button
          onClick={() => window.print()}
          className="px-5 py-2 text-xs bg-white text-black font-semibold rounded-lg flex items-center gap-2 hover:bg-white/90 transition-all cursor-pointer shadow-md"
        >
          <Printer className="w-4 h-4" />
          <span>สั่งพิมพ์ / บันทึกเป็น PDF (Print A4)</span>
        </button>
      </div>

      {/* Paper Worksheet Container (Clean White A4 look for printing or viewing) */}
      <div className="bg-white text-black p-8 sm:p-12 rounded-2xl shadow-2xl font-serif text-sm leading-relaxed print:shadow-none print:p-0 print:m-0">
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            ใบงานเรื่อง ภาพรวมของโปรแกรมเครือข่ายและโมเดลการสื่อสาร
          </h1>
        </div>

        {/* Student Header line */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-6 text-sm">
          <div>
            รหัสนักศึกษา: <span className="font-mono font-bold underline px-2">{params.studentId || '__________________'}</span>
          </div>
          <div>
            ชื่อ-สกุล: <span className="font-semibold underline px-2">{params.fullName || '__________________________________'}</span>
          </div>
          <div>
            กลุ่มเรียน: <span className="font-semibold underline px-2">{params.section || '_________'}</span>
          </div>
        </div>

        <div className="mb-6 bg-gray-50 p-3 rounded border text-xs">
          กำหนดให้ <strong>X Y Z</strong> คือ เลข 3 ตัวท้ายของรหัสนักศึกษา (เช่น รหัสลงท้ายด้วย 567 จะได้ X = 5, Y = 6, Z = 7)
          {params.isValid && (
            <span className="block mt-1 font-semibold text-blue-800">
              [พารามิเตอร์ของรหัส {params.studentId}: X = {params.X}, Y = {params.Y}, Z = {params.Z}, 4 ตัวท้าย = {params.last4} ไบต์]
            </span>
          )}
        </div>

        {/* Section 1 */}
        <div className="space-y-4 mb-6">
          <h2 className="font-bold text-base">
            ส่วนที่ 1: คำนวณค่าพารามิเตอร์ประจำตัวนักศึกษาเพื่อใช้ตอบคำถาม:
          </h2>
          <div className="space-y-3 pl-4">
            <div>
              <p>1. หมายเลข IP Address ของเซิร์ฟเวอร์: 192.168.X.YZ</p>
              <p className="mt-1">
                ตอบ: <span className="font-mono font-bold">{answers.ipAnswer || '……………………………………………………………'}</span>
              </p>
            </div>
            <div>
              <p>2. หมายเลข Port Number: 8000 + (X * 100) + (Y * 10) + Z</p>
              <p className="mt-1">
                ตอบ: <span className="font-mono font-bold">{answers.portAnswer || '……………………………………………………………'}</span>
              </p>
            </div>
            <div>
              <p>3. ขนาดข้อมูลรวม: 1000 + (X * 50) + (Y * 10) + Z ไบต์</p>
              <p className="mt-1">
                ตอบ: <span className="font-mono font-bold">{answers.dataSizeAnswer || '……………………………………………………………'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-6 mb-6">
          <h2 className="font-bold text-base">ส่วนที่ 2: โจทย์แสดงความรู้และการเขียนโปรแกรม</h2>

          {/* 2.1 */}
          <div className="pl-4 space-y-3">
            <h3 className="font-bold">2.1 การตั้งค่า Socket และโปรโตคอลในภาษา Python</h3>
            <p className="text-xs">
              * เขียนโค้ดภาษา Python สำหรับสร้าง Socket และ Binding เข้ากับหมายเลข IP Address และ Port Number ประจำตัวของคุณ
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="border p-3 rounded">
                <p className="font-bold text-xs mb-1">โค้ด TCP Socket:</p>
                <pre className="font-mono text-xs whitespace-pre-wrap bg-gray-50 p-2 min-h-[90px]">
                  {answers.tcpCode || '1\n2\n3\n4'}
                </pre>
              </div>
              <div className="border p-3 rounded">
                <p className="font-bold text-xs mb-1">โค้ด UDP Socket:</p>
                <pre className="font-mono text-xs whitespace-pre-wrap bg-gray-50 p-2 min-h-[90px]">
                  {answers.udpCode || '1\n2\n3\n4'}
                </pre>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold mb-1">
                * เปรียบเทียบความแตกต่างของโค้ดเมื่อเปลี่ยนไปใช้โปรโตคอล TCP (socket.SOCK_STREAM) และ UDP (socket.SOCK_DGRAM) สำหรับพอร์ทประจำตัวของคุณ
              </p>
              <p className="border-b min-h-[40px] text-xs pt-1 font-sans">
                {answers.tcpUdpComparison || '………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………'}
              </p>
            </div>
          </div>

          {/* 2.2 */}
          <div className="pl-4 space-y-3">
            <h3 className="font-bold">2.2 การคำนวณการส่งข้อมูลแบบ Packet Switching</h3>
            <p className="text-xs">
              * นำขนาดข้อมูลรวม จากประจำตัวของคุณ 4 ตัวท้าย มาคำนวณหากต้องแบ่งข้อมูลออกเป็นแพ็กเก็ต แพ็กเก็ตละ 128 ไบต์ จะต้องใช้ทั้งหมดกี่แพ็กเก็ต
            </p>
            <p className="text-xs text-gray-600">ตัวอย่าง รวมประจำตัวของคุณ 6814952010 = 2010 ไบต์</p>

            <table className="w-full border border-collapse text-xs">
              <thead>
                <tr className="bg-gray-100 font-bold">
                  <th className="border p-2 text-left">ขนาดข้อมูลรวม (Bytes)</th>
                  <th className="border p-2 text-left">การคำนวณ (ข้อมูล ÷ 128)</th>
                  <th className="border p-2 text-left">ผลหารทศนิยม</th>
                  <th className="border p-2 text-left">จำนวนแพ็กเก็ตจริง</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">512 ไบต์</td>
                  <td className="border p-2">{answers.packet512Calc || '……… / ………'}</td>
                  <td className="border p-2">{answers.packet512Decimal || '………'}</td>
                  <td className="border p-2">{answers.packet512Count ? `${answers.packet512Count} แพ็กเก็ต` : '……… แพ็กเก็ต'}</td>
                </tr>
                <tr>
                  <td className="border p-2">1,000 ไบต์</td>
                  <td className="border p-2">{answers.packet1000Calc || '……… / ………'}</td>
                  <td className="border p-2">{answers.packet1000Decimal || '………'}</td>
                  <td className="border p-2">{answers.packet1000Count ? `${answers.packet1000Count} แพ็กเก็ต` : '……… แพ็กเก็ต'}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2">1,500 ไบต์ (ตัวอย่าง)</td>
                  <td className="border p-2">1,500 / 128</td>
                  <td className="border p-2">11.72</td>
                  <td className="border p-2">12 แพ็กเก็ต</td>
                </tr>
                <tr>
                  <td className="border p-2 font-bold">(4 ตัวท้าย) {params.last4 || '………………'} ไบต์</td>
                  <td className="border p-2">{answers.packetCustomCalc || '……… / 128'}</td>
                  <td className="border p-2">{answers.packetCustomDecimal || '………'}</td>
                  <td className="border p-2 font-bold">{answers.packetCustomCount ? `${answers.packetCustomCount} แพ็กเก็ต` : '……… แพ็กเก็ต'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2.3 */}
          <div className="pl-4 space-y-3">
            <h3 className="font-bold">2.3 การวิเคราะห์ทิศทางการสื่อสารและโปรโตคอล ตัวอย่างรหัสนักศึกษา 681495201x</h3>
            <p className="text-xs">* หากค่า X ของคุณเป็นเลขคู่ ให้แสดงตัวอย่างแอปพลิเคชันที่เป็นการสื่อสารแบบ Full-Duplex</p>
            <p className="text-xs">* หากค่า X ของคุณเป็นเลขคี่ ให้แสดงตัวอย่างแอปพลิเคชันที่เป็นการสื่อสารแบบ Half-Duplex</p>
            <p className="border-b min-h-[30px] text-xs pt-1 font-sans">
              {answers.duplexApplication || '………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………'}
            </p>

            <p className="text-xs mt-2">* อธิบายเหตุผลว่าแอปพลิเคชันที่คุณยกตัวอย่างควรเลือกใช้โปรโตคอล TCP หรือ UDP</p>
            <p className="border-b min-h-[30px] text-xs pt-1 font-sans">
              {answers.duplexReasonProtocol || '………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………'}
            </p>
          </div>

          {/* 2.4 */}
          <div className="pl-4 space-y-3">
            <h3 className="font-bold">2.4 การตั้งค่า Docker Container</h3>
            <p className="text-xs">
              * เขียนคำสั่งใน Dockerfile หรือคำสั่ง Docker Run โดยระบุการเปิดพอร์ท (EXPOSE หรือ Port Mapping) ด้วยหมายเลข Port Number ประจำตัวของคุณ
            </p>
            <pre className="font-mono text-xs whitespace-pre-wrap bg-gray-50 border p-3 min-h-[60px] rounded">
              {answers.dockerConfig || '1\n2\n3\n4'}
            </pre>
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-4 mb-6">
          <h2 className="font-bold text-base">ส่วนที่ 3: สรุปภาพรวมความเข้าใจ</h2>
          <p className="text-xs pl-4">
            * อธิบายข้อดีของการใช้ Docker ในการจำลองสภาพแวดล้อมระบบ Client และ Server ตามพารามิเตอร์เฉพาะบุคคลที่คุณได้รับ (ความยาว 3-5 บรรทัด)
          </p>
          <div className="pl-4">
            <p className="border-b min-h-[50px] text-xs pt-1 font-sans">
              {answers.dockerSummary || '………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………'}
            </p>
          </div>
        </div>

        {/* Blanks Section 3 & 4 */}
        <div className="space-y-4 border-t pt-4">
          <h2 className="font-bold text-base">คำสั่ง: จงเติมคำหรือข้อความลงในช่องว่าง ให้ถูกต้องและสมบูรณ์</h2>

          <div className="pl-4 space-y-2 text-xs">
            <h3 className="font-bold">ตอนที่ 3: การใช้งาน socket ในภาษา Python</h3>
            <p>
              1. ในการสร้างวัตถุ socket สำหรับการสื่อสารแบบ TCP ต้องระบุชนิดของโปรโตคอลเป็น socket.SOCK_STREAM แต่หากต้องการใช้โปรโตคอล UDP จะต้องระบุชนิดเป็น socket.
              <span className="font-mono font-bold underline px-2">{answers.blank1 || '____________________'}</span>
            </p>
            <p>
              2. ฟังก์ชัน bind((HOST, PORT)) ของ Server ทำหน้าที่ในการผูก{' '}
              <span className="font-mono font-bold underline px-2">{answers.blank2_1 || '____________________'}</span> และ{' '}
              <span className="font-mono font-bold underline px-2">{answers.blank2_2 || '____________________'}</span> เข้ากับ Socket ของเซิร์ฟเวอร์
            </p>
            <p>
              3. ใน TCP Server ฟังก์ชันที่ใช้ในการเปิดรับและรอการเชื่อมต่อจาก Client คือฟังก์ชัน{' '}
              <span className="font-mono font-bold underline px-2">{answers.blank3 || '____________________'}</span>()
            </p>
            <p>
              4. สำหรับ UDP Server เมื่อต้องการรับข้อมูลพร้อมกับรับที่อยู่ (IP & Port) ของผู้ส่ง จะต้องใช้ฟังก์ชัน recvfrom() ในขณะที่การส่งข้อมูลกลับไปยังผู้ส่งจะใช้ฟังก์ชัน{' '}
              <span className="font-mono font-bold underline px-2">{answers.blank4 || '____________________'}</span>(data, addr)
            </p>
            <p>
              5. เมื่อต้องการแปลงข้อความสตริง (String) ใน Python ให้เป็นข้อมูลชนิดไบต์ (Bytes) เพื่อส่งผ่าน Socket จะต้องใช้เมธอด .encode() และเมื่อรับข้อมูลไบต์กลับมา ต้องการแปลงเป็นสตริงจะต้องใช้เมธอด{' '}
              <span className="font-mono font-bold underline px-2">{answers.blank5 || '____________________'}</span>()
            </p>
          </div>

          <div className="pl-4 space-y-2 text-xs pt-2">
            <h3 className="font-bold">ตอนที่ 4: คำสั่งและการจัดการคอนเทนเนอร์ด้วย Docker</h3>
            <p>
              6. คำสั่ง Docker ที่ใช้ในการสร้าง Network จำลอง เพื่อให้ Container สามารถสื่อสารกันผ่านชื่อ (Container Name) ได้ คือคำสั่ง:
              <br />
              docker network <span className="font-mono font-bold underline px-2">{answers.blank6 || '____________________'}</span> &lt;network_name&gt;
            </p>
            <p>
              7. คำสั่งที่ใช้ในการ สร้าง Docker Image จากไฟล์ Dockerfile คือ:
              <br />
              docker <span className="font-mono font-bold underline px-2">{answers.blank7 || '____________________'}</span> -f Dockerfile.server -t echo_server .
            </p>
            <p>
              8. การรัน Container ในโหมด Background (ไม่แสดง log บนหน้าจอหลัก) จะต้องใส่ Option{' '}
              <span className="font-mono font-bold underline px-2">{answers.blank8_1 || '______'}</span> แต่หากต้องการเปิดโหมด Interactive ที่รับอินพุตจากผู้ใช้ได้ จะต้องใส่ Option{' '}
              <span className="font-mono font-bold underline px-2">{answers.blank8_2 || '______'}</span>
            </p>
            <p>
              9. ตัวอย่างคำสั่งรัน Client Container ให้เชื่อมต่อกับ Network ชื่อ udp_network:
              <br />
              docker run -it --name udp_client --network{' '}
              <span className="font-mono font-bold underline px-2">{answers.blank9 || '____________________'}</span> udp_client
            </p>
            <p>
              10. เมื่อทดสอบการทำงานเสร็จเรียบร้อยแล้ว หากต้องการ หยุดการทำงาน และ ลบคอนเทนเนอร์ ชื่อ udp_server จะต้องใช้ชุดคำสั่ง:
              <br />
              * หยุดทำงาน: docker <span className="font-mono font-bold underline px-2">{answers.blank10_1 || '____________________'}</span> udp_server
              <br />
              * ลบคอนเทนเนอร์: docker <span className="font-mono font-bold underline px-2">{answers.blank10_2 || '____________________'}</span> udp_server
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

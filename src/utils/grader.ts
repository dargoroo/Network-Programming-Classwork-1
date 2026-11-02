import { StudentParams, WorksheetAnswers, GradingResult, ItemGrading } from '../types.ts';

export function parseStudentId(studentId: string, fullName = '', section = ''): StudentParams {
  const digits = studentId.replace(/\D/g, '');
  
  if (digits.length < 3) {
    return {
      studentId,
      fullName,
      section,
      X: 0,
      Y: 0,
      Z: 0,
      last4: 0,
      ipAddress: '192.168.0.00',
      portNumber: 8000,
      totalBytes: 1000,
      duplexRequired: 'Full-Duplex',
      isValid: false,
    };
  }

  const last3 = digits.slice(-3);
  const X = parseInt(last3[0], 10);
  const Y = parseInt(last3[1], 10);
  const Z = parseInt(last3[2], 10);

  const last4 = digits.length >= 4 ? parseInt(digits.slice(-4), 10) : parseInt(last3, 10);
  
  const yzString = `${Y}${Z}`;
  const ipAddress = `192.168.${X}.${yzString}`;
  const portNumber = 8000 + (X * 100) + (Y * 10) + Z;
  const totalBytes = 1000 + (X * 50) + (Y * 10) + Z;
  const duplexRequired = X % 2 === 0 ? 'Full-Duplex' : 'Half-Duplex';

  return {
    studentId,
    fullName,
    section,
    X,
    Y,
    Z,
    last4,
    ipAddress,
    portNumber,
    totalBytes,
    duplexRequired,
    isValid: true,
  };
}

export function cleanText(input: string | undefined): string {
  if (!input) return '';
  return input.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function gradeWorksheet(answers: WorksheetAnswers, params: StudentParams): GradingResult {
  const items: ItemGrading[] = [];

  // Helper for adding evaluation
  const addItem = (
    id: string,
    title: string,
    section: string,
    maxScore: number,
    score: number,
    feedback: string,
    expected: string,
    userAnswer: string
  ) => {
    let status: 'correct' | 'partial' | 'incorrect' | 'empty' = 'incorrect';
    if (!userAnswer || userAnswer.trim() === '') {
      status = 'empty';
    } else if (score >= maxScore) {
      status = 'correct';
    } else if (score > 0) {
      status = 'partial';
    }

    items.push({
      id,
      title,
      section,
      maxScore,
      score,
      status,
      feedback,
      expected,
      userAnswer: userAnswer || '(ไม่ได้ระบุคำตอบ)',
    });
  };

  // ----------------------------------------------------
  // ส่วนที่ 1: คำนวณพารามิเตอร์ประจำตัว (15 คะแนน)
  // ----------------------------------------------------
  // 1. IP Address
  const ipClean = cleanText(answers.ipAnswer).replace(/[^\d.]/g, '');
  const isIpCorrect = ipClean === params.ipAddress || answers.ipAnswer.includes(params.ipAddress);
  addItem(
    'part1_ip',
    'ส่วนที่ 1.1: หมายเลข IP Address ของเซิร์ฟเวอร์',
    'ส่วนที่ 1: พารามิเตอร์ประจำตัว',
    5,
    isIpCorrect ? 5 : 0,
    isIpCorrect
      ? 'ถูกต้อง! ตรงตามสูตร 192.168.X.YZ'
      : `ไม่ตรงกับรหัสของคุณ (X=${params.X}, Y=${params.Y}, Z=${params.Z}) ควรได้ ${params.ipAddress}`,
    params.ipAddress,
    answers.ipAnswer
  );

  // 2. Port Number
  const portClean = answers.portAnswer.replace(/\D/g, '');
  const isPortCorrect = portClean === params.portNumber.toString() || answers.portAnswer.includes(params.portNumber.toString());
  addItem(
    'part1_port',
    'ส่วนที่ 1.2: หมายเลข Port Number',
    'ส่วนที่ 1: พารามิเตอร์ประจำตัว',
    5,
    isPortCorrect ? 5 : 0,
    isPortCorrect
      ? `ถูกต้อง! คำนวณ 8000 + (${params.X}*100) + (${params.Y}*10) + ${params.Z} = ${params.portNumber}`
      : `ผลคำนวณไม่ถูกต้อง ค่าที่ถูกคือ 8000 + (${params.X}*100) + (${params.Y}*10) + ${params.Z} = ${params.portNumber}`,
    params.portNumber.toString(),
    answers.portAnswer
  );

  // 3. Total Data Size
  const sizeClean = answers.dataSizeAnswer.replace(/\D/g, '');
  const isSizeCorrect = sizeClean === params.totalBytes.toString() || answers.dataSizeAnswer.includes(params.totalBytes.toString());
  addItem(
    'part1_data_size',
    'ส่วนที่ 1.3: ขนาดข้อมูลรวม (ไบต์)',
    'ส่วนที่ 1: พารามิเตอร์ประจำตัว',
    5,
    isSizeCorrect ? 5 : 0,
    isSizeCorrect
      ? `ถูกต้อง! คำนวณ 1000 + (${params.X}*50) + (${params.Y}*10) + ${params.Z} = ${params.totalBytes} ไบต์`
      : `ผลคำนวณไม่ถูกต้อง ค่าที่ถูกคือ 1000 + (${params.X}*50) + (${params.Y}*10) + ${params.Z} = ${params.totalBytes}`,
    `${params.totalBytes} ไบต์`,
    answers.dataSizeAnswer
  );

  // ----------------------------------------------------
  // ส่วนที่ 2.1: Python Socket (15 คะแนน)
  // ----------------------------------------------------
  // TCP Code
  let tcpScore = 0;
  const tcpCodeClean = answers.tcpCode.toLowerCase();
  const hasTcpSocket = tcpCodeClean.includes('sock_stream') || tcpCodeClean.includes('stream');
  const hasIpInTcp = tcpCodeClean.includes(params.ipAddress) || tcpCodeClean.includes('192.168.');
  const hasPortInTcp = tcpCodeClean.includes(params.portNumber.toString());
  const hasBindTcp = tcpCodeClean.includes('bind');

  if (hasTcpSocket) tcpScore += 2;
  if (hasBindTcp) tcpScore += 1;
  if (hasIpInTcp && hasPortInTcp) tcpScore += 2;
  else if (hasIpInTcp || hasPortInTcp) tcpScore += 1;

  addItem(
    'part2_tcp_code',
    'ส่วนที่ 2.1: โค้ด TCP Socket',
    'ส่วนที่ 2: โค้ดและการคำนวณ',
    5,
    tcpScore,
    tcpScore === 5
      ? 'โค้ดถูกต้อง มี socket.SOCK_STREAM, bind และใช้ IP/Port ประจำตัวถูกต้อง'
      : 'ตรวจพบว่าขาด socket.SOCK_STREAM หรือไม่ได้ระบุ bind กับ IP/Port ประจำตัวของคุณให้ครบถ้วน',
    `s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.bind(('${params.ipAddress}', ${params.portNumber}))\ns.listen(5)`,
    answers.tcpCode
  );

  // UDP Code
  let udpScore = 0;
  const udpCodeClean = answers.udpCode.toLowerCase();
  const hasUdpSocket = udpCodeClean.includes('sock_dgram') || udpCodeClean.includes('dgram');
  const hasIpInUdp = udpCodeClean.includes(params.ipAddress) || udpCodeClean.includes('192.168.');
  const hasPortInUdp = udpCodeClean.includes(params.portNumber.toString());
  const hasBindUdp = udpCodeClean.includes('bind');

  if (hasUdpSocket) udpScore += 2;
  if (hasBindUdp) udpScore += 1;
  if (hasIpInUdp && hasPortInUdp) udpScore += 2;
  else if (hasIpInUdp || hasPortInUdp) udpScore += 1;

  addItem(
    'part2_udp_code',
    'ส่วนที่ 2.1: โค้ด UDP Socket',
    'ส่วนที่ 2: โค้ดและการคำนวณ',
    5,
    udpScore,
    udpScore === 5
      ? 'โค้ดถูกต้อง มี socket.SOCK_DGRAM, bind และใช้ IP/Port ประจำตัวถูกต้อง'
      : 'ตรวจพบว่าขาด socket.SOCK_DGRAM หรือ bind ด้วย IP/Port ประจำตัว',
    `s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\ns.bind(('${params.ipAddress}', ${params.portNumber}))`,
    answers.udpCode
  );

  // TCP vs UDP Comparison
  let compScore = 0;
  const compText = answers.tcpUdpComparison.toLowerCase();
  const keywordsComp = [
    ['connection', 'เชื่อมต่อ', 'handshake'],
    ['reliable', 'น่าเชื่อถือ', 'สูญหาย', 'ส่งซ้ำ', 'ลำดับ', 'ack'],
    ['เร็ว', 'fast', 'overhead', 'ไม่เชื่อมต่อ', 'datagram', 'stream'],
  ];
  keywordsComp.forEach(group => {
    if (group.some(k => compText.includes(k))) compScore += 1.5;
  });
  if (compText.length > 20) compScore = Math.min(5, Math.ceil(compScore));
  else compScore = Math.min(2, Math.floor(compScore));

  addItem(
    'part2_comparison',
    'ส่วนที่ 2.1: เปรียบเทียบความแตกต่างของ TCP และ UDP',
    'ส่วนที่ 2: โค้ดและการคำนวณ',
    5,
    compScore,
    compScore >= 4
      ? 'อธิบายครอบคลุมความแตกต่างทั้ง Connection-oriented vs Connectionless และความน่าเชื่อถือ/ความเร็ว'
      : 'ควรระบุความแตกต่างด้านการสร้างการเชื่อมต่อ (Handshake), ความน่าเชื่อถือในการส่งข้อมูล (Reliability) และความเร็ว',
    'TCP เป็น Connection-oriented เชื่อถือได้ ข้อมูลเรียงลำดับแน่นอน ส่วน UDP เป็น Connectionless รวดเร็ว น้ำหนักเบา ไม่รอตอบรับ',
    answers.tcpUdpComparison
  );

  // ----------------------------------------------------
  // ส่วนที่ 2.2: Packet Switching Calculation (15 คะแนน)
  // ----------------------------------------------------
  // Row 512: 512 / 128 = 4 -> 4 packets
  const r512Packets = answers.packet512Count.replace(/\D/g, '');
  const r512Correct = r512Packets === '4' || answers.packet512Count.includes('4');
  addItem(
    'part2_packet_512',
    'ส่วนที่ 2.2: คำนวณแพ็กเก็ตขนาด 512 ไบต์',
    'ส่วนที่ 2: โค้ดและการคำนวณ',
    3,
    r512Correct ? 3 : 0,
    r512Correct ? 'ถูกต้อง! 512 / 128 = 4 แพ็กเก็ต' : 'การคำนวณ 512 / 128 ได้ 4.00 หรือ 4 แพ็กเก็ต',
    '512 / 128 = 4 แพ็กเก็ต',
    `คำนวณ: ${answers.packet512Calc || '-'}, ผลหาร: ${answers.packet512Decimal || '-'}, แพ็กเก็ต: ${answers.packet512Count || '-'}`
  );

  // Row 1000: 1000 / 128 = 7.8125 -> 8 packets
  const r1000Packets = answers.packet1000Count.replace(/\D/g, '');
  const r1000Correct = r1000Packets === '8' || answers.packet1000Count.includes('8');
  addItem(
    'part2_packet_1000',
    'ส่วนที่ 2.2: คำนวณแพ็กเก็ตขนาด 1,000 ไบต์',
    'ส่วนที่ 2: โค้ดและการคำนวณ',
    3,
    r1000Correct ? 3 : 0,
    r1000Correct ? 'ถูกต้อง! 1,000 / 128 = 7.81 ปัดขึ้นเป็น 8 แพ็กเก็ต' : '1,000 / 128 = 7.8125 ต้องปัดขึ้นเป็น 8 แพ็กเก็ต',
    '1000 / 128 = 7.81 -> 8 แพ็กเก็ต',
    `คำนวณ: ${answers.packet1000Calc || '-'}, ผลหาร: ${answers.packet1000Decimal || '-'}, แพ็กเก็ต: ${answers.packet1000Count || '-'}`
  );

  // Row 1500 (Example): 1500 / 128 = 11.72 -> 12 packets
  const r1500Packets = answers.packet1500Count.replace(/\D/g, '');
  const r1500Correct = r1500Packets === '12' || answers.packet1500Count.includes('12');
  addItem(
    'part2_packet_1500',
    'ส่วนที่ 2.2: ตัวอย่างแพ็กเก็ต 1,500 ไบต์',
    'ส่วนที่ 2: โค้ดและการคำนวณ',
    3,
    r1500Correct ? 3 : 0,
    r1500Correct ? 'ถูกต้อง! 1,500 / 128 = 11.72 ปัดขึ้นเป็น 12 แพ็กเก็ต' : '1,500 / 128 = 11.72 ได้ 12 แพ็กเก็ต',
    '1500 / 128 = 11.72 -> 12 แพ็กเก็ต',
    `คำนวณ: ${answers.packet1500Calc || '-'}, ผลหาร: ${answers.packet1500Decimal || '-'}, แพ็กเก็ต: ${answers.packet1500Count || '-'}`
  );

  // Row Custom (Last 4 digits): e.g. 2010 -> 2010 / 128 = 15.70 -> 16 packets
  const customBytes = params.last4 > 0 ? params.last4 : 2010;
  const customDecimalExpected = (customBytes / 128).toFixed(2);
  const customPacketsExpected = Math.ceil(customBytes / 128);
  const userCustomCount = answers.packetCustomCount.replace(/\D/g, '');
  const isCustomCorrect = userCustomCount === customPacketsExpected.toString();

  addItem(
    'part2_packet_custom',
    `ส่วนที่ 2.2: คำนวณแพ็กเก็ตจากรหัส 4 ตัวท้าย (${customBytes} ไบต์)`,
    'ส่วนที่ 2: โค้ดและการคำนวณ',
    6,
    isCustomCorrect ? 6 : (answers.packetCustomCount ? 2 : 0),
    isCustomCorrect
      ? `ถูกต้องแม่นยำ! ${customBytes} / 128 = ${customDecimalExpected} จึงต้องใช้ ${customPacketsExpected} แพ็กเก็ต`
      : `ผลคำนวณที่ถูกต้องของรหัส 4 ตัวท้ายคือ ${customBytes} / 128 = ${customDecimalExpected} หรือ ${customPacketsExpected} แพ็กเก็ต (ต้องปัดเศษขึ้น)`,
    `${customBytes} / 128 = ${customDecimalExpected} -> ${customPacketsExpected} แพ็กเก็ต`,
    `ขนาด: ${answers.packetCustomBytes || customBytes}, คำนวณ: ${answers.packetCustomCalc || '-'}, ผลหาร: ${answers.packetCustomDecimal || '-'}, แพ็กเก็ต: ${answers.packetCustomCount || '-'}`
  );

  // ----------------------------------------------------
  // ส่วนที่ 2.3: ทิศทางการสื่อสารและโปรโตคอล (10 คะแนน)
  // ----------------------------------------------------
  // Duplex application example
  const isEven = params.X % 2 === 0;
  const reqMode = isEven ? 'Full-Duplex' : 'Half-Duplex';
  const appExText = cleanText(answers.duplexApplication);

  let appExScore = 0;
  if (isEven) {
    // Full duplex: telephone, voip, zoom, video call, discord, websocket chat, โทรศัพท์, ประชุมสาย
    const fullKeywords = ['โทรศัพท์', 'โทร', 'phone', 'voip', 'video call', 'zoom', 'teams', 'meet', 'facetime', 'discord', 'สนทนาเสียงพร้อมกัน', 'full-duplex', 'คุยพร้อมกัน'];
    if (fullKeywords.some(k => appExText.includes(k))) appExScore = 5;
    else if (appExText.length > 5) appExScore = 2;
  } else {
    // Half duplex: walkie-talkie, วอ, วิทยุสื่อสาร, push to talk, cb radio
    const halfKeywords = ['วิทยุสื่อสาร', 'walkie', 'talkie', 'วอ', 'push to talk', 'cb radio', 'วิทยุตำรวจ', 'สลับกันพูด', 'half-duplex'];
    if (halfKeywords.some(k => appExText.includes(k))) appExScore = 5;
    else if (appExText.length > 5) appExScore = 2;
  }

  addItem(
    'part2_duplex_app',
    `ส่วนที่ 2.3: ตัวอย่างแอปพลิเคชัน ${reqMode} (เนื่องจาก X=${params.X} เป็นเลข${isEven ? 'คู่' : 'คี่'})`,
    'ส่วนที่ 2: โค้ดและการคำนวณ',
    5,
    appExScore,
    appExScore === 5
      ? `ถูกต้อง! แอปพลิเคชันตรงกับโหมด ${reqMode}`
      : `เนื่องจาก X=${params.X} เป็นเลข${isEven ? 'คู่ (ต้องยกตัวอย่าง Full-Duplex เช่น วิดีโอคอล หรือ โทรศัพท์)' : 'คี่ (ต้องยกตัวอย่าง Half-Duplex เช่น วิทยุสื่อสาร Walkie-Talkie)'}`,
    isEven ? 'โทรศัพท์มือถือ, Video Call, Zoom, Discord (ส่งและรับข้อมูลได้พร้อมกัน)' : 'วิทยุสื่อสาร (Walkie-Talkie), วิทยุตำรวจ (ผลัดกันส่งข้อมูลทีละฝั่ง)',
    answers.duplexApplication
  );

  // Protocol reasoning
  const reasonText = cleanText(answers.duplexReasonProtocol);
  let reasonScore = 0;
  if (reasonText.includes('tcp') || reasonText.includes('udp')) {
    if (reasonText.includes('real-time') || reasonText.includes('delay') || reasonText.includes('หน่วง') || reasonText.includes('เสถียร') || reasonText.includes('เร็ว') || reasonText.includes('สูญหาย') || reasonText.includes('เสียง')) {
      reasonScore = 5;
    } else {
      reasonScore = 3;
    }
  }

  addItem(
    'part2_protocol_reason',
    'ส่วนที่ 2.3: เหตุผลการเลือกใช้โปรโตคอล TCP หรือ UDP',
    'ส่วนที่ 2: โค้ดและการคำนวณ',
    5,
    reasonScore,
    reasonScore === 5
      ? 'ให้เหตุผลประกอบคุณสมบัติของโปรโตคอลสอดคล้องกับลักษณะการสื่อสารได้ดี'
      : 'ควรระบุเหตุผล เช่น ถ้าเป็นเสียงสด/สตรีมมิ่งมักใช้ UDP เพื่อลดความล่าช้า (Low Latency) หรือถ้าต้องไม่สูญหายจะใช้ TCP',
    'เช่น หากเป็นระบบเสียงสด/VoIP ควรใช้ UDP เพื่อความรวดเร็วและไม่มี overhead ของ handshake หรือหากเป็นข้อความต้องใช้ TCP เพื่อป้องกันข้อความตกหล่น',
    answers.duplexReasonProtocol
  );

  // ----------------------------------------------------
  // ส่วนที่ 2.4: Docker Container Setup (10 คะแนน)
  // ----------------------------------------------------
  const dockerCode = answers.dockerConfig.toLowerCase();
  const hasDockerPort = dockerCode.includes(params.portNumber.toString());
  const hasExposeOrMapping = dockerCode.includes('expose') || dockerCode.includes('-p') || dockerCode.includes('--publish');
  const hasDockerRunOrFile = dockerCode.includes('docker') || dockerCode.includes('from') || dockerCode.includes('run');

  let dockerScore = 0;
  if (hasDockerPort) dockerScore += 4;
  if (hasExposeOrMapping) dockerScore += 3;
  if (hasDockerRunOrFile) dockerScore += 3;

  addItem(
    'part2_docker_code',
    `ส่วนที่ 2.4: การตั้งค่า Dockerfile หรือ docker run (พอร์ต ${params.portNumber})`,
    'ส่วนที่ 2: โค้ดและการคำนวณ',
    10,
    dockerScore,
    dockerScore === 10
      ? `ยอดเยี่ยม! มีคำสั่งเปิดพอร์ตด้วยหมายเลขประจำตัว ${params.portNumber} ถูกต้อง`
      : `ต้องมีคำสั่ง EXPOSE ${params.portNumber} ใน Dockerfile หรือ docker run -p ${params.portNumber}:${params.portNumber}`,
    `EXPOSE ${params.portNumber} หรือ docker run -d -p ${params.portNumber}:${params.portNumber} my_server`,
    answers.dockerConfig
  );

  // ----------------------------------------------------
  // ส่วนที่ 3: สรุปภาพรวมความเข้าใจ Docker (10 คะแนน)
  // ----------------------------------------------------
  const summaryText = answers.dockerSummary.toLowerCase();
  let summaryScore = 0;
  const summaryKeywords = [
    ['แยก', 'isolation', 'เป็นอิสระ', 'จำลอง'],
    ['พอร์ต', 'port', 'ไม่ชนกัน', 'conflict'],
    ['จำลองเครือข่าย', 'network', 'client', 'server'],
    ['สภาพแวดล้อม', 'environment', 'สะดวก', 'รวดเร็ว', 'มาตรฐาน'],
  ];
  summaryKeywords.forEach(group => {
    if (group.some(k => summaryText.includes(k))) summaryScore += 2.5;
  });
  if (summaryText.length < 25 && summaryScore > 3) summaryScore = 3;

  addItem(
    'part3_summary',
    'ส่วนที่ 3: ข้อดีของการใช้ Docker จำลอง Client และ Server ประจำตัว',
    'ส่วนที่ 3: สรุปภาพรวม',
    10,
    Math.min(10, Math.round(summaryScore)),
    summaryScore >= 7
      ? 'สรุปข้อดีได้ชัดเจนทั้งด้านการแยกสภาพแวดล้อม (Isolation) และการจัดการพอร์ตไม่ให้ชนกัน'
      : 'ควรกล่าวถึงการแยกสภาพแวดล้อมการทำงาน (Isolation), การที่นักศึกษาแต่ละคนมีพอร์ตเฉพาะไม่ชนกัน, และการสร้างเครือข่ายจำลองที่เสมือนจริง',
    'Docker ช่วยแยกสภาพแวดล้อม (Environment Isolation) ระหว่าง Client และ Server อย่างอิสระ ป้องกันพอร์ตชนกันในเครื่อง และสามารถทดสอบจำลองเครือข่ายเสมือนได้อย่างสะดวกรวดเร็ว',
    answers.dockerSummary
  );

  // ----------------------------------------------------
  // ตอนที่ 3: เติมคำ Socket ในภาษา Python (ข้อละ 3 = 15 คะแนน)
  // ----------------------------------------------------
  // ข้อ 1: socket.SOCK_DGRAM
  const b1 = cleanText(answers.blank1);
  const isB1 = b1 === 'sock_dgram' || b1 === 'socket.sock_dgram' || b1.includes('dgram');
  addItem('blank_1', 'ตอนที่ 3 ข้อ 1: โปรโตคอล UDP ใน Python Socket', 'ตอนที่ 3: เติมคำ Socket', 3, isB1 ? 3 : 0, isB1 ? 'ถูกต้อง' : 'ต้องเป็น socket.SOCK_DGRAM', 'SOCK_DGRAM', answers.blank1);

  // ข้อ 2: HOST และ PORT
  const b2_1 = cleanText(answers.blank2_1);
  const b2_2 = cleanText(answers.blank2_2);
  const isB2_1 = b2_1.includes('host') || b2_1.includes('ip') || b2_1.includes('ที่อยู่');
  const isB2_2 = b2_2.includes('port') || b2_2.includes('พอร์ต');
  const b2Score = (isB2_1 ? 1.5 : 0) + (isB2_2 ? 1.5 : 0);
  addItem('blank_2', 'ตอนที่ 3 ข้อ 2: พารามิเตอร์ของ bind((HOST, PORT))', 'ตอนที่ 3: เติมคำ Socket', 3, b2Score, b2Score === 3 ? 'ถูกต้อง' : 'ต้องเป็น HOST (หรือ IP) และ PORT (หรือ พอร์ต)', 'HOST (หรือ IP) และ PORT (พอร์ต)', `${answers.blank2_1} / ${answers.blank2_2}`);

  // ข้อ 3: listen
  const b3 = cleanText(answers.blank3).replace(/[()]/g, '');
  const isB3 = b3 === 'listen' || b3.includes('listen');
  addItem('blank_3', 'ตอนที่ 3 ข้อ 3: ฟังก์ชันรอรับการเชื่อมต่อ TCP Server', 'ตอนที่ 3: เติมคำ Socket', 3, isB3 ? 3 : 0, isB3 ? 'ถูกต้อง' : 'ต้องเป็น listen()', 'listen', answers.blank3);

  // ข้อ 4: sendto
  const b4 = cleanText(answers.blank4).replace(/[()]/g, '');
  const isB4 = b4 === 'sendto' || b4.includes('sendto');
  addItem('blank_4', 'ตอนที่ 3 ข้อ 4: ฟังก์ชันส่งข้อมูลของ UDP Server', 'ตอนที่ 3: เติมคำ Socket', 3, isB4 ? 3 : 0, isB4 ? 'ถูกต้อง' : 'ต้องเป็น sendto()', 'sendto', answers.blank4);

  // ข้อ 5: decode
  const b5 = cleanText(answers.blank5).replace(/[()]/g, '');
  const isB5 = b5 === 'decode' || b5.includes('decode');
  addItem('blank_5', 'ตอนที่ 3 ข้อ 5: เมธอดแปลง Bytes เป็น String', 'ตอนที่ 3: เติมคำ Socket', 3, isB5 ? 3 : 0, isB5 ? 'ถูกต้อง' : 'ต้องเป็น decode()', 'decode', answers.blank5);

  // ----------------------------------------------------
  // ตอนที่ 4: เติมคำ Docker Container (ข้อละ 2 = 10 คะแนน)
  // ----------------------------------------------------
  // ข้อ 6: create (docker network create)
  const b6 = cleanText(answers.blank6);
  const isB6 = b6 === 'create' || b6.includes('create');
  addItem('blank_6', 'ตอนที่ 4 ข้อ 6: คำสั่งสร้าง Network จำลอง', 'ตอนที่ 4: เติมคำ Docker', 2, isB6 ? 2 : 0, isB6 ? 'ถูกต้อง' : 'docker network create', 'create', answers.blank6);

  // ข้อ 7: build (docker build)
  const b7 = cleanText(answers.blank7);
  const isB7 = b7 === 'build' || b7.includes('build');
  addItem('blank_7', 'ตอนที่ 4 ข้อ 7: คำสั่งสร้าง Docker Image จาก Dockerfile', 'ตอนที่ 4: เติมคำ Docker', 2, isB7 ? 2 : 0, isB7 ? 'ถูกต้อง' : 'docker build', 'build', answers.blank7);

  // ข้อ 8: -d และ -it
  const b8_1 = cleanText(answers.blank8_1).replace(/\s+/g, '');
  const b8_2 = cleanText(answers.blank8_2).replace(/\s+/g, '');
  const isB8_1 = b8_1 === '-d' || b8_1 === 'd' || b8_1.includes('-d');
  const isB8_2 = b8_2 === '-it' || b8_2 === 'it' || b8_2 === '-i-t' || b8_2.includes('-it') || b8_2.includes('-i');
  const b8Score = (isB8_1 ? 1 : 0) + (isB8_2 ? 1 : 0);
  addItem('blank_8', 'ตอนที่ 4 ข้อ 8: Option โหมด Background (-d) และ Interactive (-it)', 'ตอนที่ 4: เติมคำ Docker', 2, b8Score, b8Score === 2 ? 'ถูกต้อง' : 'ต้องใส่ Option -d และ -it', '-d และ -it', `${answers.blank8_1} และ ${answers.blank8_2}`);

  // ข้อ 9: udp_network
  const b9 = cleanText(answers.blank9);
  const isB9 = b9 === 'udp_network' || b9.includes('udp_network');
  addItem('blank_9', 'ตอนที่ 4 ข้อ 9: ระบุชื่อเครือข่ายเชื่อมต่อ', 'ตอนที่ 4: เติมคำ Docker', 2, isB9 ? 2 : 0, isB9 ? 'ถูกต้อง' : 'ต้องเป็น udp_network', 'udp_network', answers.blank9);

  // ข้อ 10: stop และ rm
  const b10_1 = cleanText(answers.blank10_1);
  const b10_2 = cleanText(answers.blank10_2);
  const isB10_1 = b10_1 === 'stop' || b10_1.includes('stop');
  const isB10_2 = b10_2 === 'rm' || b10_2.includes('rm') || b10_2 === 'remove';
  const b10Score = (isB10_1 ? 1 : 0) + (isB10_2 ? 1 : 0);
  addItem('blank_10', 'ตอนที่ 4 ข้อ 10: คำสั่งหยุดทำงาน (stop) และลบคอนเทนเนอร์ (rm)', 'ตอนที่ 4: เติมคำ Docker', 2, b10Score, b10Score === 2 ? 'ถูกต้อง' : 'คำสั่งคือ stop และ rm', 'stop และ rm', `${answers.blank10_1} / ${answers.blank10_2}`);

  // Summary scores
  const totalScore = items.reduce((acc, it) => acc + it.score, 0);
  const maxScore = items.reduce((acc, it) => acc + it.maxScore, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  let grade = 'F';
  if (percentage >= 80) grade = 'A';
  else if (percentage >= 75) grade = 'B+';
  else if (percentage >= 70) grade = 'B';
  else if (percentage >= 65) grade = 'C+';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 55) grade = 'D+';
  else if (percentage >= 50) grade = 'D';

  const sumSection = (prefix: string) => {
    const list = items.filter(i => i.id.startsWith(prefix));
    return {
      score: list.reduce((a, b) => a + b.score, 0),
      max: list.reduce((a, b) => a + b.maxScore, 0),
    };
  };

  return {
    studentId: params.studentId,
    fullName: params.fullName,
    section: params.section,
    totalScore,
    maxScore,
    percentage,
    grade,
    evaluatedAt: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    items,
    sectionScores: {
      part1: sumSection('part1'),
      part2_1: {
        score: (items.find(i => i.id === 'part2_tcp_code')?.score || 0) + (items.find(i => i.id === 'part2_udp_code')?.score || 0) + (items.find(i => i.id === 'part2_comparison')?.score || 0),
        max: 15,
      },
      part2_2: sumSection('part2_packet'),
      part2_3: {
        score: (items.find(i => i.id === 'part2_duplex_app')?.score || 0) + (items.find(i => i.id === 'part2_protocol_reason')?.score || 0),
        max: 10,
      },
      part2_4: sumSection('part2_docker'),
      part3_summary: sumSection('part3_summary'),
      part3_blanks: {
        score: items.filter(i => ['blank_1', 'blank_2', 'blank_3', 'blank_4', 'blank_5'].includes(i.id)).reduce((a, b) => a + b.score, 0),
        max: 15,
      },
      part4_blanks: {
        score: items.filter(i => ['blank_6', 'blank_7', 'blank_8', 'blank_9', 'blank_10'].includes(i.id)).reduce((a, b) => a + b.score, 0),
        max: 10,
      },
    },
  };
}

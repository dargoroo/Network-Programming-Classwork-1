export interface StudentParams {
  studentId: string;
  fullName: string;
  section: string;
  X: number;
  Y: number;
  Z: number;
  last4: number;
  ipAddress: string;
  portNumber: number;
  totalBytes: number;
  duplexRequired: 'Full-Duplex' | 'Half-Duplex';
  isValid: boolean;
}

export interface WorksheetAnswers {
  // Part 1
  ipAnswer: string;
  portAnswer: string;
  dataSizeAnswer: string;

  // Part 2.1
  tcpCode: string;
  udpCode: string;
  tcpUdpComparison: string;

  // Part 2.2 Packet Switching Table
  packet512Calc: string;
  packet512Decimal: string;
  packet512Count: string;

  packet1000Calc: string;
  packet1000Decimal: string;
  packet1000Count: string;

  packet1500Calc: string;
  packet1500Decimal: string;
  packet1500Count: string;

  packetCustomBytes: string;
  packetCustomCalc: string;
  packetCustomDecimal: string;
  packetCustomCount: string;

  // Part 2.3
  duplexApplication: string;
  duplexReasonProtocol: string;

  // Part 2.4
  dockerConfig: string;

  // Part 3 Summary
  dockerSummary: string;

  // Blanks Part 3 (Python Socket 1-5)
  blank1: string;
  blank2_1: string;
  blank2_2: string;
  blank3: string;
  blank4: string;
  blank5: string;

  // Blanks Part 4 (Docker 6-10)
  blank6: string;
  blank7: string;
  blank8_1: string;
  blank8_2: string;
  blank9: string;
  blank10_1: string;
  blank10_2: string;
}

export interface ItemGrading {
  id: string;
  title: string;
  section: string;
  maxScore: number;
  score: number;
  status: 'correct' | 'partial' | 'incorrect' | 'empty';
  feedback: string;
  expected: string;
  userAnswer: string;
}

export interface GradingResult {
  studentId: string;
  fullName: string;
  section: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  grade: string;
  evaluatedAt: string;
  items: ItemGrading[];
  sectionScores: {
    part1: { score: number; max: number };
    part2_1: { score: number; max: number };
    part2_2: { score: number; max: number };
    part2_3: { score: number; max: number };
    part2_4: { score: number; max: number };
    part3_summary: { score: number; max: number };
    part3_blanks: { score: number; max: number };
    part4_blanks: { score: number; max: number };
  };
}

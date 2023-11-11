export interface Group {
  level: string;
  patients: number;
}

export const LEVELS: Group[] = [
  { level: '1', patients: 3 },
  { level: '2', patients: 6 },
  { level: '3', patients: 4 },
  { level: '4', patients: 14 },
  { level: '5', patients: 17 },
];

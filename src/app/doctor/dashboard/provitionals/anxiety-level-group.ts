
export interface Group {
  level: string;
  name: string; 
  patients: number;
}

export const LEVELS: Group[] = [
  { level: 'INDETERMINATE', name: 'Indeterminado', patients: 0 },
  { level: 'MINIMAL', name: 'Mínimo', patients: 0 },
  { level: 'MILD', name: 'Leve', patients: 0 },
  { level: 'MODERATE', name: 'Moderado', patients: 0 },
  { level: 'SEVERE', name: 'Grave', patients: 0 },
  { level: 'DEBILITATING', name: 'Debilitante', patients: 0 }
];

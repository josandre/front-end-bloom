import { AnxietyLevel } from "./AnxietyLevel";

export class MedicalHistory {
  id: number;
  creationDate: Date;
  observations: string;
  anxietyLevel: AnxietyLevel;
  treatmentStartDate: Date;
  treatmentEndDate: Date;
  isReadable: boolean;
  yearsOfTreatment: number;
  monthsOfTreatment: number;
  daysOfTreatment: number;

  constructor(partial?: Partial<MedicalHistory>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}
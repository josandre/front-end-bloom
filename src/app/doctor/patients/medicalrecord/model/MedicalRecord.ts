import { Patient } from "../../model/Patient";
import { AnxietyType } from "./AnxietyType";
import { MedicalHistory } from "./MedicalHistory";

export class MedicalRecord {
  id: number;
  familyMedicalHistory: string;
  lastUpdate: Date;
  patient: Patient;
  medicalHistories: MedicalHistory[];
  anxietyTypes: Set<AnxietyType>;

  constructor(partial?: Partial<MedicalRecord>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

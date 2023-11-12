import { Injectable } from "@angular/core";
import { API_URL } from "config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "@core";

import { MedicalRecord } from "../model/MedicalRecord";
import { Patient } from "../../model/Patient";

@Injectable({
  providedIn: 'root'
})

export class MedicalRecordService {
  private readonly baseUrl = API_URL;

  constructor(private readonly http: HttpClient,
    private readonly authService: AuthService) { }

  getMedicalRecordByPatient(patientId: number): Observable<MedicalRecord> {
    const doctorId = this.authService.currentUserValue.id;
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token);
    const url = `${this.baseUrl}/medical-records/${patientId}/${doctorId}`;

    return this.http.get<MedicalRecord>(url, { headers: header });
  }

  updateMedicalRecord(medicalRecord: MedicalRecord) {
    const doctorId = this.authService.currentUserValue.id;
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token);
    const url = `${this.baseUrl}/medical-records/${medicalRecord.id}`;

    return this.http.put<MedicalRecord>(url, medicalRecord, { headers: header });
  }

  getPatient(patientId: number): Observable<Patient> {
    const doctorId = this.authService.currentUserValue.id;
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token);
    const url = `${this.baseUrl}/medical-records/patients/${patientId}/${doctorId}`;

    return this.http.get<Patient>(url, { headers: header });
  }
}
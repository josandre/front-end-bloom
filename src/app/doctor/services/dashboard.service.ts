import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "@core";
import { API_URL } from "../../../config";
import { PatientCounts } from "../models/dashboard";
import { Event, MedicalRecordI } from "app/patient/dashboard/dashboard.service";

@Injectable({
  providedIn: 'root'
})

export class DashboardDoctorService {
  private readonly baseUrl = API_URL;

  constructor(
    private readonly http: HttpClient,
    private authenticationService: AuthService
  ) {}

  private getCurrentUser() {
    return this.authenticationService.currentUserValue;
  }

  getCountPatients(): Observable<PatientCounts> {
    const currentUser = this.getCurrentUser();
    const URL = `${this.baseUrl}/count-patients/${currentUser.id}`;
    console.log('getCountPatients', currentUser)
    return this.http.get<PatientCounts>(URL, {
      headers: { 'Authorization':  `Bearer ${currentUser.token}` }
    });
  }

  getCountResources(): Observable<number> {
    const currentUser = this.getCurrentUser();
    const URL = `${this.baseUrl}/resource/countByMedId/${currentUser.id}`;
    console.log('getCountResources', currentUser)
    return this.http.get<number>(URL, {
      headers: { 'Authorization':  `Bearer ${currentUser.token}` }
    });
  }

  getEvents(): Observable<Event[]> {
    const currentUser = this.getCurrentUser();
    const URL = `${this.baseUrl}/events/specialist/${currentUser.id}`;
    console.log('getEvents', currentUser)
    return this.http.get<Event[]>(URL, {
      headers: { 'Authorization':  `Bearer ${currentUser.token}` }
    });
  }

  getMedicalRecords(): Observable<MedicalRecordI[]> {
    const currentUser = this.getCurrentUser();
    const URL = `${this.baseUrl}/medical-records/doctor/${currentUser.id}`;
    console.log('getMedicalRecords', currentUser)
    return this.http.get<MedicalRecordI[]>(URL, {
      headers: { 'Authorization':  `Bearer ${currentUser.token}` }
    });
  }
}

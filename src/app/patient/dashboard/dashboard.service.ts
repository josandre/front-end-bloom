import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "@core";
import { API_URL } from "../../../config";

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

  getEvents(): Observable<Event[]> {
    const currentUser = this.getCurrentUser();
    const URL = `${this.baseUrl}/events/user/${currentUser.id}`;
    return this.http.get<Event[]>(URL, {
      headers: { 'Authorization':  `Bearer ${currentUser.token}` }
    });
  }

  getMedicalRecord(): Observable<MedicalRecordI> {
    const currentUser = this.getCurrentUser();
    const URL = `${this.baseUrl}/medical-records/${currentUser.id}`;
    return this.http.get<MedicalRecordI>(URL, {
      headers: { 'Authorization':  `Bearer ${currentUser.token}` }
    });
  }
}

export interface Event {
  id: number;
  date: string;
  user?: any;
}

export interface MedicalRecordI {
  id: number;
  creationDate: string;
  familyMedicalHistory: string;
  medicalHistories?: any;
  anxietyTypes?: any[];
  lastUpdate: string;
}
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
  private readonly currentUser;

  constructor(
    private readonly http: HttpClient,
    private authenticationService: AuthService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  getEvents(): Observable<Event[]> {
    const URL = `${this.baseUrl}/events/${this.currentUser.id}`;
    return this.http.get<Event[]>(URL, {
      headers: { 'Authorization':  `Bearer ${this.currentUser.token}` }
    });
  }

  getMedicalRecord(): Observable<MedicalRecordI> {
    const URL = `${this.baseUrl}/medical-records/${this.currentUser.id}`;
    return this.http.get<MedicalRecordI>(URL, {
      headers: { 'Authorization':  `Bearer ${this.currentUser.token}` }
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
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "@core";
import { API_URL } from "../../../config";
import { PatientCounts } from "../models/dashboard";

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

  getCountPatients(): Observable<PatientCounts> {
    const URL = `${this.baseUrl}/count-patients/${this.currentUser.id}`;
    return this.http.get<PatientCounts>(URL, {
      headers: { 'Authorization':  `Bearer ${this.currentUser.token}` }
    });
  }

  getCountResources(): Observable<number> {
    const URL = `${this.baseUrl}/resource/countByMedId/${this.currentUser.id}`;
    return this.http.get<number>(URL, {
      headers: { 'Authorization':  `Bearer ${this.currentUser.token}` }
    });
  }
}

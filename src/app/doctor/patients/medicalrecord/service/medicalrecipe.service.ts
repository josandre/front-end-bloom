import { Injectable } from "@angular/core";
import { API_URL } from "config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "@core";

import { MedicalRecipe } from "../model/MedicalRecipe";

@Injectable({
  providedIn: 'root'
})

export class MedicalRecordService {
  private readonly baseUrl = API_URL;

  constructor(private readonly http: HttpClient,
              private readonly authService: AuthService) { }

  getMedicalRecordByPatient(patientId: number): Observable<MedicalRecipe> {
    const doctorId = this.authService.currentUserValue.id;
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token);
    const url = `${this.baseUrl}/medical-recipes/${patientId}/${doctorId}`;

    return this.http.get<MedicalRecipe>(url, { headers: header });
  }
}
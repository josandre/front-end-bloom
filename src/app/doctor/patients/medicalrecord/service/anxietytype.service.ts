import { Injectable } from "@angular/core";
import { API_URL } from "config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "@core";

import { AnxietyType } from "../model/AnxietyType";

@Injectable({
  providedIn: 'root'
})

export class AnxietyTypeService {
  private readonly baseUrl = API_URL;

  constructor(private readonly http: HttpClient,
              private readonly authService: AuthService) { }

  createAnxietyType(medicalRecordId: number, anxietyType: AnxietyType): Observable<AnxietyType> {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token);
    const url = `${this.baseUrl}/anxiety-types/${medicalRecordId}`;

    return this.http.post<AnxietyType>(url, anxietyType, { headers: header });
  }



}
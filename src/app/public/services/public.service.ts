import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../../../config";
import { Doctor } from "../landing/doctors.constants";

@Injectable({
  providedIn: 'root'
})

export class PublicService {
  private readonly baseUrl = API_URL;;

  constructor(
    private readonly http: HttpClient,
  ) { }

  getDoctors(): Observable<Doctor[]> { 
    const URL = `${this.baseUrl}/doctor`;
    return this.http.get<Doctor[]>(URL, {}); 
  }

}

import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Patient } from '../models/patient.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from "../../../../../config";
import {AuthService} from "@core";

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private readonly baseUrl = API_URL;
  constructor(private httpClient: HttpClient, private readonly authService : AuthService) {}


  getAllPatients(): Observable<Patient[]> {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    const url = `${this.baseUrl}/patients-system`
    return this.httpClient.get<Patient[]>(url, {headers: header});
  }

  changeState(id: number){
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    const url = `${this.baseUrl}/changeStatusUser/${id}`
    return this.httpClient.put(url, {}, {headers: header});
  }

}

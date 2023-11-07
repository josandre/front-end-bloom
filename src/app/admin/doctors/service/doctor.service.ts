import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { Doctor } from '../model/Doctor';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { API_URL } from 'config';
import {AuthService} from "@core";

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private readonly baseUrl = API_URL;

  constructor(
    private httpClient: HttpClient,
    private readonly authService : AuthService) {}


  getAllDoctors(): Observable<Doctor[]> {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    const url = `${this.baseUrl}/specialists`;
    return this.httpClient.get<Doctor[]>(url, {headers: header});
  }

  changeState(id: number){
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    const url = `${this.baseUrl}/changeStatusUser/${id}`;
    return this.httpClient.put(url, {}, {headers: header});
  }
}

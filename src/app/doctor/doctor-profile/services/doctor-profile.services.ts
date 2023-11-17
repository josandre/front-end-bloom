import { Injectable } from '@angular/core';
import {API_URL} from "../../../../config";
import {HttpClient,HttpHeaders} from "@angular/common/http";

import {Password} from "../../../patient/settings/models/Password";

import { Observable} from 'rxjs';
import { AuthService } from '@core';
import {Specialist} from "../models/Specialist";
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly baseUrl = API_URL;

  constructor(private http: HttpClient,private auth:AuthService) {}

  getDataUser():Observable<Specialist>{
    const currentUser = this.auth.currentUserValue.id
    const url = `${this.baseUrl}/doctor/${currentUser}`;
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.auth.currentUserValue.token)
    return this.http.get<Specialist>(url,{headers: header});
  }

  updateDoctor(user:Specialist){
    const url = `${this.baseUrl}/doctor/${this.auth.currentUserValue.id}/doctorUpdate`;
    const userId = this.auth.currentUserValue.id;
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.auth.currentUserValue.token)
    console.log(userId)
    return this.http.put(url, user, {headers: header});
  }


  updatePassword(password: Password, userId?: number){
    const url = `${this.baseUrl}/changePassword/${userId}/password`;
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.auth.currentUserValue.token)
    console.log(userId)
    return this.http.put(url, password, {headers: header});
  }

}

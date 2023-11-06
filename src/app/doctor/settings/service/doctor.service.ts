import { Injectable } from '@angular/core';
import {API_URL} from "../../../../config";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {User} from "../../../patient/settings/models/User";
import {Specialist} from "../model/Specialist";
import {Password} from "../../../patient/settings/models/Password";

import { BehaviorSubject, Observable, of } from 'rxjs';
import { RecordsRoutingModule } from 'app/admin/records/records-routing.module';
import { AuthService } from '@core';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly baseUrl = API_URL;

  constructor(private http: HttpClient,private auth:AuthService) { 
    
  }

  getDataUser():Observable<Specialist>{
    const url = `${this.baseUrl}/doctor/${this.auth.currentUserValue.id}`;
    
    return this.http.get<Specialist>(url);
  }
  updateDoctor(user:Specialist){
    const url = `${this.baseUrl}/doctor/${this.auth.currentUserValue.id}/doctorUpdate`;
    const userId = this.auth.currentUserValue.id;
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.auth.currentUserValue.token)
    console.log(userId)
    return this.http.put(url, user, {headers: header});
  }
  updatePassword(password:Password){
    const url = `${this.baseUrl}/changePassword/${this.auth.currentUserValue.id}/password`;
    const userId = this.auth.currentUserValue.id;
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.auth.currentUserValue.token)
    console.log(userId)
    return this.http.put(url, password, {headers: header});
  }
}

import { Injectable } from '@angular/core';
import {API_URL} from "../../../config";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {User} from "../models/User";
import {Password} from "../models/Password";

import {  Observable } from 'rxjs';
import { AuthService } from '@core';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = API_URL;

  constructor(private http: HttpClient,private auth:AuthService) {

  }

  getDataUser():Observable<User>{
    const url = `${this.baseUrl}/user/${this.auth.currentUserValue.id}`;
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.auth.currentUserValue.token)
    return this.http.get<User>(url,{headers: header});
  }

  updateUser(user:User){
    const url = `${this.baseUrl}/user/${this.auth.currentUserValue.id}/user`;
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

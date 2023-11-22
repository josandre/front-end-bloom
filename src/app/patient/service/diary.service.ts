import { Injectable } from '@angular/core';
import {API_URL} from "../../../config";
import {HttpClient,HttpHeaders} from "@angular/common/http";

import {  Observable } from 'rxjs';
import { AuthService } from '@core';
import { Entry } from '../models/Entry';
import { Diary } from '../models/Diary';
@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private readonly baseUrl = API_URL;

  constructor(private http: HttpClient,private auth:AuthService) {

  }

  getDiary():Observable<Diary>{
    const url = `${this.baseUrl}/getDiary/${this.auth.currentUserValue.id}`;
    console.log(this.auth.currentUserValue.id)
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.auth.currentUserValue.token);
    return this.http.get<Diary>(url,{headers: header});
  }
  createEntry(entry:Entry,idDiary?:number){
    const url = `${this.baseUrl}/addEntry/entry`;
    const userId = this.auth.currentUserValue.id;
    entry.diary = JSON.parse(`{"id":${idDiary}}`);
    console.log('Entry:', entry);
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.auth.currentUserValue.token);
    return this.http.post(url, entry, {headers: header});

  }


  createDiary(diary:Diary){
    const url = `${this.baseUrl}/addDiary/diary/${this.auth.currentUserValue.id}}`;
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.auth.currentUserValue.token);
    return this.http.post(url, diary, {headers: header});
  }
}

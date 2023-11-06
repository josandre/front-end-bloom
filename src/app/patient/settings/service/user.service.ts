import { Injectable } from '@angular/core';
import {API_URL} from "../../../../config";
import {HttpClient} from "@angular/common/http";
import {User} from "../../settings/models/User";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RecordsRoutingModule } from 'app/admin/records/records-routing.module';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private readonly baseUrl = API_URL;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  getDataUser():Observable<User>{
    const url = `${this.baseUrl}/user/${1}`;
    
    return this.http.get<User>(url);
  }
}

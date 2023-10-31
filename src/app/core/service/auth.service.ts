import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {API_URL} from "../../../config";
import {User} from "@core/models/user";
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  login(username: string, password: string): Observable<User> {
    const url = `${this.baseUrl}/authenticate`;
     return this.http.post<AuthenticationResponse>(url, {
      username,
      password,
    }, ).pipe(map((r) => {
       const decodedToken = jwtDecode(r.token);
       const currentUser = new User({...decodedToken, token: r.token})

       this.currentUserSubject.next(currentUser)

       return currentUser
     }))
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }
}

class AuthenticationResponse {
  token: string
}

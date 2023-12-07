import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { API_URL } from 'config';
import {AuthService} from "@core";
import { Notificaction } from './EmailNotification';

@Injectable({
  providedIn: 'root',
})
export class EmailNotificationService {
  private readonly baseUrl = API_URL;

  constructor(
    private httpClient: HttpClient,
    private readonly authService : AuthService) {}

  emailNotificate(n: Notificaction){
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    const url = `${this.baseUrl}/admin-email`;
    return this.httpClient.post<String>(url, n, {headers: header});
  }
}

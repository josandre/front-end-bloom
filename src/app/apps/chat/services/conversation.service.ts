import {Injectable} from "@angular/core";
import {API_URL} from "../../../../config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "@core";
import {Observable} from "rxjs";

import {ConversationResponse} from "../models/ConversationResponse";


@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private readonly baseUrl = API_URL;

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) {}

  getConversationsByUserId(): Observable<ConversationResponse>{
    const userId = this.authService.currentUserValue.id;
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token);
    const  url = `${this.baseUrl}/conversations/${userId}`;
    return this.http.get<ConversationResponse>(url, {headers: header})
  }
}

import {Injectable} from "@angular/core";
import {API_URL} from "../../../../config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MessageResponse} from "../models/MessageResponse";
import {AuthService} from "@core";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly baseUrl = API_URL;

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) {}


  getMessagesByConversationId(conversationId: number): Observable<MessageResponse>{
    const currentUser = this.authService.currentUserValue
    const senderId = currentUser.actualUserId ?? currentUser.id
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    const url = `${this.baseUrl}/messages/${conversationId}/${senderId}`
    return this.http.get<MessageResponse>(url,{headers: header});
  }

}

import {Injectable} from "@angular/core";
import {API_URL} from "../../../../config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "@core";
import {Observable} from "rxjs";
import {NotificationResponse} from "../models/NotificationResponse";



@Injectable({
  providedIn: "root"
})
export class NotificationsService {
  private readonly baseUrl = API_URL;

  constructor(private http: HttpClient,private readonly authService: AuthService) {}

  public getNotifications(): Observable<NotificationResponse> {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token);
    const userId = this.authService.currentUserValue.id;
    const url = `${this.baseUrl}/notificationsRead/${userId}`;
    return this.http.get<NotificationResponse>(url, {headers: header});
  }

}

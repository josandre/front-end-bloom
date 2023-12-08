import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {CalendarEvent} from '../model/calendar-event.model';
import {HttpClient, HttpErrorResponse, HttpHeaders,} from '@angular/common/http';
import {AuthService} from "@core";
import {API_URL} from "../../../config";

@Injectable()
export class CalendarService {
  private readonly API_URL = 'assets/data/calendar.json';
  private readonly baseUrl = API_URL;

  dataChange: BehaviorSubject<CalendarEvent[]> = new BehaviorSubject<CalendarEvent[]>([]);
  dialogData!: CalendarEvent;
  constructor(private http: HttpClient,
              private readonly authService: AuthService) {}

  public createEvent(event: CalendarEvent) {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token);
    const userId = this.authService.currentUserValue.id;
    const url = `${this.baseUrl}/notification/${userId}`;
    return this.http.post(url, event, {headers: header});
  }

  public getEvents(): Observable<CalendarEvent[]> {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token);
    const userId = this.authService.currentUserValue.id;
    const url = `${this.baseUrl}/notificationsUser/${userId}`;
    return this.http.get<CalendarEvent[]>(url, {headers: header});
  }

  public updateEvent(eventId: number, event: CalendarEvent) {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token);
    const url = `${this.baseUrl}/updateNotification/${eventId}/notification`;

    return this.http.put(url, event, {headers: header});
  }

  public deleteEvent(eventId: number) {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token);
    const url = `${this.baseUrl}/deleteNotification/${eventId}`;

    return this.http.delete(url, {headers: header});
  }

  get data(): CalendarEvent[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  addUpdateCalendar(calendar: CalendarEvent): void {
    this.dialogData = calendar;
  }

  deleteCalendar(calendar: CalendarEvent): void {
    this.dialogData = calendar;
  }

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;
    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

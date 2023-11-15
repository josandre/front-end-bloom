import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "@core";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient, private readonly authService: AuthService) { }

  pushFileToStorage(file: File): Observable<any> {
    // const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    const data: FormData = new FormData();
    data.append('file', file);
    const url = 'http://localhost:8080/uploadFile';
    // const newRequest = new HttpRequest('POST', 'http://localhost:8080/uploadFile', data, {
    //   reportProgress: true,
    //   responseType: 'text',
    //   headers: header
    // });
    return this.http.post(url, data)
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "@core";
import {FileData} from "./fileData";
import {API_URL, S3_URL} from "../../../config";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private readonly baseUrl = API_URL;
  private readonly s3 = S3_URL;

  constructor(private http: HttpClient, private readonly authService: AuthService) { }

  pushFileToStorage(file: File): Observable<any> {
    const currentUser = this.authService.currentUserValue
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + currentUser.token)
    const data: FormData = new FormData();
    data.append('file', file, file.name);
    const userId = currentUser.actualUserId ?? currentUser.id
    const url = `${this.baseUrl}/uploadFile/${userId}`
    return this.http.post(url, data, {headers: header})
  }

  private showPhoto(photo: string){
    return `${this.s3}/${photo}`;
  }

  getPhoto(defaultPathPhoto: string){
     const photo: string | undefined = this.authService.currentUserValue.photo;

    if(photo){
      return this.showPhoto(photo);
    }

    return defaultPathPhoto;
  }

  getPhotoToList(defaultPathPhoto: string, urlPhoto: string | undefined){

    if(urlPhoto){
      return this.showPhoto(urlPhoto);
    }

    return defaultPathPhoto;
  }
}

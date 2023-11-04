import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL} from "../../../config";
import {Observable} from "rxjs";
import {Resource} from "../models/Resource";
import {AuthService} from "@core";

@Injectable({
  providedIn: 'root'
})

export class ResourceService {
  private readonly baseUrl = API_URL;

  constructor(private readonly http: HttpClient, private authenticationService: AuthService) {}

  resourceRegister(resource: Resource): Observable<Resource>{
    const currentUser = this.authenticationService.currentUserValue;
    const URL = `${this.baseUrl}/resource/add`;

    return this.http.post<Resource>(URL, resource, {headers: {'Authorization':  `Bearer ${currentUser.token}`}});
  }




}

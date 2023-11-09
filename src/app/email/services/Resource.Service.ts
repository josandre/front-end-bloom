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
    resource.specialist = JSON.parse(`{"id":${currentUser.id}}`);
    return this.http.post<Resource>(URL, resource, {headers: {'Authorization':  `Bearer ${currentUser.token}`}});
  }

  getResourceList(): Observable<Resource[]>{
      const currentUser = this.authenticationService.currentUserValue;
      const URL = `${this.baseUrl}/resource/getByMedId/${currentUser.id}`;
      return this.http.get<Resource[]>(URL, {headers: {'Authorization':  `Bearer ${currentUser.token}`}})

  }

  getResourceById(id: number): Observable<Resource>{
    const currentUser = this.authenticationService.currentUserValue;
    const URL = `${this.baseUrl}/resource/getById/${id}`;
    return this.http.get<Resource>(URL, {headers: {'Authorization':  `Bearer ${currentUser.token}`}})
  }
  deleteResourse(idsResourses: number[]){
    const currentUser =this.authenticationService.currentUserValue;
    const URL = `${this.baseUrl}/resource/delete/listIds`;
    const header = new HttpHeaders().set("Authorization", 'Bearer ${currentUser.token' + currentUser.token)

    return this.http.delete(URL, {headers: header, body: idsResourses});
  }

}

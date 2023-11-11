import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL} from "../../../config";
import {Observable} from "rxjs";
import {Resource} from "../models/Resource";
import {User} from "../models/User";
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

  getMyPatients(): Observable<User[]>{
    const currentUser = this.authenticationService.currentUserValue;
    const URL = `${this.baseUrl}/patients/${currentUser.id}`;
    return this.http.get<User[]>(URL, {headers: {'Authorization':  `Bearer ${currentUser.token}`}})
  }

  getResourcesbyUserId(): Observable<Resource[]>{
    const currentUser = this.authenticationService.currentUserValue;
    const URL = `${this.baseUrl}/resource/getAllByUserId/${currentUser.id}`;
    return this.http.get<Resource[]>(URL, {headers: {'Authorization':  `Bearer ${currentUser.token}`}})
  }

  getRole(): string{
    const currentUser  = this.authenticationService.currentUserValue;
    return currentUser.role;
  }
  resourceUpdate(resource: Resource, id : number): Observable<Resource>{
    const currentUser = this.authenticationService.currentUserValue;
    const URL = `${this.baseUrl}/resource/update/${id}`;
    return this.http.put<Resource>(URL, resource, {headers: {'Authorization':  `Bearer ${currentUser.token}`}});
  }

}

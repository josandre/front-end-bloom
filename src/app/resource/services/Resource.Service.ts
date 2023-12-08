import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL} from "../../../config";
import {Observable} from "rxjs";
import {Resource} from "../models/Resource";
import {User} from "../models/User";
import {Task} from "../models/Task";
import {AuthService} from "@core";
import { ResourceHistory } from "../models/ResourceHistory";

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
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + currentUser.token)

    return this.http.delete(URL, {headers: header, body: idsResourses});
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

  addTask(task: Task): Observable<Task>{
    const currentUser = this.authenticationService.currentUserValue;
    const URL = `${this.baseUrl}/task/add`;
    return this.http.post<Task>(URL, task, {headers: {'Authorization':  `Bearer ${currentUser.token}`}});
  }

  deleteTask(id: number){
    const currentUser = this.authenticationService.currentUserValue;
    const URL = `${this.baseUrl}/task/delete/${id}`;
    return this.http.delete(URL, {headers: {'Authorization':  `Bearer ${currentUser.token}`}});
  }

  userCheckTask(task: Task ){
    const currentUser = this.authenticationService.currentUserValue;
    const URL = `${this.baseUrl}/task/check/${currentUser.id}`;
    return this.http.put(URL, task,{headers: {'Authorization':  `Bearer ${currentUser.token}`}});
  }

  getTaskChecks(taskid: number ): Observable<boolean>{
    const currentUser = this.authenticationService.currentUserValue;
    const URL = `${this.baseUrl}/task/getChecks/${currentUser.id}/${taskid}`;
    return this.http.get<boolean>(URL,{headers: {'Authorization':  `Bearer ${currentUser.token}`}});
  }

  modTask(pId: number, pDescription: string){
    const task = new Task({
      id: pId,
      description: pDescription
    })
    const currentUser = this.authenticationService.currentUserValue;
    const URL = `${this.baseUrl}/task/update/${pId}`;
    return this.http.put(URL, task, {headers: {'Authorization':  `Bearer ${currentUser.token}`}});
  }
  sessionResource(id: number){
    sessionStorage.setItem('resourseId', id.toString());
  }

  getResourceHistory(resourceID: number) : Observable<ResourceHistory[]> {
    console.log('Yeah');
    const currentUser = this.authenticationService.currentUserValue;
    const URL = `${this.baseUrl}/resource-history/${resourceID}`;
    return this.http.get<ResourceHistory[]>(URL, {headers: {'Authorization':  `Bearer ${currentUser.token}`}});
  }

  saveResourceHistory(data: {id: number, action: number, user: {id: number}, resource: {id: number}}) {
    const currentUser = this.authenticationService.currentUserValue;
    const URL = `${this.baseUrl}/resource-history`;
    console.log(data);
    return this.http.post(URL, data, {headers: {'Authorization':  `Bearer ${currentUser.token}`}});
  }
}

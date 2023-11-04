import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../../config";
import {Observable} from "rxjs";
import {Resource} from "../models/Resource";

@Injectable({
  providedIn: 'root'
})

export class ResourceService {
  private readonly baseUrl = API_URL;

  constructor(private readonly http: HttpClient) {}

  resourceRegister(resource: Resource): Observable<Resource>{
    const URL = `${this.baseUrl}/resource/add`;
    return this.http.post<Resource>(URL, resource);
  }




}

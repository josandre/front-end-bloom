import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "@core";
import {API_URL} from "../../../config";
import {Observable} from "rxjs";
import {User} from "../../resource/models/User";


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private readonly baseUrl = API_URL;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  getPatientsList(): Observable<User[]>{
    const currentUser = this.authService.currentUserValue;
    const URL = `${this.baseUrl}/patients/${currentUser.id}`;
    return this.httpClient.get<User[]>(URL, {headers: {'Authorization':  `Bearer ${currentUser.token}`}})
  }
}

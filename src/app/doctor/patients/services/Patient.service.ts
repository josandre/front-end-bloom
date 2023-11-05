import {Injectable} from "@angular/core";
import {API_URL} from "../../../../config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Patient} from "../models/Patient";
import {Observable} from "rxjs";
import {AuthService} from "@core";

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  private readonly baseUrl = API_URL;

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) {}

  registerPatient(patient: Patient){
    const doctorId = this.authService.currentUserValue.id;
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    console.log(doctorId)
    const  url = `${this.baseUrl}/doctor/${doctorId}/patient`
    return this.http.post(url, patient, {headers: header});
  }

}

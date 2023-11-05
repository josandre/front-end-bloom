import {Injectable} from "@angular/core";
import {API_URL} from "../../../../config";
import {HttpClient} from "@angular/common/http";
import {Specialist} from "../models/Specialist";


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly baseUrl = API_URL;

  constructor(private readonly http: HttpClient) {}

  doctorsRegister(specialist: Specialist){
    const url = `${this.baseUrl}/doctor`
    return this.http.post(url, specialist);
  }
}

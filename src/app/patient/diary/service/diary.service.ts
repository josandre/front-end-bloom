import {Injectable} from "@angular/core";
import {API_URL} from "config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "@core";
import {Diary} from "../model/diary";
import {Entry} from "../model/entry";

@Injectable({
  providedIn: 'root'
})

export class DiaryService {
  private readonly baseUrl = API_URL;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService) {
  }

  getDiaryByUser(): Observable<Diary> {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    const userId = this.authService.currentUserValue.id;
    const url = `${this.baseUrl}/getDiary/${userId}`;

    return this.http.get<Diary>(url, {headers: header});
  }

  getEntriesByDiary(diaryId: number): Observable<Entry[]> {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    const url = `${this.baseUrl}/entries/${diaryId}`;

    return this.http.get<Entry[]>(url, {headers: header});
  }

  createEntry(diaryId: number, entry: Entry): Observable<number> {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    const url = `${this.baseUrl}/addEntry/${diaryId}/entry`;

    return this.http.post<number>(url, entry, {headers: header});
  }

  updateEntry(entryId: number, entry: Entry) {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    const url = `${this.baseUrl}/updateEntry/${entryId}/entry`;

    return this.http.put(url, entry, {headers: header});
  }

  deleteEntry(entryId: number) {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    const url = `${this.baseUrl}/entries/${entryId}`;

    return this.http.delete(url, {headers: header});
  }

  generateJournalPrompt(locale: string): Observable<string> {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    const url = `${this.baseUrl}/journal-prompts/generate/${locale}`;

    return this.http.get<string>(url, {headers: header});
  }
}

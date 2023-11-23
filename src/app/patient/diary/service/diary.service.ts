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
    private readonly header;

    constructor(
        private readonly http: HttpClient,
        private readonly authService: AuthService) {
        this.header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token);
    }

    getDiaryByUser(): Observable<Diary> {
        const userId = this.authService.currentUserValue.id;
        const url = `${this.baseUrl}/getDiary/${userId}`;

        return this.http.get<Diary>(url, {headers: this.header});
    }

    getEntriesByDiary(diaryId: number): Observable<Entry[]> {
        const url = `${this.baseUrl}/entries/${diaryId}`;

        return this.http.get<Entry[]>(url, {headers: this.header});
    }

    createEntry(diaryId: number, entry: Entry): Observable<number> {
        const url = `${this.baseUrl}/addEntry/19/entry`;

        return this.http.post<number>(url, entry, {headers: this.header});
    }
}

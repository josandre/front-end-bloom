import { Injectable } from '@angular/core';
import { Contact } from './contacts.model';
import { BehaviorSubject, Observable, Subject, tap } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { AuthService } from "@core";
import { API_URL } from 'config';

@Injectable()
export class ContactsService {
  private readonly baseUrl = API_URL;
  private dialogData: Contact;
  private dataSubject = new BehaviorSubject<Contact[]>([]);
  private contactAddedSubject = new Subject<Contact>();

  constructor(
    private readonly http: HttpClient,
    private authenticationService: AuthService
  ) {}

  public getCurrentUser() {
    return this.authenticationService.currentUserValue;
  }

  getDialogData(): Contact {
    return this.dialogData;
  }

  get data(): Observable<Contact[]> {
    return this.dataSubject.asObservable();
  }

  get contactAdded$(): Observable<Contact> {
    return this.contactAddedSubject.asObservable();
  }

  getAll(): Observable<Contact[]> {
    const currentUser = this.getCurrentUser();
    const URL = `${this.baseUrl}/contacts/${currentUser.id}`;
    return this.http.get<Contact[]>(URL, {
      headers: { 'Authorization':  `Bearer ${currentUser.token}` }
    }).pipe(tap(data => this.dataSubject.next(data)));
  }

  addContact(contact: Contact): Observable<Contact> {
    const currentUser = this.getCurrentUser();
    const URL = `${this.baseUrl}/contacts`;
    return this.http.post<Contact>(URL, contact, {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    }).pipe(
      tap((addedContact) => {
        this.dialogData = addedContact;
        this.contactAddedSubject.next(addedContact);
      })
    );
  }

  updateContacts(contact: Contact): Observable<Contact> {
    const currentUser = this.getCurrentUser();
    const URL = `${this.baseUrl}/contacts`;
    return this.http.put<Contact>(URL, contact, {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    }).pipe(tap((updatedContact) => this.dialogData = updatedContact));
  }

  deleteContacts(id: number): Observable<any> {
    const currentUser = this.getCurrentUser();
    const URL = `${this.baseUrl}/contacts/${id}`;
    return this.http.delete(URL, {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    });
  }
}

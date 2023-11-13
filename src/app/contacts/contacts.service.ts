import { Injectable } from '@angular/core';
import { Contact } from './contacts.model';
import { BehaviorSubject, Observable, Subject, tap } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from "@core";
import { API_URL } from 'config';

@Injectable()
export class ContactsService {
  private readonly baseUrl = API_URL;
  public readonly currentUser; // Cambia la visibilidad a public
  private dialogData: Contact;
  private dataSubject = new BehaviorSubject<Contact[]>([]);
  private contactAddedSubject = new Subject<Contact>(); // Paso 1: Agrega un Subject

  constructor(
    private readonly http: HttpClient,
    private authenticationService: AuthService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    console.log(this.currentUser);
  }

  getDialogData(): Contact {
    return this.dialogData;
  }

  get data(): Observable<Contact[]> {
    return this.dataSubject.asObservable();
  }

  get contactAdded$(): Observable<Contact> { // Paso 2: Agrega un método para suscribirse a los eventos
    return this.contactAddedSubject.asObservable();
  }

  getAll(): Observable<Contact[]> {
    const URL = `${this.baseUrl}/contacts/${this.currentUser.id}`;
    return this.http.get<Contact[]>(URL, {
      headers: { 'Authorization':  `Bearer ${this.currentUser.token}` }
    }).pipe(tap(data => this.dataSubject.next(data))); // Actualizar BehaviorSubject con los nuevos datos
  }

  addContact(contact: Contact): Observable<Contact> {
    const URL = `${this.baseUrl}/contacts`;
    return this.http.post<Contact>(URL, contact, {
      headers: { 'Authorization': `Bearer ${this.currentUser.token}` }
    }).pipe(
      tap((addedContact) => {
        this.dialogData = addedContact;
        this.contactAddedSubject.next(addedContact); // Paso 2: Emitir el evento de nuevo contacto agregado
      })
    );
  }

  updateContacts(contact: Contact): Observable<Contact> {
    const URL = `${this.baseUrl}/contacts`;
    return this.http.put<Contact>(URL, contact, {
      headers: { 'Authorization': `Bearer ${this.currentUser.token}` }
    }).pipe(tap((updatedContact) => this.dialogData = updatedContact));
  }

  deleteContacts(id: number): Observable<any> {
    const URL = `${this.baseUrl}/contacts/${id}`;
    return this.http.delete(URL, {
      headers: { 'Authorization': `Bearer ${this.currentUser.token}` }
    });
  }
}

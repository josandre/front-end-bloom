import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from './patient.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class PatientService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/patient.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Patient;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Patient[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllPatients(): void {
    this.subs.sink = this.httpClient.get<Patient[]>(this.API_URL).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }
  addPatient(patient: Patient): void {
    this.dialogData = patient;

    // this.httpClient.post(this.API_URL, patient)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = patient;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updatePatient(patient: Patient): void {
    this.dialogData = patient;

    // this.httpClient.put(this.API_URL + patient.id, patient)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = patient;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deletePatient(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
}

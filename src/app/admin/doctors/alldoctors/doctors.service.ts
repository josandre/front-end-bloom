import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Doctors } from './doctors.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class DoctorsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/doctors.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Doctors[]> = new BehaviorSubject<Doctors[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Doctors;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Doctors[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDoctorss(): void {
    this.subs.sink = this.httpClient.get<Doctors[]>(this.API_URL).subscribe({
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
  addDoctors(doctors: Doctors): void {
    this.dialogData = doctors;

    // this.httpClient.post(this.API_URL, doctors)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = doctors;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateDoctors(doctors: Doctors): void {
    this.dialogData = doctors;

    // this.httpClient.put(this.API_URL + doctors.id, doctors)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = doctors;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteDoctors(id: number): void {
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

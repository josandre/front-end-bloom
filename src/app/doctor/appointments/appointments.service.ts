import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointments } from './appointments.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class AppointmentsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/doc-appointments.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Appointments[]> = new BehaviorSubject<
    Appointments[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Appointments;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Appointments[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAppointmentss(): void {
    this.subs.sink = this.httpClient
      .get<Appointments[]>(this.API_URL)
      .subscribe({
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
  addAppointments(appointments: Appointments): void {
    this.dialogData = appointments;

    // this.httpClient.post(this.API_URL, appointments)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = appointments;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateAppointments(appointments: Appointments): void {
    this.dialogData = appointments;

    // this.httpClient.put(this.API_URL + appointments.id, appointments)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = appointments;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteAppointments(id: number): void {
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

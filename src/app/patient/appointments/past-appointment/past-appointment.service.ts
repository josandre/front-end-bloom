import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PastAppointment } from './past-appointment.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class PastAppointmentService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/past-appointment.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<PastAppointment[]> = new BehaviorSubject<
    PastAppointment[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: PastAppointment;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): PastAppointment[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllPastAppointment(): void {
    this.subs.sink = this.httpClient
      .get<PastAppointment[]>(this.API_URL)
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
  addPastAppointment(appointment: PastAppointment): void {
    this.dialogData = appointment;

    // this.httpClient.post(this.API_URL, appointment)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = appointment;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updatePastAppointment(appointment: PastAppointment): void {
    this.dialogData = appointment;

    // this.httpClient.put(this.API_URL + appointment.id, appointment)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = appointment;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deletePastAppointment(id: number): void {
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

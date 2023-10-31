import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MedicineList } from './medicine-list.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class MedicineListService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/medicineList.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<MedicineList[]> = new BehaviorSubject<
    MedicineList[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: MedicineList;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): MedicineList[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllMedicineLists(): void {
    this.subs.sink = this.httpClient
      .get<MedicineList[]>(this.API_URL)
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
  addMedicineList(medicineList: MedicineList): void {
    this.dialogData = medicineList;

    // this.httpClient.post(this.API_URL, medicineList)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = medicineList;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateMedicineList(medicineList: MedicineList): void {
    this.dialogData = medicineList;

    // this.httpClient.put(this.API_URL + medicineList.id, medicineList)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = medicineList;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteMedicineList(id: number): void {
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

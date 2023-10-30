import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DepartmentList } from './department-list.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class DepartmentListService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/departmentList.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<DepartmentList[]> = new BehaviorSubject<
    DepartmentList[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: DepartmentList;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): DepartmentList[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDepartmentLists(): void {
    this.subs.sink = this.httpClient
      .get<DepartmentList[]>(this.API_URL)
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
  addDepartmentList(departmentList: DepartmentList): void {
    this.dialogData = departmentList;

    // this.httpClient.post(this.API_URL, departmentList)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = departmentList;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateDepartmentList(departmentList: DepartmentList): void {
    this.dialogData = departmentList;

    // this.httpClient.put(this.API_URL + departmentList.id, departmentList)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = departmentList;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteDepartmentList(id: number): void {
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

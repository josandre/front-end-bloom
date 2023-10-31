import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IssuedItems } from './issued-items.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class IssuedItemsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/issuedItems.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<IssuedItems[]> = new BehaviorSubject<
    IssuedItems[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: IssuedItems;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): IssuedItems[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllIssuedItemss(): void {
    this.subs.sink = this.httpClient
      .get<IssuedItems[]>(this.API_URL)
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
  addIssuedItems(issuedItems: IssuedItems): void {
    this.dialogData = issuedItems;

    // this.httpClient.post(this.API_URL, issuedItems)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = issuedItems;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateIssuedItems(issuedItems: IssuedItems): void {
    this.dialogData = issuedItems;

    // this.httpClient.put(this.API_URL + issuedItems.id, issuedItems)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = issuedItems;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteIssuedItems(id: number): void {
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

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from './room.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class RoomService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/rooms.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Room;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Room[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllRooms(): void {
    this.subs.sink = this.httpClient.get<Room[]>(this.API_URL).subscribe({
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
  addRoom(room: Room): void {
    this.dialogData = room;

    // this.httpClient.post(this.API_URL, room)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = room;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateRoom(room: Room): void {
    this.dialogData = room;

    // this.httpClient.put(this.API_URL + room.id, room)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = room;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteRoom(id: number): void {
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

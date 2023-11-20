import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';

import {MedicalRecordService} from "../service/medicalrecord.service";

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-delete-medicalhistory-dialog',
  templateUrl: './delete-medicalhistory-dialog.component.html',
  styleUrls: ['./delete-medicalhistory-dialog.component.scss']
})
export class DeleteMedicalhistoryDialogComponent {
  medicalHistoryId: number = this.data.id;

  constructor(
    public dialogRef: MatDialogRef<DeleteMedicalhistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public medicalRecordService: MedicalRecordService,
    private snackBar: MatSnackBar) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    console.log(this.medicalHistoryId);
    this.medicalRecordService.deleteMedicalHistory(this.medicalHistoryId)
      .subscribe((response) => {
        switch (response) {
          case 200: {
            this.openSnackBar("Medical history deleted!", "Close");
            break;
          }
        }
      }, error => {
        console.log(error);
        this.openSnackBar("Something went wrong while trying to delete medical history", "Try again");
      })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { verticalPosition: 'top', horizontalPosition: 'end' })
  }

}

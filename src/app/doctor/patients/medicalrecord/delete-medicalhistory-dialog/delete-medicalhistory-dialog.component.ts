import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';

import {MedicalRecordService} from "../service/medicalrecord.service";
import { TranslateService } from '@ngx-translate/core';

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
    private snackBar: MatSnackBar,
    private translate: TranslateService
    ) {
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
            this.openSnackBar('MEDICAL_RECORD.SNACKBAR.DELETE_MEDICAL_HISTORY.SUCCESS', 'MEDICAL_RECORD.SNACKBAR.ACTIONS.CLOSE');
            break;
          }
        }
      }, error => {
        console.log(error);
        this.openSnackBar('MEDICAL_RECORD.SNACKBAR.DELETE_MEDICAL_HISTORY.ERROR', 'MEDICAL_RECORD.SNACKBAR.ACTIONS.TRY_AGAIN');
      })
  }

  openSnackBar(message: string, action: string) {
    this.translate.get([message,action]).subscribe((translations: any) => {
      this.snackBar.open(translations[message], translations[action], { verticalPosition: 'top', horizontalPosition: 'end',duration: 4000 })
    });
  }

}

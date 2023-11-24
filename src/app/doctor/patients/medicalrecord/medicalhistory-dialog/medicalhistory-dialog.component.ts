import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MedicalRecordService} from '../service/medicalrecord.service';
import {MedicalHistory} from '../model/MedicalHistory';
import {MedicalRecipe} from '../model/MedicalRecipe';
import {AnxietyLevel} from "../model/AnxietyLevel";
import { TranslateService } from '@ngx-translate/core';

export interface DialogData {
  id: number;
  action: string;
  medicalHistory: MedicalHistory;
}

@Component({
  selector: 'app-medicalhistory-dialog',
  templateUrl: './medicalhistory-dialog.component.html',
  styleUrls: ['./medicalhistory-dialog.component.scss']
})

export class MedicalhistoryDialogComponent {
  action: string;
  dialogTitle: string;
  medicalHistoryForm: FormGroup;
  anxietyLevelOptions: string[] = Object.keys(AnxietyLevel);
  medicalHistory: MedicalHistory;
  medicalRecipe: MedicalRecipe;
  medicalRecordId: number = this.data.id;

  constructor(
    public dialogRef: MatDialogRef<MedicalhistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public medicalRecordService: MedicalRecordService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {

    this.action = data.action;

    if (this.action === "edit") {
      this.medicalHistory = data.medicalHistory;
      this.medicalRecipe = data.medicalHistory.medicalRecipe;
      this.dialogTitle = 'MEDICAL_RECORD.MEDICAL_HISTORY.UPDATE_MEDICAL_HISTORY';
    } else {
      this.dialogTitle = 'MEDICAL_RECORD.MEDICAL_HISTORY.NEW_MEDICAL_HISTORY';
      const blankObject = {} as MedicalHistory;
      this.medicalHistory = new MedicalHistory(blankObject);
      this.medicalRecipe = new MedicalRecipe(blankObject);
    }

    this.medicalHistoryForm = this.createContactForm();
  }

  formControl = new FormControl('', [
    Validators.required,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : '';
  }

  createContactForm(): FormGroup {
    return this.formBuilder.group({
      observations: [this.medicalHistory.observations],
      anxietyLevel: [this.medicalHistory.anxietyLevel],
      treatmentStartDate: [this.medicalHistory.treatmentStartDate],
      treatmentEndDate: [this.medicalHistory.treatmentEndDate],
      name: [this.medicalRecipe.name],
      indications: [this.medicalRecipe.indications],
    });
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAction(): void {
    if (this.medicalHistoryForm.valid) {

      
      this.medicalHistory.observations = this.medicalHistoryForm.controls['observations'].value;
      this.medicalHistory.anxietyLevel = this.medicalHistoryForm.controls['anxietyLevel'].value;
      this.medicalHistory.treatmentStartDate = this.medicalHistoryForm.controls['treatmentStartDate'].value;
      this.medicalHistory.treatmentEndDate = this.medicalHistoryForm.controls['treatmentEndDate'].value;
      this.medicalRecipe.name = this.medicalHistoryForm.controls['name'].value;
      this.medicalRecipe.indications = this.medicalHistoryForm.controls['indications'].value;

      this.medicalHistory.medicalRecipe = this.medicalRecipe;

      if (this.action === "add") {
        this.createMedicalHistory();
      } else {
        this.updateMedicalHistory();
      }
    }
  }

  private createMedicalHistory(): void {
    this.medicalRecordService.createMedicalHistory(this.medicalRecordId, this.medicalHistory)
      .subscribe((response) => {
        switch (response) {
          case 200:{
            this.openSnackBar('MEDICAL_RECORD.SNACKBAR.CREATE_MEDICAL_HISTORY.SUCCESS', 'MEDICAL_RECORD.SNACKBAR.ACTIONS.CLOSE')
            break;
          }
        }
      }, error => {
        switch (error) {
          case 400:{
            this.openSnackBar('MEDICAL_RECORD.SNACKBAR.CREATE_MEDICAL_HISTORY.ERROR', 'MEDICAL_RECORD.SNACKBAR.ACTIONS.TRY_AGAIN');
            break;
          }
        }
      });
  }

  private updateMedicalHistory(): void {
    this.medicalRecordService.updateMedicalHistory(this.medicalHistory.id, this.medicalHistory)
      .subscribe((response) => {
        switch (response) {
          case 200:{
            this.openSnackBar('MEDICAL_RECORD.SNACKBAR.UPDATE_MEDICAL_HISTORY.SUCCESS', 'MEDICAL_RECORD.SNACKBAR.ACTIONS.CLOSE')
            break;
          }
        }
      }, error => {
        switch (error) {
          case 400:{
            this.openSnackBar('MEDICAL_RECORD.SNACKBAR.UPDATE_MEDICAL_HISTORY.ERROR', 'MEDICAL_RECORD.SNACKBAR.ACTIONS.TRY_AGAIN');
            break;
          }
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this.translate.get([message,action]).subscribe((translations: any) => {
      this.snackBar.open(translations[message], translations[action], { verticalPosition: 'top', horizontalPosition: 'end',duration: 4000 })
    });
  }
}

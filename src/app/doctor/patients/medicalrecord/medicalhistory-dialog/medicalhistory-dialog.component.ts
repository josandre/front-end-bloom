import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { MedicalRecordService } from '../service/medicalrecord.service';
import { MedicalHistory } from '../model/MedicalHistory';
import { MedicalRecipe } from '../model/MedicalRecipe';

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

  medicalHistory: MedicalHistory;
  medicalRecipe: MedicalRecipe;
  medicalRecordId: number = this.data.id;

  constructor(
    public dialogRef: MatDialogRef<MedicalhistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public medicalRecordService: MedicalRecordService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {

    this.action = data.action;
    if (this.action === 'edit') {
      this.medicalHistory = data.medicalHistory;
      this.dialogTitle = 'Update Medical History';
    } else {
      this.dialogTitle = 'New Medical History';
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

  public confirmAdd(): void {
    if (this.medicalHistoryForm.valid) {
      this.medicalHistory.observations = this.medicalHistoryForm.controls['observations'].value;
      this.medicalHistory.anxietyLevel = this.medicalHistoryForm.controls['anxietyLevel'].value;
      this.medicalHistory.treatmentStartDate = this.medicalHistoryForm.controls['treatmentStartDate'].value;
      this.medicalHistory.treatmentEndDate = this.medicalHistoryForm.controls['treatmentEndDate'].value;
      this.medicalRecipe.name = this.medicalHistoryForm.controls['name'].value;
      this.medicalRecipe.indications = this.medicalHistoryForm.controls['indications'].value;

      this.medicalHistory.medicalRecipe = this.medicalRecipe;

      this.medicalRecordService.createMedicalHistory(this.medicalRecordId, this.medicalHistory)
      .subscribe((response) => {
        switch (response) {
          case 200:{
            this.openSnackBar("Medical history added!", "Close")
            break;
          }
        }
      }, error => {
            switch (error) {
              case 404:{
                this.openSnackBar("Something went wrong while trying to add medical history", "Try again");
                break;
              }
            }
          });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { verticalPosition: 'top', horizontalPosition: 'end' })
  }
}
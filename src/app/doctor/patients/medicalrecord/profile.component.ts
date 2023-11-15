import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

import { MedicalRecordService } from './service/medicalrecord.service';
import { AnxietyTypeService } from './service/anxietytype.service';

import { MedicalRecord } from './model/MedicalRecord';
import { Patient } from '../model/Patient';
import { AnxietyType } from './model/AnxietyType';
import { MedicalHistory } from './model/MedicalHistory';
import { MedicalhistoryDialogComponent } from './medicalhistory-dialog/medicalhistory-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  medicalRecord: MedicalRecord | undefined;
  medicalHistory: MedicalHistory | undefined;
  medicalRecordId: number;
  medicalHistories: MedicalHistory[] | undefined;
  patient: Patient | undefined;
  anxieties: Set<string>;
  anxitiesControl: FormControl;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  familyMedicalHistoryControl: FormControl;

  panelOpenState = false;

  pageSize = 8;
  currentPage = 1;

  constructor(public medicalRecordService: MedicalRecordService,
    public anxietyTypeService: AnxietyTypeService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getMedicalRecord(Number(this.route.snapshot.paramMap.get('id')));
    this.getPatient(Number(this.route.snapshot.paramMap.get('id')));
    this.initializeForms();
    this.anxieties = new Set<string>();
    this.anxitiesControl.disable();
    this.familyMedicalHistoryControl.disable();
  }

  initializeForms() {
    this.anxitiesControl = new FormControl();
    this.familyMedicalHistoryControl = new FormControl({
      validators: [Validators.required]
    });
  }

  getMedicalRecord(id: number): void {
    this.medicalRecordService.getMedicalRecordByPatient(id)
      .subscribe(
        data => {
          this.medicalRecord = data;
          this.medicalRecordId = this.medicalRecord.id;
          this.medicalHistories = this.medicalRecord.medicalHistories;

          console.log(this.medicalHistories);
          this.familyMedicalHistoryControl.setValue(this.medicalRecord.familyMedicalHistory);

          this.medicalRecord.anxietyTypes.forEach((anxiety => {
            this.anxieties.add(anxiety.anxietyType);
          }));

          if (this.medicalRecord.familyMedicalHistory === null) {
            this.openSnackBar("Family medical history has yet to be filled out", "Close");
          }
        },
        error => {
          switch (error.status) {
            case 400: {
              this.openSnackBar("User not allowed", "Close");
              break;
            }
          }
        });
  }

  getPatient(id: number): void {
    this.medicalRecordService.getPatient(id)
      .subscribe(
        data => {
          this.patient = data;
        },
        error => {
          console.log(error.status);
        });
  }

  addAnxietyTypeFromInput(event: MatChipInputEvent) {
    if (event.value) {
      if (this.anxieties.has(event.value)) {
        this.openSnackBar("This anxiety type already exits", "Close");
        return;
      }

      this.anxieties.add(event.value);

      const anxietyType: AnxietyType = new AnxietyType({
        anxietyType: event.value
      });

      this.anxietyTypeService.createAnxietyType(this.medicalRecordId, anxietyType)
        .subscribe(
          (response) => {
            switch (response) {
              case 200: {
                this.openSnackBar("Anxiety type has been added successfully!", "Close")
                break;
              }
            }
          },
          error => {
            switch (error.status) {
              case 400: {
                this.openSnackBar("Something went wrong while trying to register anxiety type", "Try again");
                break;
              }
            }
          });

      event.chipInput!.clear();
    }
  }

  removeAnxietyType(anxietyType: string) {
    this.anxieties?.delete(anxietyType);

    this.anxietyTypeService.deleteAnxietyType(this.medicalRecordId, anxietyType)
      .subscribe(
        (response) => {
          switch (response) {
            case 200: {
              this.openSnackBar("Anxiety type has been deleted successfully!", "Close")
              break;
            }
          }
        },
        error => {
          switch (error.status) {
            case 400: {
              this.openSnackBar("Something went wrong while trying to delete anxiety type", "Try again");
              break;
            }
          }
        });
  }

  updateMedicalRecord(): void {
    if (this.familyMedicalHistoryControl.valid) {
      let familyMedicalHistoryHasChanged: boolean = this.medicalRecord?.familyMedicalHistory != this.familyMedicalHistoryControl.value;

      this.familyMedicalHistoryControl.disable();
  
      if (!familyMedicalHistoryHasChanged) {
        return;
      }

      const medicalRecord: MedicalRecord = new MedicalRecord({
        familyMedicalHistory: this.familyMedicalHistoryControl.value
      });

      this.medicalRecordService.updateMedicalRecord(medicalRecord, this.medicalRecordId)
        .subscribe((response) => {
          this.medicalRecord!.familyMedicalHistory = this.familyMedicalHistoryControl.value;
          switch (response) {
            case 200: {
              this.openSnackBar("Family medical history updated", "Close");
              break;
            }
          }
        }, error => {
          console.log(error);
          this.openSnackBar("Something went wrong while trying to update medical record", "Try again");
        })
    }
  }

  addMedicalHistory() {
    this.dialog.open(MedicalhistoryDialogComponent, {
      data: {
        id: this.medicalRecordId,
        patient: this.medicalHistory,
        action: 'add',
      },
    });
  }

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.medicalHistories?.slice(startIndex, endIndex);
  }

  applyFilter(filterValue: any) {
    let filterText: string = filterValue.value
    filterText = filterText.trim();
    filterText = filterText.toLowerCase()
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { verticalPosition: 'top', horizontalPosition: 'end' })
  }

  isFormEnabled(form: FormControl): boolean {
    return form.enabled;
  }
}
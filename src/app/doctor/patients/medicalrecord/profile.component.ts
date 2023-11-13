import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

import { MedicalRecordService } from './service/medicalrecord.service';
import { AnxietyTypeService } from './service/anxietytype.service';

import { MedicalRecord } from './model/MedicalRecord';
import { Patient } from '../model/Patient';
import { AnxietyType } from './model/AnxietyType';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  medicalRecord: MedicalRecord | undefined;
  medicalRecordId: number;
  patient: Patient | undefined;
  anxieties: Set<string>;
  anxitiesControl: FormControl;

  constructor(public medicalRecordService: MedicalRecordService,
    public anxietyTypeService: AnxietyTypeService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getMedicalRecord(Number(this.route.snapshot.paramMap.get('id')));
    this.getPatient(Number(this.route.snapshot.paramMap.get('id')));
    this.initializeForms();
    this.anxieties = new Set<string>();
    this.anxitiesControl.disable();
  }

  initializeForms() {
    this.anxitiesControl = new FormControl();
  }

  getMedicalRecord(id: number): void {
    this.medicalRecordService.getMedicalRecordByPatient(id)
      .subscribe(
        data => {
          this.medicalRecord = data;
          this.medicalRecordId = this.medicalRecord.id;

          console.log(this.medicalRecordId);

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

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
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

  removeKeyword(keyword: string) {
    this.anxieties?.delete(keyword);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { verticalPosition: 'top', horizontalPosition: 'end' })
  }
}

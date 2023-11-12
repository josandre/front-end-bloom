import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';

import { MedicalRecordService } from './service/medicalrecord.service';

import { MedicalRecord } from './model/MedicalRecord';
import { Patient } from '../model/Patient';
import { AnxietyType } from './model/AnxietyType';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  medicalRecord: MedicalRecord | undefined;
  patient: Patient | undefined;
  anxieties = new Set<string>();


  constructor(public medicalRecordService: MedicalRecordService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
    this.getMedicalRecord(Number(this.route.snapshot.paramMap.get('id')));
    this.getPatient(Number(this.route.snapshot.paramMap.get('id')));
  }

  getMedicalRecord(id: number): void {
    this.medicalRecordService.getMedicalRecordByPatient(id)
      .subscribe(
        data => {
          this.medicalRecord = data;

          this.medicalRecord.anxietyTypes.forEach((anxiety => {
            this.anxieties.add(anxiety.anxietyType);
          }));


          console.log(this.anxieties);
          
          if (this.medicalRecord.familyMedicalHistory === null) {
            this.openSnackBar("Family medical history has yet to be filled out", "Close");
          }
        },
        error => {
          switch(error.status) {
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

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'end'})
  }


  formControl = new FormControl({disabled: true});

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      const anxietyType = new AnxietyType({anxietyType: event.value})
      this.anxieties.add(event.value);
      event.chipInput!.clear();
    }
  }

  removeKeyword(keyword: string) {
    this.anxieties?.delete(keyword);
  }
}

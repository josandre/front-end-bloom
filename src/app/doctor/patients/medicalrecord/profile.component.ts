import {Component, OnInit, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

import {FormControl, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';

import {MedicalRecordService} from './service/medicalrecord.service';
import {AnxietyTypeService} from './service/anxietytype.service';

import {MedicalRecord} from './model/MedicalRecord';
import {Patient} from '../model/Patient';
import {AnxietyType} from './model/AnxietyType';
import {MedicalHistory} from './model/MedicalHistory';

import {MedicalhistoryDialogComponent} from './medicalhistory-dialog/medicalhistory-dialog.component';
import {
    DeleteMedicalhistoryDialogComponent
} from "./delete-medicalhistory-dialog/delete-medicalhistory-dialog.component";
import {UploadFileService} from "../../../global/upload-file/upload-file.service";
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';


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
  isLoading: boolean = true
  message:string =  'MEDICAL_RECORD.MEDICAL_HISTORY.MESSAGE'

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  familyMedicalHistoryControl: FormControl;

  panelOpenState = false;

  pageSize = 8;
  currentPage = 1;

  constructor(
    public medicalRecordService: MedicalRecordService,
    public anxietyTypeService: AnxietyTypeService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private readonly fileService: UploadFileService,
    private translate: TranslateService) {

  }

  getFormattedDate(date?:Date): string {
    moment.locale(this.translate.currentLang);
    if (date) {
      return moment(date).format("MMMM D, YYYY");
    }
    return '';
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
    this.isLoading = true

    this.medicalRecordService.getMedicalRecordByPatient(id)
      .subscribe(
        data => {
          this.isLoading = false
          this.medicalRecord = data;
          this.medicalRecordId = this.medicalRecord.id;
          this.medicalHistories = this.medicalRecord.medicalHistories;

          this.familyMedicalHistoryControl.setValue(this.medicalRecord.familyMedicalHistory);

          this.medicalRecord.anxietyTypes.forEach((anxiety => {
            this.anxieties.add(anxiety.anxietyType);
          }));

          if (this.medicalRecord.familyMedicalHistory === null) {
            this.isLoading = false
           this.openSnackBar('MEDICAL_RECORD.SNACKBAR.GET_MEDICAL_RECORD.FILL_OUT','MEDICAL_RECORD.SNACKBAR.ACTIONS.CLOSE');
          }
        },
        error => {
          this.isLoading = false
          switch (error.status) {
            case 400: {
              this.openSnackBar('MEDICAL_RECORD.SNACKBAR.GET_MEDICAL_RECORD.ERROR','MEDICAL_RECORD.SNACKBAR.ACTIONS.CLOSE');
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
        this.openSnackBar('MEDICAL_RECORD.SNACKBAR.ADD_ANXIETY_TYPE.TEXT','MEDICAL_RECORD.SNACKBAR.ACTIONS.TRY_AGAIN');
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
                this.openSnackBar('MEDICAL_RECORD.SNACKBAR.ADD_ANXIETY_TYPE.SUCCESS', 'MEDICAL_RECORD.SNACKBAR.ACTIONS.CLOSE')
                break;
              }
            }
          },
          error => {
            switch (error.status) {
              case 400: {
                this.openSnackBar('MEDICAL_RECORD.SNACKBAR.ADD_ANXIETY_TYPE.ERROR', 'MEDICAL_RECORD.SNACKBAR.ACTIONS.TRY_AGAIN');
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
              this.openSnackBar('MEDICAL_RECORD.SNACKBAR.REMOVE_ANXIETY_TYPE.SUCCESS', 'MEDICAL_RECORD.SNACKBAR.ACTIONS.CLOSE')
              break;
            }
          }
        },
        error => {
          switch (error.status) {
            case 400: {
              this.openSnackBar('MEDICAL_RECORD.SNACKBAR.REMOVE_ANXIETY_TYPE.ERROR', 'MEDICAL_RECORD.SNACKBAR.ACTIONS.TRY_AGAIN');
              break;
            }
          }
        });
  }

  updateMedicalRecord(): void {
    if (this.familyMedicalHistoryControl.valid) {
      const familyMedicalHistoryHasChanged: boolean = this.medicalRecord?.familyMedicalHistory != this.familyMedicalHistoryControl.value;

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
              this.openSnackBar('MEDICAL_RECORD.SNACKBAR.UPDATE_MEDICAL_RECORD.SUCCESS', 'MEDICAL_RECORD.SNACKBAR.ACTIONS.CLOSE');
              break;
            }
          }
        }, error => {
            console.log(error);
          this.openSnackBar('MEDICAL_RECORD.SNACKBAR.UPDATE_MEDICAL_RECORD.ERROR', 'MEDICAL_RECORD.SNACKBAR.ACTIONS.TRY_AGAIN');
        });
    }
  }

  addMedicalHistory() {
    const dialogMedicalHistory = this.dialog.open(MedicalhistoryDialogComponent,{
      data: {
        id: this.medicalRecordId,
        patient: this.medicalHistory,
        action: 'add',
      },
    });

    dialogMedicalHistory.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getMedicalRecord(Number(this.route.snapshot.paramMap.get('id')));
      }
    });
  }

  updateMedicalHistory(medicalHistoryUpdate: MedicalHistory) {
    const dialogMedicalHistory = this.dialog.open(MedicalhistoryDialogComponent, {
      data: {
        medicalHistory: medicalHistoryUpdate,
        action: 'edit',
      },
    });

    dialogMedicalHistory.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getMedicalRecord(Number(this.route.snapshot.paramMap.get('id')));
      }
    });
  }

  deleteMedicalHistory(medicalHistoryId: number) {
    const dialogMedicalHistory = this.dialog.open(DeleteMedicalhistoryDialogComponent, {
      data: {id: medicalHistoryId},
    });

    dialogMedicalHistory.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getMedicalRecord(Number(this.route.snapshot.paramMap.get('id')));
      }
    });
  }

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.medicalHistories?.slice(startIndex, endIndex);
  }

  openSnackBar(message: string, action: string) {
    this.translate.get([message,action]).subscribe((translations: any) => {
      this.snackBar.open(translations[message], translations[action], { verticalPosition: 'top', horizontalPosition: 'end',duration: 4000 })
    });
  }

  isFormEnabled(form: FormControl): boolean {
    return form.enabled;
  }

  getPhoto(urlPhoto: string | undefined){
    return this.fileService.getPhotoToList('assets/images/user/user.png', urlPhoto);
  }
}

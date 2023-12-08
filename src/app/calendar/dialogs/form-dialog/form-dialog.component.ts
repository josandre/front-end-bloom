import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {CalendarService} from '../../service/calendar.service';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {CalendarEvent} from '../../model/calendar-event.model';
import {EventCategoryEnum} from "../../model/event-category-enum";
import {NotificationTime} from "../../model/NotificationTime";
import {NotificationTimeEnum} from "../../model/NotificationTimeEnum";
import {User} from "../../../resource/models/User";
import {DoctorService} from "../../service/doctor.service";

export interface DialogData {
  id: number;
  action: string;
  calendar: CalendarEvent;
}

@Component({
  selector: 'app-form-dialog:not(o)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  calendarForm: FormGroup;
  calendar: CalendarEvent;
  showDeleteBtn = false;
  word = ''
  patients : Array<User> = [];

  categoryOptions: string[] = Object.keys(EventCategoryEnum);

  notificationTimes: NotificationTime[] = [
    {value: NotificationTimeEnum.DAYS, viewValue: 'Days'},
    {value: NotificationTimeEnum.HOURS, viewValue: 'Hours'},
    {value: NotificationTimeEnum.MINUTES, viewValue: 'Minutes'},
  ];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public calendarService: CalendarService,
    private fb: FormBuilder,
    private doctorService: DoctorService
  ) {

    this.action = data.action;

    if (this.action === 'edit') {
      this.dialogTitle = 'EVENTS.DIALOG.TITLE.EDIT';
      this.calendar = data.calendar;
      this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'EVENTS.DIALOG.TITLE.NEW';
      const blankObject = {} as CalendarEvent;
      this.calendar = new CalendarEvent(blankObject);
      this.showDeleteBtn = false;
    }

    this.calendarForm = this.createContactForm();
    this.loadPatients();
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
    return this.fb.group({
      id: [this.calendar.id],
      title: [this.calendar.title, [Validators.required]],
      category: [this.calendar.category],
      startDate: [new Date(this.calendar.startDate), [Validators.required]],
      endDate: [new Date(this.calendar.endDate), [Validators.required]],
      details: [this.calendar.details],
      time: [this.calendar.time, [Validators.required]],
      notificationTime: [this.calendar.notificationTime, [Validators.required]],
    });
  }

  submit() {
    // empty stuff
  }

  deleteEvent() {
    this.calendarService.deleteCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close('delete');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.calendarService.addUpdateCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close('submit');
  }

  loadPatients(){
    this.doctorService.getPatientsList().subscribe(patients => {
      this.patients = patients;
    })
  }
}

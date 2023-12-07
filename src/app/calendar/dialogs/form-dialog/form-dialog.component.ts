import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {CalendarService} from '../../service/calendar.service';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {CalendarEvent} from '../../model/calendar.model';
import {EventCategory} from "../../../global/models/eventcategory";
import {NotificationTime} from "../../model/NotificationTime";
import {NotificationTimeEnum} from "../../model/NotificationTimeEnum";

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

  categoryOptions: string[] = Object.keys(EventCategory);

  notificationTimes: NotificationTime[] = [
    {value: NotificationTimeEnum.DAYS, viewValue: 'Days'},
    {value: NotificationTimeEnum.HOURS, viewValue: 'Hours'},
    {value: NotificationTimeEnum.MINUTES, viewValue: 'Minutes'},
  ];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public calendarService: CalendarService,
    private fb: FormBuilder
  ) {

    this.action = data.action;

    if (this.action === 'edit') {
      this.dialogTitle = data.calendar.title;
      this.calendar = data.calendar;
      this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'New Event';
      const blankObject = {} as CalendarEvent;
      this.calendar = new CalendarEvent(blankObject);
      this.showDeleteBtn = false;
    }

    this.calendarForm = this.createContactForm();
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
      startDate: [this.calendar.startDate, [Validators.required]],
      endDate: [this.calendar.endDate, [Validators.required]],
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
    console.log(this.calendarForm.value)
    this.dialogRef.close('submit');
  }

}

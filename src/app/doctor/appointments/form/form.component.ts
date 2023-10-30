import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import {
  Validators,
  FormGroup,
  FormBuilder, FormControl,
} from '@angular/forms';
import { Appointments } from '../appointments.model';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  appointments: Appointments;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  action: string;
  dialogTitle?: string;
  isDetails = false;
  appointmentsForm?: FormGroup;
  appointments: Appointments;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public appointmentsService: AppointmentsService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'details') {
      this.appointments = data.appointments;
      this.isDetails = true;
    } else {
      this.isDetails = false;
      this.dialogTitle = 'New Appointments';
      const blankObject = {} as Appointments;
      this.appointments = new Appointments(blankObject);
      this.appointmentsForm = this.createContactForm();
    }
  }
  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.appointments.id],
      img: [this.appointments.img],
      name: [this.appointments.name],
      email: [
        this.appointments.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dateTime: [
        formatDate(this.appointments.dateTime, 'yyyy-MM-dd, HH:mm', 'en'),
        [Validators.required],
      ],
      address: [this.appointments.address],
      mobile: [this.appointments.mobile],
      disease: [this.appointments.disease],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.appointmentsService.addAppointments(
      this.appointmentsForm?.getRawValue()
    );
  }
}

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AppointmentService } from '../../appointment.service';

export interface DialogData {
  id: number;
  name: string;
  email: string;
  mobile: string;
}

@Component({
  selector: 'app-delete:not(c)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public appointmentService: AppointmentService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.appointmentService.deleteAppointment(this.data.id);
  }
}

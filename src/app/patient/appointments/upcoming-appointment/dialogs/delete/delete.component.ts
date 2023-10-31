import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UpcomingAppointmentService } from '../../upcoming-appointment.service';

export interface DialogData {
  id: number;
  doctor: string;
  email: string;
  mobile: string;
}

@Component({
  selector: 'app-delete:not(r)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public appointmentService: UpcomingAppointmentService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.appointmentService.deleteUpcomingAppointment(this.data.id);
  }
}

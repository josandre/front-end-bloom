import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PastAppointmentService } from '../../past-appointment.service';

export interface DialogData {
  id: number;
  doctor: string;
  email: string;
  mobile: string;
}

@Component({
  selector: 'app-delete:not(p)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class PastDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PastDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public appointmentService: PastAppointmentService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.appointmentService.deletePastAppointment(this.data.id);
  }
}

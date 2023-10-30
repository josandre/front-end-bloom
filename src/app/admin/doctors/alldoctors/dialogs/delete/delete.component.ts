import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DoctorsService } from '../../doctors.service';

export interface DialogData {
  id: number;
  name: string;
  department: string;
  mobile: string;
}

@Component({
  selector: 'app-delete:not(f)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public doctorsService: DoctorsService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.doctorsService.deleteDoctors(this.data.id);
  }
}

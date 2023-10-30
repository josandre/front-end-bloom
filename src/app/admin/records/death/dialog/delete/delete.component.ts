import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DeathService } from '../../death.service';

export interface DialogData {
  id: number;
  patient_name: string;
  gender: string;
  gaurdian_name: string;
}

@Component({
  selector: 'app-delete:not(l)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public deathService: DeathService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.deathService.deleteDeath(this.data.id);
  }
}

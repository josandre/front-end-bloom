import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BirthService } from '../../birth.service';

export interface DialogData {
  id: number;
  child_name: string;
  gender: string;
  mother_name: string;
}

@Component({
  selector: 'app-delete:not(k)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public birthService: BirthService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.birthService.deleteBirth(this.data.id);
  }
}

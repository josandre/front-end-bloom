import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ContactsService } from '../contacts.service';

export interface DialogData {
  id: number;
  name: string;
  email: string;
  relation: string;
}

@Component({
  selector: 'app-delete:not(o)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public contactsService: ContactsService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.contactsService.deleteContacts(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close(true); 
      },
      error: (error) => {
        console.error('Error deleting contact:', error);
      }
    });
  }
}

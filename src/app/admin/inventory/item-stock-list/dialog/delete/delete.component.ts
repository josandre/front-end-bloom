import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ItemStockListService } from '../../item-stock-list.service';

export interface DialogData {
  id: number;
  category: string;
  i_name: string;
  qty: string;
}

@Component({
  selector: 'app-delete:not(h)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public itemStockListService: ItemStockListService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.itemStockListService.deleteItemStockList(this.data.id);
  }
}

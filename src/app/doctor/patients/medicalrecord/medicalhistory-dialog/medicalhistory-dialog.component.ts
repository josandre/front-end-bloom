import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { MedicalHistory } from '../model/MedicalHistory';
import { MedicalRecipe } from '../model/MedicalRecipe';

export interface DialogData {
  id: number;
  medicalHistory: MedicalHistory;
}

@Component({
  selector: 'app-medicalhistory-dialog',
  templateUrl: './medicalhistory-dialog.component.html',
  styleUrls: ['./medicalhistory-dialog.component.scss']
})
export class MedicalhistoryDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

}

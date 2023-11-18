import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

import { MedicalHistory } from '../model/MedicalHistory';

export interface DialogData {
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

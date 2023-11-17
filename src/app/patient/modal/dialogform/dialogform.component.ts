import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-dialogform',
  templateUrl: './dialogform.component.html',
  styleUrls: ['./dialogform.component.scss'],
})
export class DialogformComponent implements OnInit {
  public diaryForm!: FormGroup;
  constructor(private fb: FormBuilder, public dialog: MatDialog) {}
  public ngOnInit(): void {
    this.diaryForm = this.fb.group({
      IdProof: null,
      title: new FormControl("", {
        validators:[Validators.required]
      })
    
    });
  
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }
  onSubmitClick() {
    console.log('Form Value', this.diaryForm?.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Diary } from 'app/patient/models/Diary';
import { User } from '@core';
import { UserService } from 'app/patient/service/user.service';
import { DiaryService } from 'app/patient/service/diary.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dialogform',
  templateUrl: './dialogform.component.html',
  styleUrls: ['./dialogform.component.scss'],
})
export class DialogformComponent implements OnInit {
  public diaryForm!: FormGroup;
  constructor(private fb: FormBuilder, public dialog: MatDialog,private diaryService:DiaryService,private snackBar: MatSnackBar) {}
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
    const diary=new Diary({
      title: this.diaryForm.controls['title'].value,
      
    })
    this.diaryService.createDiary(diary).subscribe((res) => {
      switch (res) {
        case 200:{
          this.openSnackBar("User updated", "Close");
          break;
        }
      }
    }, error => {
        this.openSnackBar("The user was not updated", "Close" );

        })
    console.log('Form Value', this.diaryForm?.value);
  }
  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'end', duration: 3000} )
  }
  
}

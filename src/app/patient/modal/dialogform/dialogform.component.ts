import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Diary } from 'app/patient/models/Diary';
import { DiaryService } from 'app/patient/service/diary.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialogform',
  templateUrl: './dialogform.component.html',
  styleUrls: ['./dialogform.component.scss'],
})
export class DialogformComponent implements OnInit {
  public diaryForm!: FormGroup;
  constructor(private fb: FormBuilder, public dialog: MatDialog,private diaryService:DiaryService,private snackBar: MatSnackBar,private router: Router) {}
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
    const diary= new Diary({
      title: this.diaryForm.controls['title'].value,
    })

    this.diaryService.createDiary(diary).subscribe((res) => {
      switch (res) {
        case 200:{
          this.openSnackBar("Diary created", "Close");
          this.router.navigate(['/patient/entry-diary']);
          this.closeDialog();
          break;
        }
      }
    }, error => {
        this.openSnackBar("The Diary was not creaed", "Close" );
        console.log(error);
        })
  }
  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'end', duration: 3000} )
  }

}

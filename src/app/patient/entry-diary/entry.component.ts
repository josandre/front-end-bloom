import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tags } from '../models/Tags';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DiaryService } from '../service/diary.service';
import { Entry } from '../models/Entry';
import { Diary } from '../models/Diary';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit{
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA];
  tags: Tags[] = [];
  entryForm: FormGroup;
  diary?:Diary;
  constructor(private formBuilder: FormBuilder, private diaryService:DiaryService,private snackBar: MatSnackBar) {


  }
  
  ngOnInit(): void {
    this.entryForm = this.formBuilder.group({
      entry: new FormControl("", {
        validators:[Validators.required],
        updateOn: "submit"
      })
    });

    this.diaryService.getDiary().subscribe(
      (diary: Diary) => {
        console.log('Datos del diary:', diary);
        this.diary=diary;
      }, error => {
        console.error('Error al obtener datos del usuario:', error);
      });
  }
  saveEntry(){
    if(this.entryForm.valid){
      const entry:Entry=new Entry({
        text:this.entryForm.controls['entry'].value,
        date: new Date(),
        readable:false,
        tags: this.tags,
      })
      this.diaryService.createEntry(entry,this.diary?.id).subscribe((res) => {
        switch (res) {
          case 200:{
            this.openSnackBar("User updated", "Close");
            this.tags=[];
            break;
          }
        }
      }, error => {
          this.openSnackBar("The user was not updated", "Close" );

          })
    }
  }
 
  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'end'})
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Agregar tag
    if (value) {
      this.tags.push({ text: value });
    }

    // Limpiar el valor del input
    event.chipInput!.clear();
  }

  remove(tags: Tags): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}

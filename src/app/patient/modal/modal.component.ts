import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { SimpleDialogComponent } from './simpleDialog.component';
import { DialogformComponent } from './dialogform/dialogform.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DiaryService } from '../service/diary.service';
import { Diary } from '../models/Diary';
import { Router } from '@angular/router';

// import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  closeResult = '';
  loading:boolean=true;

  constructor(
    private dialogModel: MatDialog, private diaryService: DiaryService, private router: Router,
  ) {}
  public ngOnInit(): void {
    this.diary();
  }
  diary(){
    this.diaryService.getDiary().subscribe(
      (diary: Diary) => {
        if(diary!=null){
          console.log("tengo Diario");
          this.router.navigate(['/patient/entry-diary']);
        }
      this.loading=false;
      }, error => {
        console.error('Error al obtener datos del usuario:', error);
        
      });
  }
  openDialog(): void {
    this.dialogModel.open(DialogformComponent, {
      width: '640px',
      disableClose: true,
    });
  }
}

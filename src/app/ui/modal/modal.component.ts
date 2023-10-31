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

  simpleDialog?: MatDialogRef<SimpleDialogComponent>;
  public fname?: string = 'John';
  public lname?: string = 'Deo';
  public addCusForm?: FormGroup;
  firstName?: string;
  lastName?: string;
  dialogConfig?: MatDialogConfig;
  constructor(
    private dialogModel: MatDialog,
    private fb: FormBuilder // private modalService: NgbModal
  ) {}
  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      IdProof: null,
      firstname: [
        this.fname,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      lastname: [
        this.lname,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      email: [null, [Validators.required, Validators.email]],
    });
  }
  dialog() {
    this.simpleDialog = this.dialogModel.open(SimpleDialogComponent);
  }
  openDialog(): void {
    this.dialogModel.open(DialogformComponent, {
      width: '640px',
      disableClose: true,
    });
  }
}

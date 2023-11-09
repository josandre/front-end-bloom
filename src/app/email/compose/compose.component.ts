import {Component, OnInit, ViewChild} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResourceService} from "../services/Resource.Service";
import {Resource} from "../models/Resource";
import {User} from "../models/User";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss'],
})
export class ComposeComponent implements OnInit{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('richEditor', {static: false})
  public editor: any = ClassicEditor;
  data: string = "";
  flag: boolean = false;


  readonly formGroup = new FormGroup({
    title: new FormControl("", {
      validators: [Validators.required],
      updateOn: 'submit'
    }),
    content: new FormControl("", {
      validators: [Validators.required],
      updateOn: 'submit'
    })
  })

  constructor(private readonly resourceService: ResourceService, private router: Router, private snackBar: MatSnackBar) {}

  patientsList: User[];
  checkedList: Array<number> = [];
  jsoniedList: Array<string> = [];
  checks = document.querySelectorAll(".check");
  ngOnInit(){
    this.resourceService.getMyPatients().subscribe(
      patients =>{ this.patientsList = patients;
        this.flag = true;},
      error => {console.log(error)}
    )


  }

  onSubmit(){
    const resourcetitle  = this.formGroup.controls['title'].value;

    if (this.editor && this.editor.editorInstance) {
      const content = this.editor.editorInstance.getData();
      const fecha = new Date();
      const resource = new Resource({
        title: resourcetitle,
        content: content,
        date: fecha,
        users: JSON.parse(this.patientListToJson())
      });

      this.resourceService.resourceRegister(resource).subscribe((res: NonNullable<unknown>) => {
        switch (res) {
          case 200:{
            this.openSnackBar("Resource added successfully", "Close");
            this.router.navigate(['/email/inbox']);
            break;
          }
        }
      }, error => {
        switch (error.error) {
          case 404:
            this.openSnackBar("The resource was not added", "Close" );
            this.router.navigate(['/email/inbox']);
            break;
        }
      })
    }
  }
  onCheck(id: number){

    if (this.checkedList.includes(id)){
      this.removePatient(id);
    }else{
      this.checkedList.push(id);
    }
    this.patientListToJson();
  }

  removePatient(id: number){
    this.checkedList.forEach( (item, index) => {
      if(item === id) this.checkedList.splice(index,1);
    });
  }

  patientListToJson(): string{
    this.jsoniedList = [];
    this.checkedList.forEach((node) =>{
      this.jsoniedList.push(JSON.parse(`{"id":${node}}`));
    });
    return JSON.stringify(this.jsoniedList);
  }

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'end'})
  }

}

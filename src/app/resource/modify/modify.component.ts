import {Component, OnInit, ViewChild} from '@angular/core';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResourceService} from "../services/Resource.Service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../models/User";
import {Resource} from "../models/Resource";

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {

  @ViewChild('richEditor', {static: false})
  public editor: any = ClassicEditor;
  data: string = "";
  flag: boolean = false;
  postingFlag: boolean = false;
  id: string|null;
  resource: Resource;
  patientsList: User[];

  loading : boolean = false

  message : string = 'MENUITEMS.RESOURCES.MESSAGE_UPDATE'
  messageRead: string = 'MENUITEMS.RESOURCES.MESSAGE_READ'
  role = this.resourceService.getRole();
  checkedList: Array<number> = [];
  jsoniedList: Array<string> = [];
  checks = document.querySelectorAll(".check");
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
  ngOnInit(){
    this.loading = true
    this.resourceService.getMyPatients().subscribe(
      patients =>{ this.patientsList = patients;
        this.flag = true;},
      error => {console.log(error)}
    )

    this.id = sessionStorage.getItem('resourseId');
    if(this.id != null) {
      this.resourceService.getResourceById(parseInt(this.id)).subscribe(
        data => {
          this.resource = data;
          this.loading = false
          sessionStorage.removeItem('resourceId');
          sessionStorage.clear();
          this.editor.editorInstance.setData(this.resource.content);
          this.formGroup.controls['title'].setValue(this.resource.title);
        }
      )
    }else{
      console.log("resourse id was null");
    }
  }
  onSubmit(){
    const resourcetitle  = this.formGroup.controls['title'].value;

    if (this.editor && this.editor.editorInstance) {

      const content = this.editor.editorInstance.getData();

      const tempResource = new Resource({
        title: resourcetitle,
        content: content,
        date: this.resource.date,
        users: JSON.parse(this.patientListToJson())
      });

      if (content != '' && resourcetitle != '' && this.id != null){
        this.postingFlag = true;
        this.openSnackBar("Modifying your resource please wait...", "Close");
        this.resourceService.resourceUpdate(tempResource,parseInt(this.id)).subscribe((res: NonNullable<unknown>) => {
          switch (res) {
            case 200:{
              this.openSnackBar("Resource edited successfully", "Close");
              this.router.navigate(['/resource/my-resources']);
              break;
            }
          }
        }, error => {
          switch (error.error) {
            case 401:
              this.openSnackBar("The resource was not edited", "Close" );
              this.router.navigate(['/resource/my-resources']);
              break;
          }
        })
      }else {
        if (content === '')
          this.openSnackBar("Please fill out the content", "Close");
        if (resourcetitle === '')
          this.openSnackBar("Please write a title", "Close");
      }

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
    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'center', duration: 3000} )
  }

}

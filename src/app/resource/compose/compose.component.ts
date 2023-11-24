import {Component, OnInit, ViewChild} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResourceService} from "../services/Resource.Service";
import {Resource} from "../models/Resource";
import {User} from "../models/User";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-compose-resource',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss'],
})
export class ComposeResourceComponent implements OnInit{
  formGroup!: FormGroup;
  @ViewChild('richEditor', {static: false})
  public editor: any = ClassicEditor;
  data: string = "";
  flag: boolean = false;
  postingFlag: boolean = false;
  patientsList: User[];
  checkedList: Array<number> = [];
  jsoniedList: Array<string> = [];
  checks = document.querySelectorAll(".check");

  constructor(private readonly resourceService: ResourceService,
              private router: Router,
              private snackBar: MatSnackBar,
              private readonly translate:TranslateService) {}

  ngOnInit(){

     this.formGroup = new FormGroup({
       title: new FormControl("", {
         validators: [Validators.required],
         updateOn: 'submit'
      }),
      content: new FormControl("", {
        validators: [Validators.required],
        updateOn: 'submit'
      })
    })

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

      if (content != '' && resourcetitle != '' && this.patientListToJson() != '[]'){
        this.postingFlag = true;
        this.openSnackBar(this.translate.instant('MENUITEMS.RESOURCESNACK.CREATERES'), "Close");
        this.resourceService.resourceRegister(resource).subscribe((res: NonNullable<unknown>) => {
          switch (res) {
            case 200:{
              this.openSnackBar(this.translate.instant('MENUITEMS.RESOURCESNACK.RESADD'), "Close");
              this.router.navigate(['/resource/my-resources']);
              break;
            }
          }
        }, error => {
          switch (error.error) {
            case 404:
              this.openSnackBar(this.translate.instant('MENUITEMS.RESOURCESNACK.RESNOTADD'), "Close" );
              this.router.navigate(['/resource/my-resources']);
              break;
          }
        })
      }else {
        if (content === '')
        this.openSnackBar(this.translate.instant('MENUITEMS.RESOURCESNACK.NOCONTENT'), "Close");
        if (resourcetitle === '')
          this.openSnackBar(this.translate.instant('MENUITEMS.RESOURCESNACK.NOTITLE'), "Close");
        if (this.patientListToJson() === '[]')
          this.openSnackBar(this.translate.instant('MENUITEMS.RESOURCESNACK.NOPATIENT'), "Close");
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
      this.jsoniedList.push(JSON.parse(
        `{"id":${node}}`
      ));
    });
    return JSON.stringify(this.jsoniedList);
  }

  openSnackBar(message: string, action: string){

    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'center', duration: 3000} )
  }

}

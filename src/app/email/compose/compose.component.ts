import {Component, OnInit, ViewChild} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResourceService} from "../services/Resource.Service";
import {Resource} from "../models/Resource";
import {User} from "../models/User";
import {newArray} from "@angular/compiler/src/util";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;

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

  constructor(private readonly resourceService: ResourceService) {}

  patientsList: User[];
  checkedList: string[] = [];
  idJson: string = '';
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
        date: fecha
      });

      this.resourceService.resourceRegister(resource).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  onCheck(id: number){
    console.log(id);
    this.idJson  = JSON.stringify(`{"id":${id.toString()}}`);
    console.log(this.idJson);
    if (this.checkedList.includes(this.idJson)){
      this.removePatient(this.idJson);
      console.log("removing");
    }else{
      this.checkedList.push(this.idJson);
      console.log("failed to remove");
    }
    console.log(`the list ATM: ${JSON.stringify(this.checkedList)}`);
  }

  removePatient(id: string){
    this.checkedList.forEach( (item, index) => {
      if(item === id) this.checkedList.splice(index,1);
    });
  }

}

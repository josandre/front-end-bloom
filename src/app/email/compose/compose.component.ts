import {Component, ViewChild} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResourceService} from "../services/Resource.Service";
import {Resource} from "../models/Resource";

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss'],
})
export class ComposeComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('richEditor', {static: false})
  public editor: any = ClassicEditor;
  data: string = "";
  // eslint-disable-next-line @typescript-eslint/no-empty-function

  readonly formGroup = new FormGroup({
      resourcetitle: new FormControl("", {
      validators: [Validators.required],
      updateOn: 'submit'
    }),
    content: new FormControl("", {
      validators: [Validators.required],
      updateOn: 'submit'
    })
  })

  constructor(private readonly resourceService: ResourceService) {}

  onSubmit(){
    let resourcetitle  = (<HTMLInputElement>document.getElementById('resourcetitle')).value;

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
}

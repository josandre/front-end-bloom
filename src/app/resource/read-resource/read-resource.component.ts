import {Component, OnInit} from '@angular/core';
import {ResourceService} from "../services/Resource.Service";
import {Resource} from "../models/Resource";
import {User} from "../models/User";
import {Task} from "../models/Task";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read-resource',
  templateUrl: './read-resource.component.html',
  styleUrls: ['./read-resource.component.scss'],
})
export class ReadResourceComponent implements OnInit{

  formGroup!: FormGroup;
  constructor(private readonly resourceService: ResourceService,
              private router: Router,
              private snackBar: MatSnackBar) {  }
  id: string|null;
  resource: Resource;
  patientsList: User[];
  taskList: Task[];
  checkedList: Array<number> = [];
  flag: boolean = false;
  role = this.resourceService.getRole();

  message : string = 'MENUITEMS.RESOURCES.MESSAGE_READ'
  ngOnInit() {

    this.flag = true
    this.id = sessionStorage.getItem('resourseId');

    if(this.id != null) {
      this.resourceService.getResourceById(parseInt(this.id)).subscribe(
        data => {
          this.resource = data;
          if (data.users != null){
            this.patientsList = JSON.parse(JSON.stringify(data.users));
          }
          if (data.taskList != null){
            this.taskList = JSON.parse(JSON.stringify(data.taskList));

            if (this.role === 'Patient'){
              this.taskList.forEach((task) =>{
                this.resourceService.getTaskChecks(task.id).subscribe(data =>{
                  task.done = data;
                });
              });
            }


          }
          sessionStorage.removeItem('resourceId');
          sessionStorage.clear();
          this.flag = false;
        },
        error => {
          console.log(error);
        }

      )
    }else{
      console.log("resourse id was null");
    }

    this.formGroup = new FormGroup({
      newtask: new FormControl("", {
        validators: [Validators.required],
        updateOn: 'submit'
      })
    })

  }
onSubmit(){
  const taskDescription  = this.formGroup.controls['newtask'].value;

  if (taskDescription !=''){
    const task = new Task({
      description: taskDescription,
      done: false,
      resource: JSON.parse(
        `{"id":${this.resource.id}}`),
      users: this.patientsList
    })

    this.resourceService.addTask(task).subscribe((res: NonNullable<unknown>) =>{

      switch (res) {
        case 200:{
          this.openSnackBar("Task added successfully", "Close");
          this.router.navigate(['/resource/my-resources']);
          break;
        }
      }
    }, error => {
      switch (error.error) {
        case 404:
          this.openSnackBar("The task was not added", "Close" );
          this.router.navigate(['/resource/my-resources']);
          break;
      }
      })

  }

}

  onCheck(ide: number){
    if (this.checkedList.includes(ide)){
      this.removeTask(ide);
    }else{
      this.checkedList.push(ide);
    }

    if (this.role === 'Patient'){
      this.taskList.forEach((task) =>{
        if (task.id == ide){
          task.done = !task.done;
          const task1 = new Task(
            {
              id: task.id,
              done: task.done
            }
          );
          this.resourceService.userCheckTask(task1).subscribe((res: NonNullable<unknown>) =>{
            switch (res) {
              case 200:{
                this.openSnackBar("Task changed successfully", "Close");
                break;
              }
            }
          }, error => {
            switch (error.error) {
              case 404:
                this.openSnackBar("The task was not changed", "Close" );
                break;
            }
          })
        }
      });
    }
  }
  removeTask(id: number){
    this.checkedList.forEach( (item, index) => {
      if(item === id) this.checkedList.splice(index,1);
    });
  }

  deleteChecked(){
    if (this.checkedList != null && this.checkedList.length > 0){
      this.checkedList.forEach((node) =>{

        this.resourceService.deleteTask(node.valueOf()).subscribe( ( res: NonNullable<unknown>) =>{
          switch (res) {
            case 200:{
              this.openSnackBar("Task deleted successfully", "Close");
              this.router.navigate(['/resource/my-resources']);
              break;
            }
          }
        }, error => {
            switch (error.error) {
              case 404:
                this.openSnackBar("The task was not deleted", "Close" );
                this.router.navigate(['/resource/my-resources']);
                break;
            }
          }
        )
      });
    }


  }

  openSnackBar(message: string, action: string){

    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'center', duration: 3000} )
  }
  sessionResource(id: number){
    sessionStorage.setItem('resourseId', id.toString());
  }

  modTask(id: number) {
    Swal.fire({
      title: 'Cambiar el contenido de la tarea',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputValidator: result => !result && 'You need to input something!',
      showCancelButton: true,
      confirmButtonText: 'Modificar',
      showLoaderOnConfirm: true,
      preConfirm: (dato) => {
        return this.resourceService.modTask(id, dato).subscribe((res: NonNullable<unknown>) =>{
          switch (res) {
            case 200:{
              this.openSnackBar("Task modified successfully", "Close");
              this.router.navigate(['/resource/my-resources']);
              break;
            }
          }
        }, error => {
          switch (error.error) {
            case 404:
              this.openSnackBar("The task was not modified", "Close" );
              this.router.navigate(['/resource/my-resources']);
              break;
          }
        })
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }


}

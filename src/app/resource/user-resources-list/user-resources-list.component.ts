import { Component, OnInit } from '@angular/core';
import {ResourceService} from "../services/Resource.Service";
import {Resource} from "../models/Resource";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-resources-list',
  templateUrl: './user-resources-list.component.html',
  styleUrls: ['./user-resources-list.component.scss']
})
export class UserResourcesListComponent implements OnInit {

  message: string = 'MENUITEMS.RESOURCES.MESSAGE'

  messageData: string = 'PATIENTS_LISTS.MESSAGE_NO_DATA'

  constructor(private readonly resourceService: ResourceService,private snackBar: MatSnackBar) {
    this.selectedResourceIds=[];
  }

  resourcesList: Resource[];
  originalResourcesList: Resource[];
  selectedResourceIds: number[];

  flag: boolean = false;
  isEmpty: boolean = false;
  ngOnInit(){
    this.flag = true;

    this.resourceService.getResourcesbyUserId().subscribe(
      resources =>{
        this.resourcesList = resources;
        this.originalResourcesList=[...resources]

        if(!this.resourcesList || !this.resourcesList.length){
          this.isEmpty = true
        }

        if(!this.originalResourcesList || !this.originalResourcesList.length){
          this.isEmpty = true
        }
        this.flag = false;

      }
    )

  }

  applyFilter(filterValue: any) {
    let filterText: string = filterValue.value;
    filterText = filterText.trim();
    filterText = filterText.toLowerCase();

    if (filterText) {
      this.resourcesList = this.originalResourcesList.filter((resource) =>
        resource.title.toLowerCase().includes(filterText)
      );
    } else {
      this.resourcesList = [...this.originalResourcesList]; // Restaurar la lista original
    }
  }

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'end'})
  }
  sessionResource(id: number){
    sessionStorage.setItem('resourseId', id.toString());
  }
}

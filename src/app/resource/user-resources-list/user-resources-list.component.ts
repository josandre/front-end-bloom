import { Component, OnInit } from '@angular/core';
import {ResourceService} from "../services/Resource.Service";
import {Resource} from "../models/Resource";

@Component({
  selector: 'app-user-resources-list',
  templateUrl: './user-resources-list.component.html',
  styleUrls: ['./user-resources-list.component.scss']
})
export class UserResourcesListComponent implements OnInit {

  constructor(private readonly resourceService: ResourceService) {  }

  resourcesList: Resource[];

  flag: boolean = false;

  ngOnInit(){

    this.resourceService.getResourcesbyUserId().subscribe(
      resources =>{
        this.resourcesList = resources;
        this.flag = true;
      }
    )

  }

  readResource(id: number){
    sessionStorage.setItem('resourseId', id.toString());
  }
}

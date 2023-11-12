import {Component, OnInit} from '@angular/core';
import {ResourceService} from "../services/Resource.Service";
import {Resource} from "../models/Resource";

@Component({
  selector: 'app-inbox',
  templateUrl: './myResources.component.html',
  styleUrls: ['./myResources.component.scss'],
})
export class MyResourcesComponent implements OnInit{

  constructor(private readonly resourceService: ResourceService) {  }

  resourcesList: Resource[];

  flag: boolean = false;

  ngOnInit(){

    this.resourceService.getResourceList().subscribe(
      resources =>{
        this.resourcesList = resources;
        this.flag = true;
      }
    )
  }

  sessionResource(id: number){
    sessionStorage.setItem('resourseId', id.toString());
  }

}

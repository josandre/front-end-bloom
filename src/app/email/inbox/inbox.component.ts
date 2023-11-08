import {Component, OnInit} from '@angular/core';
import {ResourceService} from "../services/Resource.Service";
import {Resource} from "../models/Resource";
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit{

  constructor(private readonly resourceService: ResourceService) {  }

  resourcesList: Resource[];
  originalResourcesList: Resource[];
  ngOnInit(){
    this.resourceService.getResourceList().subscribe(
      resources =>{ 
        this.resourcesList = resources;
        this.originalResourcesList=[...resources]}
    )
  }

  readResource(id: number){
    sessionStorage.setItem('resourseId', id.toString());
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

}

import {Component, OnInit} from '@angular/core';
import {ResourceService} from "../services/Resource.Service";
import {Resource} from "../models/Resource";
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit{

  constructor(private readonly resourceService: ResourceService) {
    this.selectedResourceIds=[];
    }

  resourcesList: Resource[];
  originalResourcesList: Resource[];
  selectedResourceIds: number[];

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
  readResourceCheck(id: number) {
    console.log(id);
    const index = this.selectedResourceIds.indexOf(id);
  
    if (index === -1) {
      // Si no se encontró el ID en el arreglo, lo añade
      this.selectedResourceIds.push(id);
      console.log("No estaba seleccionado pero ahora si",id);
    } else {
      // deselecciona
      this.selectedResourceIds.splice(index, 1);
      console.log("ya no estoy seleccionado",id);

    }
  }
  deleteResourse(){
    
  }

}

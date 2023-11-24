import {Component, OnInit} from '@angular/core';
import {ResourceService} from "../services/Resource.Service";
import {Resource} from "../models/Resource";
import { MatSnackBar } from '@angular/material/snack-bar';
import {Task} from "../models/Task";
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-inbox',
  templateUrl: './myResources.component.html',
  styleUrls: ['./myResources.component.scss'],
})
export class MyResourcesComponent implements OnInit{

  constructor(private readonly resourceService: ResourceService,
              private snackBar: MatSnackBar,
              private readonly translate:TranslateService) {
    this.selectedResourceIds=[];
    }

  resourcesList: Resource[];
  originalResourcesList: Resource[];
  selectedResourceIds: number[];

  flag: boolean = false;

  ngOnInit(){

    this.resourceService.getResourceList().subscribe(
      resources =>{
        this.resourcesList = resources;
        this.originalResourcesList=[...resources]
        this.flag = true;
      }

    )
  }

  sessionResource(id: number){
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
  deleteResource(){
    this.resourceService.deleteResourse(this.selectedResourceIds).subscribe((res) => {
      switch (res) {
        case 200:{
          this.openSnackBar(this.translate.instant('MENUITEMS.RESOURCESNACK.RESDEL'), "Close");
          // Usar filter para crear una nueva lista que excluya los objetos con los IDs a eliminar
          this.resourcesList = this.resourcesList.filter(resource => !this.selectedResourceIds.includes(resource.id));
          this.originalResourcesList=[...this.resourcesList]
          this.selectedResourceIds = [];
          // Restablecer la tabla para mostrar todos los datos
          break;
        }
      }
    }, error => {
        this.openSnackBar(this.translate.instant('MENUITEMS.RESOURCESNACK.ERROR'), "Close" );

        })
  }

  deleteThisResource(id: number){
    this.selectedResourceIds = [id];
    this.resourceService.deleteResourse(this.selectedResourceIds).subscribe((res) => {
      switch (res) {
        case 200:{
          this.openSnackBar(this.translate.instant('MENUITEMS.RESOURCESNACK.RESDEL'), "Close");
          // Usar filter para crear una nueva lista que excluya los objetos con los IDs a eliminar
          this.resourcesList = this.resourcesList.filter(resource => !this.selectedResourceIds.includes(resource.id));
          this.originalResourcesList=[...this.resourcesList]
          this.selectedResourceIds = [];
          // Restablecer la tabla para mostrar todos los datos
          break;
        }
      }
    }, error => {
      this.openSnackBar(this.translate.instant('MENUITEMS.RESOURCESNACK.ERROR'), "Close" );

    })
  }

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'center', duration: 3000})
  }

  protected readonly Task = Task;

  protected readonly indexedDB = indexedDB;
}

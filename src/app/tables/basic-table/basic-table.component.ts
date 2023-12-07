import { Component, OnInit} from '@angular/core';
import { ResourceService } from './service/resource.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resource } from './models/Resource';
import {MatPaginator, MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import {MatTableDataSource} from "@angular/material/table";
import {Doctor} from "../../admin/doctors/model/Doctor";
import { Notificaction } from 'app/admin/notification/EmailNotification';
import { EmailNotificationService } from 'app/admin/notification/EmailNotificaction.service';
import { AuthService } from '@core';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss'],
})
export class BasicTableComponent implements OnInit {

  displayedColumns = [
    'id',
    'title',
    'date'
  ];
  currentUser:any;
  message: string = '';

  public pageSlice : Resource[];
  constructor(private readonly resourceService: ResourceService,
              private readonly authService:AuthService,
              private snackBar: MatSnackBar,
              private translate: TranslateService,
              private paginatorIntl: MatPaginatorIntl,
              public emailNotification: EmailNotificationService,
              ) {
    this.selectedResourceIds=[];
    this.paginatorIntl.itemsPerPageLabel = '';
    this.currentUser = this.authService.currentUserValue;
    }

  resourcesList: Resource[];
  originalResourcesList: Resource[];
  selectedResourceIds: number[];
  loading: boolean = true;


  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.loading = true

    this.resourceService.getResourceList().subscribe(
      resources =>{
        this.loading=false
        this.resourcesList = resources;
        console.log(resources)
        this.originalResourcesList=[...resources]
        this.pageSlice = this.resourcesList.slice(0,5);
        this.loading = false;
      },
      error => {
        this.loading = false;
      })


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
    this.pageSlice = this.resourcesList.slice(0,5);
    this.loading = false;
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
          this.openSnackBar("Resource deleted", "Close");
          // Usar filter para crear una nueva lista que excluya los objetos con los IDs a eliminar
          this.resourcesList = this.resourcesList.filter(resource => !this.selectedResourceIds.includes(resource.id));
          this.originalResourcesList=[...this.resourcesList]
          this.selectedResourceIds = [];
          // Restablecer la tabla para mostrar todos los datos
          break;
        }
      }
    }, error => {
        this.openSnackBar("Something went wrong", "Close" );

        })
  }
  deleteThisResource(id: number) {
    this.selectedResourceIds = [id];
    this.resourceService.deleteResourse(this.selectedResourceIds).subscribe((res) => {
      switch (res) {
        case 200: {
          this.openSnackBar(this.translate.instant('MENUITEMS.RESOURCESNACK.RESDEL'), "Close");
          
          const deletedResource = this.resourcesList.find(resource => resource.id === id);

          if (deletedResource && this.currentUser?.role === 'Admin') {
            let notification = new Notificaction({
              type: 'Resource Deletion',
              message: `The resource titled '${deletedResource.title}' has been deleted by an admin.`,
              email: (deletedResource.specialist as any).username
            });
            this.emailNotification.emailNotificate(notification).subscribe();
          }
        
          this.resourcesList = this.resourcesList.filter(resource => !this.selectedResourceIds.includes(resource.id));
          this.originalResourcesList = [...this.resourcesList]
          this.selectedResourceIds = [];
          // Restablecer la tabla para mostrar todos los datos
          break;
        }
      }
    }, error => {
      this.openSnackBar(this.translate.instant('MENUITEMS.RESOURCESNACK.ERROR'), "Close");

    })
  }
  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'end'})
  }

  OnPageChange(event: PageEvent){
    // console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.resourcesList.length){
      endIndex = this.resourcesList.length;
    }
    this.pageSlice = this.resourcesList.slice(startIndex,endIndex);
  }

}


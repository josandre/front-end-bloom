import { Component, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('paginator') paginator: MatPaginator;
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

  public loadData() {
    this.loading = true

    this.resourceService.getResourceList().subscribe(
      resources =>{
        this.loading=false
        this.resourcesList = resources;
        console.log("resouces init", this.resourcesList)
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
      this.resourcesList = [...this.originalResourcesList];
    }
    this.pageSlice = this.resourcesList.slice(0,this.paginator.pageSize);
    this.loading = false;
  }

  readResourceCheck(id: number) {
    const index = this.selectedResourceIds.indexOf(id);
    if (index === -1) {
      this.selectedResourceIds.push(id);
    } else {
      this.selectedResourceIds.splice(index, 1);
    }
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
          this.pageSlice = this.resourcesList.slice(0,this.paginator.pageSize);

          this.selectedResourceIds = [];
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
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.resourcesList.length){
      endIndex = this.resourcesList.length;
    }
    this.pageSlice = this.resourcesList.slice(startIndex,endIndex);
  }

}


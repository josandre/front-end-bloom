import { Component,  OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Patient } from './models/patient.model';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { SelectionModel } from '@angular/cdk/collections';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';

import {PatientService} from "./service/patient.service";
import {MatTableDataSource} from "@angular/material/table";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-allpatients',
  templateUrl: './allpatients.component.html',
  styleUrls: ['./allpatients.component.scss'],
})
export class AllpatientsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'id',
    'lastName',
    'name',
    'username',
    'actions'
  ];

  dataSource: MatTableDataSource<Patient> = new MatTableDataSource<Patient>([]);

  loading: boolean = false
  selection = new SelectionModel<Patient>(true, []);
  index?: number;
  id?: number;
  patient?: Patient;
  public pageSlice = this.dataSource.filteredData.slice(0,5);
  constructor(
    private snackBar: MatSnackBar,
    public patientService: PatientService,
    private translate: TranslateService,
    private paginatorIntl: MatPaginatorIntl

  ) {
    super();
    this.paginatorIntl.itemsPerPageLabel = '';
  }
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.loading = true
    this.patientService.getAllPatients().subscribe({
      next: (patients) => {
        patients.forEach(patient => {
          patient.name = this.maskName(patient.name);
        })
        this.dataSource = new MatTableDataSource<Patient>(patients)
        this.pageSlice = this.dataSource.filteredData.slice(0,5);
        this.loading = false
      },
      error: (error) => {}
    });
  }

  applyFilter(filterValue: any) {
   let filterText: string = filterValue.value
    filterText = filterText.trim();
    filterText = filterText.toLowerCase()
   this.dataSource.filter = filterText;
  }


  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        Name: x.userName,
        Id: x.id,
      }));
    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  setState(row: Patient){
    row.active = !row.active
      this.patientService.changeState(row.id).subscribe(() => {
          this.openSnackBar('ADMIN_SNACKBAR.PATIENT_SUCCESS','ADMIN_SNACKBAR.CLOSE' )
      }, () => {
        this.openSnackBar('ADMIN_SNACKBAR.SERVER_ERROR','ADMIN_SNACKBAR.CLOSE')
      })
  }

  openSnackBar(message: string, action: string) {
    this.translate.get([message,action]).subscribe((translations: any) => {
      this.snackBar.open(translations[message], translations[action], { verticalPosition: 'top', horizontalPosition: 'end',duration: 4000 })
    });
  }

  private maskName(name: string): string {
    return name.replace(/./g, '*');
  }

  OnPageChange(event: PageEvent){
    // console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.dataSource.filteredData.length){
      endIndex = this.dataSource.filteredData.length;
    }
    this.pageSlice = this.dataSource.filteredData.slice(startIndex,endIndex);
  }
}




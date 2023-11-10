import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Doctor } from '../model/Doctor';
import { DataSource } from '@angular/cdk/collections';
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
import { formatDate } from '@angular/common';
import { DoctorService } from '../service/doctor.service';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-alldoctors',
  templateUrl: './alldoctors.component.html',
  styleUrls: ['./alldoctors.component.scss'],
})
export class AlldoctorsComponent
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

  dataSource: MatTableDataSource<Doctor> = new MatTableDataSource<Doctor>([]);
  loading: boolean = false
  selection = new SelectionModel<Doctor>(true, []);
  index?: number;
  id?: number;
  doctor?: Doctor;
  constructor(
    private snackBar: MatSnackBar,
    public doctorService: DoctorService,
  ) {
    super();
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
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors) => {
        this.dataSource = new MatTableDataSource<Doctor>(doctors)
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

  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
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

  setState(row: Doctor){
    row.active = !row.active
      this.doctorService.changeState(row.id).subscribe(() => {
          this.openSnackBar("Doctor state changed", "Close")
      }, () => {
        this.openSnackBar("Server error", "Close")
      })
  }

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'end'})
  }
}

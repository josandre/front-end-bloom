import { Component,  OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
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
  constructor(
    private snackBar: MatSnackBar,
    public patientService: PatientService,
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
    this.patientService.getAllPatients().subscribe({
      next: (patients) => {
        patients.forEach(patient => {
          patient.name = this.maskName(patient.name);
        })
        this.dataSource = new MatTableDataSource<Patient>(patients)
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
          this.openSnackBar("Patient state changed", "Close")
      }, () => {
        this.openSnackBar("Server error", "Close")
      })
  }

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'end'})
  }

  private maskName(name: string): string {
    return name.replace(/./g, '*');
  }
}




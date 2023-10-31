import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './department-list/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './department-list/dialog/delete/delete.component';
import { DepartmentListService } from './department-list/department-list.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    DepartmentListComponent,
    AddDepartmentComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DepartmentsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [DepartmentListService],
})
export class DepartmentsModule {}

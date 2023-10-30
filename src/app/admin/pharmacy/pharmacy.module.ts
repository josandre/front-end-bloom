import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './medicine-list/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './medicine-list/dialog/delete/delete.component';
import { MedicineListService } from './medicine-list/medicine-list.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    MedicineListComponent,
    AddMedicineComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    PharmacyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [MedicineListService],
})
export class PharmacyModule {}

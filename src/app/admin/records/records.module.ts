import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsRoutingModule } from './records-routing.module';
import { BirthComponent } from './birth/birth.component';
import { DeathComponent } from './death/death.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './birth/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './birth/dialog/delete/delete.component';
import { FormDialogComponent as DeathFormDialog } from './death/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent as DeathDeleteDialog } from './death/dialog/delete/delete.component';
import { BirthService } from './birth/birth.service';
import { DeathService } from './death/death.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    BirthComponent,
    DeathComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    DeathFormDialog,
    DeathDeleteDialog,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecordsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [BirthService, DeathService],
})
export class RecordsModule {}

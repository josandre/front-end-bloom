import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomRoutingModule } from './room-routing.module';
import { AllroomComponent } from './allroom/allroom.component';
import { DeleteDialogComponent } from './allroom/dialog/delete/delete.component';
import { FormDialogComponent } from './allroom/dialog/form-dialog/form-dialog.component';
import { EditAllotmentComponent } from './edit-allotment/edit-allotment.component';
import { AddAllotmentComponent } from './add-allotment/add-allotment.component';
import { RoomService } from './allroom/room.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    AllroomComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    EditAllotmentComponent,
    AddAllotmentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoomRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [RoomService],
})
export class RoomModule {}

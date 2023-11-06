import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { AlldoctorsComponent } from './alldoctors/alldoctors.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    AlldoctorsComponent,
    AddDoctorComponent,
    EditDoctorComponent,
    DoctorProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DoctorsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [],
})
export class DoctorsModule {}

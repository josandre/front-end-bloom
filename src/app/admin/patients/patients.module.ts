import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientsRoutingModule } from './patients-routing.module';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AllpatientsComponent } from './allpatients/allpatients.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { DeleteComponent } from './allpatients/dialog/delete/delete.component';
import { FormDialogComponent } from './allpatients/dialog/form-dialog/form-dialog.component';
import { PatientService } from './allpatients/patient.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    AddPatientComponent,
    AllpatientsComponent,
    EditPatientComponent,
    PatientProfileComponent,
    DeleteComponent,
    FormDialogComponent,
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [PatientService],
})
export class PatientsModule {}

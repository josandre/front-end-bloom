import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TranslateModule } from '@ngx-translate/core'; 
import { AppointmentsComponent } from './appointments/appointments.component';
import { FormComponent } from './appointments/form/form.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { SettingsComponent } from './settings/settings.component';
import { AppointmentsService } from './appointments/appointments.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import {SignupPatientComponent} from "./patients/signupPatient/signup-patient.component";
import { ProfileComponent } from './patients/medicalrecord/profile.component';
import { MedicalhistoryDialogComponent } from './patients/medicalrecord/medicalhistory-dialog/medicalhistory-dialog.component';
import { DeleteMedicalhistoryDialogComponent } from './patients/medicalrecord/delete-medicalhistory-dialog/delete-medicalhistory-dialog.component';


@NgModule({
  declarations: [
    SignupPatientComponent,
    DashboardComponent,
    AppointmentsComponent,
    FormComponent,
    DoctorsComponent,
    PatientsComponent,
    SettingsComponent,
    ProfileComponent,
    MedicalhistoryDialogComponent,
    DeleteMedicalhistoryDialogComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatIconModule,
    NgApexchartsModule,
    NgScrollbarModule,
    DragDropModule,
    ComponentsModule,
    SharedModule,
    TranslateModule,
  ],
  providers: [AppointmentsService],
})
export class DoctorModule {}

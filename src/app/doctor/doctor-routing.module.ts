import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { SettingsComponent } from './settings/settings.component';
import {SignupPatientComponent} from "./patients/signupPatient/signup-patient.component";
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { ProfileComponent } from './patients/medicalrecord/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
  },
  {
    path: 'patients',
    component: PatientsComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'patient',
    component: SignupPatientComponent,
  },
  {
    path: 'doctor-profile',
    component: DoctorProfileComponent,
  },
  {  
    path: 'medical-record/:id',
    component: ProfileComponent

  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}

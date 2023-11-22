import { Page404Component } from "./../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PrescriptionsComponent } from "./prescriptions/prescriptions.component";
import { MedicalRecordsComponent } from "./medical-records/medical-records.component";
import { BillingComponent } from "./billing/billing.component";
import { SettingsComponent } from "./settings/settings.component";
import { PatientProfileComponent } from "./patient-profile/patient-profile.component";
import { EntryComponent } from "./entry-diary/entry.component";
import { ModalComponent } from "./modal/modal.component";
import { DialogformComponent } from "./modal/dialogform/dialogform.component";
import {DiaryComponent} from "./diary/diary.component";
const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "appointments",
    loadChildren: () =>
      import("./appointments/appointments.module").then(
        (m) => m.AppointmentsModule
      ),
  },
  {
    path: "prescriptions",
    component: PrescriptionsComponent,
  },
  {
    path: "records",
    component: MedicalRecordsComponent,
  },
  {
    path: "billing",
    component: BillingComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
  {
    path: "patient-profile",
    component: PatientProfileComponent,
  },
  {
    path: "diary",
    component: DiaryComponent,
  },
  {
    path: "modal",
    component: ModalComponent,
  },
  {
    path: "dialogform",
    component: DialogformComponent,
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}

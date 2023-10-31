import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { UpcomingAppointmentComponent } from './upcoming-appointment/upcoming-appointment.component';
import { DeleteDialogComponent } from './upcoming-appointment/dialogs/delete/delete.component';
import { FormDialogComponent } from './upcoming-appointment/dialogs/form-dialog/form-dialog.component';
import { PastAppointmentComponent } from './past-appointment/past-appointment.component';
import { PastDeleteDialogComponent } from './past-appointment/dialogs/delete/delete.component';
import { TodayAppointmentComponent } from './today-appointment/today-appointment.component';
import { DeleteComponent } from './today-appointment/dialogs/delete/delete.component';
import { UpcomingAppointmentService } from './upcoming-appointment/upcoming-appointment.service';
import { PastAppointmentService } from './past-appointment/past-appointment.service';
import { ComponentsModule } from '@shared/components/components.module';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [
    UpcomingAppointmentComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    PastAppointmentComponent,
    PastDeleteDialogComponent,
    TodayAppointmentComponent,
    DeleteComponent,
    BookAppointmentComponent,
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [UpcomingAppointmentService, PastAppointmentService],
})
export class AppointmentsModule {}

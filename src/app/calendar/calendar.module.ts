import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarRoutingModule } from './calendar-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { CalendarComponent } from './calendar.component';
import { FormDialogComponent as calFormComponent } from './dialogs/form-dialog/form-dialog.component';
import { CalendarService } from './calendar.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ComponentsModule,
    SharedModule,
  ],
  declarations: [CalendarComponent, calFormComponent],
  providers: [CalendarService],
})
export class CalendarsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { AlldoctorsComponent } from './alldoctors/alldoctors.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { TranslateModule } from '@ngx-translate/core';
import {SpinnerModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AlldoctorsComponent,
    AddDoctorComponent,
    EditDoctorComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DoctorsRoutingModule,
        ComponentsModule,
        SharedModule,
        TranslateModule,
        SpinnerModule,
    ],
  providers: [],
})
export class DoctorsModule {}

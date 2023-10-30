import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { EditorsComponent } from './editors/editors.component';
import { FormExamplesComponent } from './form-examples/form-examples.component';
import { FormValidationsComponent } from './form-validations/form-validations.component';
import { WizardComponent } from './wizard/wizard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { AdvanceControlsComponent } from './advance-controls/advance-controls.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxMaskModule } from 'ngx-mask';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    EditorsComponent,
    FormExamplesComponent,
    FormValidationsComponent,
    WizardComponent,
    FormControlsComponent,
    AdvanceControlsComponent,
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaskModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [],
})
export class FormModule {}

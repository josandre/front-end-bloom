import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvanceTableRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { FormComponent as contactForm } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { ContactsService } from './contacts.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [ContactsComponent, contactForm, DeleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdvanceTableRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [ContactsService],
})
export class ContactsModule {}

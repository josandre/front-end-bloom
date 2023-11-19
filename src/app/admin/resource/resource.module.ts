import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResourceRoutingModule } from './resource-routing.module';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { ResourceComponent } from './resource.component';

@NgModule({
  declarations: [
   ResourceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ResourceRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [],
})
export class ResourceModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { PublicRoutingModule } from './public-routing.module';
import { LandingComponent } from './landing/landing.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { FooterComponent } from './public-layout/footer/footer.component';
import { HeaderComponent } from './public-layout/header/header.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LandingComponent,
    PublicLayoutComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    CarouselModule,
    MatIconModule,
    PublicRoutingModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class PublicModule { }

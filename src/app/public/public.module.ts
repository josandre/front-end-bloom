import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LandingComponent } from './landing/landing.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { FooterComponent } from './public-layout/footer/footer.component';
import { HeaderComponent } from './public-layout/header/header.component';


@NgModule({
  declarations: [
    LandingComponent,
    PublicLayoutComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    PublicRoutingModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class PublicModule { }

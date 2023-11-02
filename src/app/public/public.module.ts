import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LandingComponent } from './landing/landing.component';

import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    PublicRoutingModule,
  ]
})
export class PublicModule { }

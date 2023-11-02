import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './public-layout/public-layout.component'; // Asegúrate de importar el PublicLayoutComponent
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent, 
    children: [
      { path: '', component: LandingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

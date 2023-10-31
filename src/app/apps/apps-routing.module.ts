import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ContactGridComponent } from './contact-grid/contact-grid.component';
import { SupportComponent } from './support/support.component';
import { Page404Component } from '../authentication/page404/page404.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
const routes: Routes = [
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'contact-grid',
    component: ContactGridComponent,
  },
  {
    path: 'support',
    component: SupportComponent,
  },
  {
    path: 'dragdrop',
    component: DragDropComponent,
  },
  { path: '**', component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppsRoutingModule {}

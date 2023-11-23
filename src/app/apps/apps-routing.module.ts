import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ContactGridComponent } from './contact-grid/contact-grid.component';
import { SupportComponent } from './support/support.component';
import { Page404Component } from '../authentication/page404/page404.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { ForumComponent } from './forum/forum.component';
import { GamesSectionComponent } from './games/games-section/games-section.component';
import { MemoryGameComponent } from './games/memory-game/memory-game.component';
import { PuzzleGameComponent } from './games/puzzle-game/puzzle-game.component';

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
  {
    path: 'forum',
    component: ForumComponent
  },
  ///////////////////
  // Games Section //
  ///////////////////
  {
    path: 'games-section',
    component: GamesSectionComponent
  },
  {
    path: 'memory-game',
    component: MemoryGameComponent
  },
  {
    path: 'puzzle-game',
    component: PuzzleGameComponent
  },
  ///////////////////
  { path: '**', component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppsRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppsRoutingModule } from './apps-routing.module';
import { ChatComponent } from './chat/chat.component';
import { ContactGridComponent } from './contact-grid/contact-grid.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { SupportComponent } from './support/support.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { ForumComponent } from './forum/forum.component';
import { CommentComponent } from './forum/comment/comment.component';
import { PostPreviewComponent } from './forum/post-preview/post-preview.component';
import { PostEditorComponent } from './forum/post-editor/post-editor.component';
import { CommentEditorComponent } from './forum/comment-editor/comment-editor.component';
import { LoadingCardComponent } from './forum/loading-card/loading-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { GamesSectionComponent } from './games/games-section/games-section.component';
import { MemoryCardComponent } from './games/memory-game/memory-card/memory-card.component';
import { MemoryGameComponent } from './games/memory-game/memory-game.component';
import { PuzzleGameBackgroundOptionComponent } from './games/puzzle-game/puzzle-game-background-option/puzzle-game-background-option.component';
import { PuzzleGameTileComponent } from './games/puzzle-game/puzzle-game-tile/puzzle-game-tile.component';
import { PuzzleGameComponent } from './games/puzzle-game/puzzle-game.component';
import { ScoresListComponent } from './games/scores-list/scores-list.component';
import {SpinnerModule} from "../components/components.module";

@NgModule({
  declarations: [
    ChatComponent,
    DragDropComponent,
    ContactGridComponent,
    SupportComponent,
    ForumComponent,
    CommentComponent,
    PostPreviewComponent,
    PostEditorComponent,
    CommentEditorComponent,
    LoadingCardComponent,
    GamesSectionComponent,
    MemoryCardComponent,
    MemoryGameComponent,
    PuzzleGameBackgroundOptionComponent,
    PuzzleGameTileComponent,
    PuzzleGameComponent,
    ScoresListComponent
  ],
    imports: [
        CommonModule,
        AppsRoutingModule,
        DragDropModule,
        FormsModule,
        NgScrollbarModule,
        ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        ComponentsModule,
        SharedModule,
        TranslateModule,
        SpinnerModule,
    ],
  exports: [ForumComponent]
})
export class AppsModule {}

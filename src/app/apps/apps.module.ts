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
    TranslateModule
  ],
  exports: [ForumComponent]
})
export class AppsModule {}

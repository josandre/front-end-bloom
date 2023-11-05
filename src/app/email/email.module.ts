import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailRoutingModule } from './email-routing.module';
import { ComposeComponent } from './compose/compose.component';
import { InboxComponent } from './inbox/inbox.component';
import { ReadMailComponent } from './read-mail/read-mail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgScrollbarModule} from "ngx-scrollbar";
@NgModule({
  declarations: [ComposeComponent, InboxComponent, ReadMailComponent],
    imports: [
        CommonModule,
        EmailRoutingModule,
        CKEditorModule,
        ComponentsModule,
        SharedModule,
        DragDropModule,
        NgApexchartsModule,
        NgScrollbarModule,
    ],
})
export class EmailModule {}

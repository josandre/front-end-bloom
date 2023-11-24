import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceRoutingModule } from './resource-routing.module';
import { ComposeResourceComponent } from './compose/compose.component';
import { MyResourcesComponent } from './myResources/myResources.component';
import { ReadResourceComponent } from './read-resource/read-resource.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgScrollbarModule} from "ngx-scrollbar";
import {UiModule} from "../ui/ui.module";
import { ModifyComponent } from './modify/modify.component';
import { UserResourcesListComponent } from './user-resources-list/user-resources-list.component';
import {TranslateModule} from "@ngx-translate/core";
import {SpinnerModule} from "../components/components.module";
@NgModule({
  declarations: [ComposeResourceComponent, MyResourcesComponent, ReadResourceComponent, ModifyComponent, UserResourcesListComponent],
    imports: [
        CommonModule,
        ResourceRoutingModule,
        CKEditorModule,
        ComponentsModule,
        SharedModule,
        DragDropModule,
        NgApexchartsModule,
        NgScrollbarModule,
        UiModule,
        TranslateModule,
        SpinnerModule,
    ],
})
export class ResourceModule {}

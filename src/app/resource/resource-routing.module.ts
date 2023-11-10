import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyResourcesComponent } from "./myResources/myResources.component";
import { ComposeResourceComponent } from "./compose/compose.component";
import { ReadResourceComponent } from "./read-resource/read-resource.component";
import { ModifyComponent } from "./modify/modify.component";
const routes: Routes = [
  {
    path: "my-resources",
    component: MyResourcesComponent,
  },
  {
    path: "compose",
    component: ComposeResourceComponent,
  },
  {
    path: "read-resource",
    component: ReadResourceComponent,
  },
  {
    path: "modify",
    component:ModifyComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceRoutingModule {}

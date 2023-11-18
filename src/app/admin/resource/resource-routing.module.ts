import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ResourceComponent } from "./resource.component";
import { Page404Component } from "./../../authentication/page404/page404.component";
const routes: Routes = [
  {
    path: "resource",
    component: ResourceComponent,
  },
  
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceRoutingModule {}

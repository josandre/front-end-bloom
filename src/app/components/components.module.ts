import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {SharedModule} from "@shared";
import {SpinnerComponent} from "./spinner/spinner.component";
import {WinkComponent} from "./wink/wink.component";

@NgModule({
  declarations: [
    SpinnerComponent,
    WinkComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    SpinnerComponent,
    WinkComponent
  ]
})
export class SpinnerModule {}

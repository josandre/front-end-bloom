import {Component, Input} from "@angular/core";

@Component({
  selector: "app-wink",
  templateUrl:"wink.component.html",
  styleUrls:["wink.component.css"]
})
export class WinkComponent{

  @Input()
  message: string

  constructor() {}
}

import {EventCategory} from "../../../global/models/eventcategory";

export class SystemNotification {
  title: string;
  date: Date;
  details: string;
  category: EventCategory;

  constructor(partial?: Partial<SystemNotification>) {
    if(partial){
      Object.assign(this, partial)
    }
  }

}

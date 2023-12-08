import {EventCategoryEnum} from "../../../calendar/model/event-category-enum";

export class SystemNotification {
  id: number;
  title: string;
  startDate: Date;
  details: string;
  category: EventCategoryEnum;
  status: boolean

  constructor(partial?: Partial<SystemNotification>) {
    if(partial){
      Object.assign(this, partial)
    }
  }

}

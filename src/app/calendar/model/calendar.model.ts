import {EventCategory} from "../../global/models/eventcategory";
import {NotificationTimeEnum} from "./NotificationTimeEnum";

export class CalendarEvent {
  id: string;
  title: string;
  category: EventCategory;
  startDate: Date;
  endDate: Date;
  details: string;
  className: string | undefined;
  time: Number;
  notificationTime: NotificationTimeEnum;

  constructor(partial?: Partial<CalendarEvent>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

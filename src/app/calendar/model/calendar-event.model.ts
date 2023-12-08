import {EventCategoryEnum} from "./event-category-enum";
import {NotificationTimeEnum} from "./NotificationTimeEnum";

export class CalendarEvent {
  id: string;
  title: string;
  category: EventCategoryEnum;
  startDate: Date;
  endDate: Date;
  details: string;
  className: string | undefined;
  time: number;
  notificationTime: NotificationTimeEnum;

  constructor(partial?: Partial<CalendarEvent>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

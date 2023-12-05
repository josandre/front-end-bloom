import {EventCategory} from "./eventcategory";

export class CalendarEvent {
  id: string;
  title: string;
  category: EventCategory;
  startDate: Date;
  endDate: Date;
  details: string;
  className: string | undefined;

  constructor(partial?: Partial<CalendarEvent>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

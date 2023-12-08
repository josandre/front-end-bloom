import {RealTimeEventTypeEnum} from "./RealTimeEventTypeEnum";
import {Message} from "../../apps/chat/models/Message";
import {CalendarEvent} from "../../calendar/model/calendar.model";

export class RealTimeEvent{
  type: RealTimeEventTypeEnum;
  data: Message | CalendarEvent;

  constructor(partial?: Partial<RealTimeEvent>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

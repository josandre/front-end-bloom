import {SystemNotification} from "./SystemNotification";

export class NotificationResponse{
  statusCode: string;
  status: string;
  list: Array<SystemNotification>;

  constructor(partial?:Partial<NotificationResponse>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

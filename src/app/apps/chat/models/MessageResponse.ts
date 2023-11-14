
import {Message} from "./Message";

export class MessageResponse{
  statusCode: string;
  status: string;
  list: Array<Message>;

  constructor(partial?:Partial<MessageResponse>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

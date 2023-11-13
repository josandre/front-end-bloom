import {Conversation} from "./Conversation";


export class ConversationResponse{
  statusCode: string;
  status: string;
  list: Array<Conversation>;

  constructor(partial?:Partial<ConversationResponse>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

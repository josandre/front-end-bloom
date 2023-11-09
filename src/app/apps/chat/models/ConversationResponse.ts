import {Conversation} from "./Conversation";


export class ConversationResponse{
  statusCode: string;
  status: string;
  conversationList: Array<Conversation>;

  constructor(partial?:Partial<ConversationResponse>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

import {Conversation} from "./Conversation";

export class Message{
  conversationId: number;
  senderId: number;
  receiverId: number;
  date: Date;
  message: String;
  senderName: String;

  constructor(partial?: Partial<Message>) {
    if(partial) {
      Object.assign(this, partial)
    }
  }

}

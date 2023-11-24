import {Injectable} from "@angular/core";
import {Message} from "../models/Message";
import {AuthService} from "@core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService{
  private websocket : WebSocket;
  private readonly chatMessages: Map<number, Message[]> = new Map<number, Message[]>();

  messageReceived$: Subject<MessageReceivedNotification> = new Subject<MessageReceivedNotification>();

  constructor(private readonly authService: AuthService) {}

  addConversationsIntoDict(conversationId: number, messages: Message[]) {
    this.chatMessages.set(conversationId, messages)
  }

  getConversationMessages(conversationId: number): Message[] | undefined {
    return this.chatMessages.get(conversationId);
  }

  public openWebSocket() {
    const currentUser = this.authService.currentUserValue
    const userId = currentUser.actualUserId ?? currentUser.id
    this.websocket = new WebSocket(`ws://3.144.162.224:8080/chat?id=${userId}`)

    this.websocket.onopen = (event)=> {
      console.log('open', event)
    }

    this.websocket.onmessage = (event)=> {
      const message = JSON.parse(event.data);

      const existingMessages = this.chatMessages.get(message.conversationId) ?? [];
      this.chatMessages.set(message.conversationId, [...existingMessages, message])

      const messageReceivedNotification = {
        conversationId: message.conversationId,
        messages: this.getConversationMessages(message.conversationId) ?? []
      }

      // Notify to subscribers that I got new message
      console.log("NOTIFICANDO")
      this.messageReceived$.next(messageReceivedNotification)
    }

    this.websocket.onclose = (event) => {
      console.log('close', event)
    }
  }

  public sendMessage(message: Message){
    const currentUser = this.authService.currentUserValue
    message.senderId = currentUser.actualUserId ?? currentUser.id

    this.websocket.send(JSON.stringify(message))
  }

  public closeWebSocket(){
    this.websocket.close()
  }
}

interface MessageReceivedNotification {
  conversationId: number,
  messages: Message[]
}

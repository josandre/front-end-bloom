import {Injectable} from "@angular/core";
import {Message} from "../../apps/chat/models/Message";
import {AuthService} from "@core";
import {Subject} from "rxjs";
import {RealTimeEvent} from "../models/RealTimeEvent";


@Injectable({
  providedIn: 'root'
})

export class WebSocketService{
  private websocket : WebSocket;


  private readonly chatMessages: Map<number, Message[]> = new Map<number, Message[]>();

  messageReceived$: Subject<MessageReceivedNotification> = new Subject<MessageReceivedNotification>();

  constructor(private readonly authService: AuthService) {
    this.openWebSocket();
  }

  addConversationsIntoDict(conversationId: number, messages: Message[]) {
    this.chatMessages.set(conversationId, messages)
  }

  getConversationMessages(conversationId: number): Message[] | undefined {
    return this.chatMessages.get(conversationId);
  }

  private openWebSocket() {
    const currentUser = this.authService.currentUserValue
    const userId = currentUser.actualUserId ?? currentUser.id
    this.websocket = new WebSocket(`ws://localhost:8080/app?id=${userId}`)

    this.websocket.onopen = (event)=> {
      console.log('open', event)
    }

    this.websocket.onmessage = (event)=> {
      console.log(event)
      const eventData = JSON.parse(event.data);
      const message = eventData.data;
      console.log(message)

      const existingMessages = this.chatMessages.get(message.conversationId) ?? [];
      this.chatMessages.set(message.conversationId, [...existingMessages, message])

      const messageReceivedNotification = {
        conversationId: message.conversationId,
        messages: this.getConversationMessages(message.conversationId) ?? []
      }

      // Notify to subscribers that I got new message

      this.messageReceived$.next(messageReceivedNotification)
    }

    this.websocket.onclose = (event) => {
      console.log('close', event)
    }
  }

  public sendMessage(realTimeEventData: RealTimeEvent){
    const currentUser = this.authService.currentUserValue

    if(realTimeEventData.data instanceof Message){
      realTimeEventData.data.senderId = currentUser.actualUserId ?? currentUser.id
    }

    console.log("data", realTimeEventData)
    this.websocket.send(JSON.stringify(realTimeEventData))
  }

  public closeWebSocket(){
    this.websocket.close()
  }
}

interface MessageReceivedNotification {
  conversationId: number,
  messages: Message[]
}

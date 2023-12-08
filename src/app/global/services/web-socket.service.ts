import {Injectable} from "@angular/core";
import {Message} from "../../apps/chat/models/Message";
import {AuthService} from "@core";
import {Subject} from "rxjs";
import {RealTimeEvent} from "../models/RealTimeEvent";
import {RealTimeEventTypeEnum} from "../models/RealTimeEventTypeEnum";
import {SystemNotification} from "../../layout/header/models/SystemNotification";


@Injectable({
  providedIn: 'root'
})

export class WebSocketService{
  private websocket : WebSocket;

  private readonly chatMessages: Map<number, Message[]> = new Map<number, Message[]>();

  private readonly notifications : Set<SystemNotification> = new Set<SystemNotification>();

  messageReceived$: Subject<MessageReceivedNotification> = new Subject<MessageReceivedNotification>();

  notificationReceived$: Subject<Set<SystemNotification>> = new Subject<Set<SystemNotification>>();

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
      console.log("event", event)
      const eventData = JSON.parse(event.data);
      const type = eventData.type;


      if(type == RealTimeEventTypeEnum.CHAT){
        const message = eventData.data;
        console.log("message", message)
        const existingMessages = this.chatMessages.get(message.conversationId) ?? [];
        this.chatMessages.set(message.conversationId, [...existingMessages, message])
        const messageReceivedNotification = {
          conversationId: message.conversationId,
          messages: this.getConversationMessages(message.conversationId) ?? []
        }

        this.messageReceived$.next(messageReceivedNotification)
      }

      if(type == RealTimeEventTypeEnum.NOTIFICATION){
        const notification = eventData.data;
        console.log("notification", notification)
        this.notifications.add(notification)
        console.log("list", this.notifications);
        this.notificationReceived$.next(this.notifications);
      }

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

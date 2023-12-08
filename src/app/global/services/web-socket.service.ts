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

  messageReceived$: Subject<MessageReceivedNotification> = new Subject<MessageReceivedNotification>();

  notificationReceived$: Subject<SystemNotification> = new Subject<SystemNotification>();

  constructor(private readonly authService: AuthService) {
  }

  addConversationsIntoDict(conversationId: number, messages: Message[]) {
    this.chatMessages.set(conversationId, messages)
  }

  getConversationMessages(conversationId: number): Message[] | undefined {
    return this.chatMessages.get(conversationId);
  }


  public openWebSocket() {
    const currentUser = this.authService.currentUserValue
    const userId = currentUser.actualUserId ?? currentUser.id

    this.websocket = new WebSocket(`ws://18.221.252.188:8080/app?id=${userId}`)


    this.websocket.onopen = (event)=> {
      console.log('open', event)
    }

    this.websocket.onmessage = (event)=> {
      const eventData = JSON.parse(event.data);
      const type = eventData.type;


      if(type == RealTimeEventTypeEnum.CHAT){
        const message = eventData.data;
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
        this.notificationReceived$.next(notification);
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

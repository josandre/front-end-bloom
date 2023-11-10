import {Injectable} from "@angular/core";
import {Message} from "../models/Message";
import {AuthService} from "@core";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService{
  websocket : WebSocket;
  chatMessages: Message[] = [];

  constructor(private readonly authService: AuthService) {}

  public openWebSocket() {
    const currentUser = this.authService.currentUserValue
    const userId = currentUser.actualUserId ?? currentUser.id
    this.websocket = new WebSocket(`ws://localhost:8080/chat?id=${userId}`)

    this.websocket.onopen = (event)=> {
      console.log('open', event)
    }

    this.websocket.onmessage = (event)=> {
      const message = JSON.parse(event.data);

      console.log(message, 'message ready to add')
      this.chatMessages.push(message)
      console.log("chat messages: ", this.chatMessages)
      //create message endpoint
    }

    this.websocket.onclose = (event) => {
      console.log('close', event)
    }
  }

  public sendMessage(message: Message){
    const currentUser = this.authService.currentUserValue
    message.senderId = currentUser.actualUserId ?? currentUser.id

    console.log("create message")
    console.log(message)
    this.websocket.send(JSON.stringify(message))
  }

  public closeWebSocket(){
    this.websocket.close()
  }
}

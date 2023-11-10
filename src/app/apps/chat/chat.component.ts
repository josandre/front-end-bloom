import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Conversation} from "./models/Conversation";
import {ConversationService} from "./services/conversation.service";
import {WebSocketService} from "./services/web-socket.service";
import {Message} from "./models/Message";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy{
  hideRequiredControl = new FormControl(false);
  conversations : Array<Conversation>
  isLoading : boolean = true;
  authForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private readonly conversationService: ConversationService, public webSocketService: WebSocketService) {}


  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      message: new FormControl("", {
        validators: [Validators.required],
        updateOn: "submit"
      }),
    })

    this.loadConversations()
    this.webSocketService.openWebSocket();

  }

  private loadConversations(){
    this.conversationService.getConversationsByUserId().subscribe((conversationResponse) => {
      this.conversations = conversationResponse.conversationList;
      this.isLoading = false;
    })
  }

  sendMessage(){
    console.log('click')
    console.log(this.authForm.valid)
    if(this.authForm.valid){
      const message = new Message({
        message: this.authForm.controls['message'].value,
        receiverId: 26 // change to selected chat
      })

      console.log(message)
      this.webSocketService.sendMessage(message);
    }


  }

  ngOnDestroy() {
    this.webSocketService.closeWebSocket()
  }



}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Conversation} from "./models/Conversation";
import {ConversationService} from "./services/conversation.service";
import {Message} from "./models/Message";
import {WebSocketService} from "./services/web-socket.service";
import {AuthService} from "@core";
import {MessageService} from "./services/message.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy{
  hideRequiredControl = new FormControl(false);
  conversations : Array<Conversation>
  conversationList: Array<Conversation>
  isLoading : boolean = true;
  authForm!: FormGroup;
  conversationSelected: Conversation
  messagesList : Array<Message> | undefined
  isConversationSelected: boolean = false;
  word= '';


  constructor(private readonly messageService: MessageService, private formBuilder: FormBuilder,private readonly conversationService: ConversationService, public webSocketService: WebSocketService, private readonly authService: AuthService) {}


  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      message: new FormControl("", {
        validators: [Validators.required],
        updateOn: "submit"
      }),
    })


    this.loadConversations()
    this.webSocketService.openWebSocket();

    this.webSocketService.messageReceived$
      .pipe(filter(m => this.conversationSelected && m.conversationId == this.conversationSelected.id))
      .subscribe((n) => {
        this.messagesList = n.messages;
    })
  }

  private loadConversations(){
    this.conversationService.getConversationsByUserId().subscribe((conversationResponse) => {
      this.conversations = conversationResponse.list;
      this.conversationList = this.conversations;
      this.isLoading = false;
    })
  }

  private loadMessages(){
    const messages = this.webSocketService.getConversationMessages(this.conversationSelected.id);

    if(!messages) {
      this.isLoading = true
      this.messageService.getMessagesByConversationId(this.conversationSelected.id).subscribe((response) => {
        this.webSocketService.addConversationsIntoDict(this.conversationSelected.id, response.list);
        this.messagesList = this.webSocketService.getConversationMessages(this.conversationSelected.id)
        this.isLoading = false
      })
    }else{
      this.messagesList = messages;
    }
  }


  sendMessage(){
    const userId = this.userInSystem();

    if(this.authForm.valid){
      const message = new Message({
        message: this.authForm.controls['message'].value,
        receiverId: this.conversationSelected.senderId === userId ? this.conversationSelected.receiverId : this.conversationSelected.senderId,
        conversationId: this.conversationSelected.id,
        senderName: this.authService.currentUserValue.firstName + " " + this.authService.currentUserValue.lastName,
        date: new Date()
      })

      this.webSocketService.sendMessage(message);
      this.authForm.controls['message'].setValue("")
    }

  }

  ngOnDestroy() {
    this.webSocketService.closeWebSocket()
  }

  getConversationInformation(conversation: Conversation){
    this.conversationSelected = conversation;
    this.isConversationSelected = true;
    conversation.newMessages = 0;
    this.loadMessages();
  }

  userInSystem(): number{
    const currentUser = this.authService.currentUserValue
    return currentUser.actualUserId ?? currentUser.id
  }

  getDate(value: any) {
    const date = new Date(value)
    const day = this.addZeroToNumber(date.getDate())
    const month = this.addZeroToNumber(date.getMonth() + 1)
    const year = date.getFullYear()
    const hour = this.addZeroToNumber(date.getHours())
    const mins = this.addZeroToNumber(date.getMinutes())


    return `${day}-${month}-${year} ${hour}:${mins}`
  }

  private addZeroToNumber(value: number): string
  {
    return value < 10 ? `0${value}` : value.toString()
  }

  filter(word: string){
    if(word == ''){
      this.conversations = this.conversationList;
    }else {
      this.conversations = this.conversations.filter((c) => {
        return c.name.toLowerCase().includes(word.toLowerCase()) || c.lastName.toLowerCase().includes(word.toLowerCase())
      })
    }
  }
}

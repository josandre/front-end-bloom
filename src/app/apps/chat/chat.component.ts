import {Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import {Conversation} from "./models/Conversation";
import {ConversationService} from "./services/conversation.service";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit{
  hideRequiredControl = new FormControl(false);
  conversations : Array<Conversation>
  isLoading : boolean = true;

  constructor(private readonly conversationService: ConversationService) {}


  ngOnInit(): void {
    this.loadConversations()
  }

  private loadConversations(){
    this.conversationService.getConversationsByUserId().subscribe((conversationResponse) => {
      this.conversations = conversationResponse.conversationList;
      console.log(this.conversations)
      this.isLoading = false;
    })
  }




}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@core';
import { ForumServiceService } from '../services/forum-service.service';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {
  postTitle:string;
  postContent:string;

  // User info
  currentUser?:any;
  
  constructor(
    private readonly authService:AuthService, 
    private readonly forumService:ForumServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    return;
  }

  savePost(): void {
    let newPost = {
      "title": this.postTitle,
      "experience": this.postContent,
      "user": {
        "id": this.currentUser?.id
      }
    }
    this.forumService.savePost(newPost).
    subscribe(
      response => {
        console.log(response);
        this.closeDialog();
      },
      error => {
        console.log(error);
      }
    );
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}

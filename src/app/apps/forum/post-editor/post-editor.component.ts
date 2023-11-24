import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForumServiceService } from '../services/forum-service.service';
import { ForumComponent } from '../forum.component';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {
  @Input() currentUserID:number;

  forumComponent:ForumComponent;
  postTitle:string;
  postContent:string;
  editorEnabled:boolean;
  
  constructor(
    private readonly forumService:ForumServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.editorEnabled = true;
    return;
  }

  savePost(): void {
    const newPost = {
      "title": this.postTitle,
      "experience": this.postContent,
      "user": {
        "id": this.currentUserID
      }
    }

    console.log(newPost);

    this.editorEnabled = false;
    this.forumComponent?.onWaitingResponse();
    this.closeDialog();

    this.forumService.savePost(newPost).
    subscribe(
      response => {
        this.forumComponent?.getPosts();
      },
      error => {
        this.editorEnabled = true;
      }
    );
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}

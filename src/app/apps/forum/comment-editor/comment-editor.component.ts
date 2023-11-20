import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForumServiceService } from '../services/forum-service.service';
import { ForumComponent } from '../forum.component';

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss']
})
export class CommentEditorComponent implements OnInit {
  forumComponent:ForumComponent;
  @Input() currentPostID:number;
  @Input() currentUserID:number;

  commentContent:string;
  editorEnabled:boolean;

  constructor(
    private readonly forumService:ForumServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.editorEnabled = true;
    return;
  }

  saveComment(): void {
    const newComment= {
      "content": this.commentContent,
      "post": {
        "id": this.currentPostID
      },
      "user": {
        "id": this.currentUserID
      }
    }

    this.editorEnabled = false;
    this.forumComponent?.onWaitingResponse();
    this.forumService.saveComment(newComment).
    subscribe(
      response => {
        console.log(response);
        this.closeDialog();
        this.forumComponent?.openPost(this.currentPostID);
      },
      error => {
        console.log(error);
        this.editorEnabled = true;
      }
    );
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}

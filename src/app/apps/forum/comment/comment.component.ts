import { Component, OnInit, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { ForumComponent } from '../forum.component';

import Swal from 'sweetalert2';
import { ForumServiceService } from '../services/forum-service.service';
import { TranslateService } from '@ngx-translate/core';
import { UploadFileService } from 'app/global/upload-file/upload-file.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() forumComponent:ForumComponent;
  @Input() commentID:number;
  @Input() showAdvancedOptions:boolean;
  @Input() userName:string;
  @Input() userImage:string;
  @Input() date:string;
  @Input() content:string;
  
  editingComment:boolean = false;
  commentEditorEnabled:boolean = false;
  commentEditorContent:string;

  constructor(private readonly forumService:ForumServiceService, 
              private readonly uploadFileService:UploadFileService,
              private readonly translate:TranslateService) { }

  ngOnInit(): void {
    this.date = formatDate(this.date, 'yyyy-MM-dd', 'en');
    return;
  }

  deleteComment(): void {
    Swal.fire({
      title: this.translate.instant('MENUITEMS.FORUMS.DELETE_CONFIRMATION_TITLE'),
      text: this.translate.instant('MENUITEMS.FORUMS.DELETE_CONFIRMATION_CONTENT'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#f44336',
      confirmButtonText: this.translate.instant('MENUITEMS.FORUMS.DELETE_CONFIRMATION'),
      cancelButtonText: this.translate.instant('MENUITEMS.FORUMS.CANCEL')
    }).then((result) => {

      if (result.value) {
        this.forumComponent?.onWaitingResponse();
        this.forumService.deleteComment(this.commentID).
        subscribe(
          response => {
            this.forumComponent?.openPost(this.forumComponent?.currentPost?.id);
          },
          error => {
            this.forumComponent?.openPost(this.forumComponent?.currentPost?.id);
          }
        );        
      }
    });    
  }

  editComment(): void {
    this.editingComment = true;  
    this.commentEditorEnabled = true;  
    this.commentEditorContent = this.content;
  }

  updateComment(): void {
    const updatedComment = {
      "id": this.commentID,
      "content": this.commentEditorContent
    }

    this.commentEditorEnabled = false;
    this.forumComponent?.onWaitingResponse();
    this.forumService.updateComment(updatedComment).
    subscribe(
      response => {
        this.forumComponent?.reloadPost();
      },
      error => {
        this.commentEditorEnabled = false;
      }
    );
  }

  closeCommentEditor(): void {
    this.editingComment = false;
    this.commentEditorEnabled = false;
    this.commentEditorContent = this.content;
  }

  getUserImageStyle() {
    return {
      backgroundImage: 'url(' + this.uploadFileService.getUserPhoto(this.userImage) + ')'
    };
  }
}

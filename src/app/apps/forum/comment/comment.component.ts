import { Component, OnInit, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { ForumComponent } from '../forum.component';

import Swal from 'sweetalert2';
import { ForumServiceService } from '../services/forum-service.service';
import { TranslateService } from '@ngx-translate/core';

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
  @Input() date:string;
  @Input() content:string;
  
  constructor(private readonly forumService:ForumServiceService, private readonly translate:TranslateService) { }

  ngOnInit(): void {
    this.date = formatDate(this.date, 'yyyy-MM-dd', 'en');
    return;
  }

  deleteComment() {
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
            console.log(response);
            this.forumComponent?.openPost(this.forumComponent?.currentPost?.id);
          },
          error => {
            console.log(error);
            this.forumComponent?.openPost(this.forumComponent?.currentPost?.id);
          }
        );        
        //Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });    
  }
}

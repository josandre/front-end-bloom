import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core';
import { ForumServiceService } from './services/forum-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { UploadFileService } from 'app/global/upload-file/upload-file.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  ForumStates = {
    ShowAllPosts: 0,
    OpenPost: 1,
    WaitingResponse: 2
  }

  posts?:any;
  postsLoaded:boolean = false;
  forumState: number = this.ForumStates.ShowAllPosts;

  currentPost?:any;
  postLoaded:boolean = false;
  postUserName:string;

  editingPost:boolean = false;
  postEditorEnabled:boolean = false;
  postEditorTitle:string;
  postEditorContent:string;

  // User info
  currentUser:any;
  currentUserID:number;
  message = 'MENUITEMS.FORUMS.MESSAGE'

  constructor(
    private readonly authService:AuthService,
    private readonly forumService:ForumServiceService,
    private readonly translate:TranslateService,
    private readonly uploadFileService:UploadFileService,
    private dialogModel: MatDialog
  ) { }

  ngOnInit(): void {
    // Get current user info
    this.currentUser = this.authService.currentUserValue;
    this.currentUserID = this.currentUser.actualUserId ?? this.currentUser.id;

    // Retrieve all the posts
    this.getPosts();
    return;
  }

  getPosts(): void {
    this.currentPost = undefined;
    this.postLoaded = false;

    this.postsLoaded = false;
    this.showPosts();
    this.forumService.getAllPosts()
    .subscribe(
      data => {
        this.posts = data;
        this.postsLoaded = true;
      },
      error => {
        this.posts = Array(0).fill(null);
        this.postsLoaded = true;
      }
    )
  }

  showAdvancedOptions(): boolean {
    let result = false;
    // Owner check
    if (this.currentPost?.userId === this.currentUserID) {
      result = true;
    }
    // Admin check
    if (this.currentUser?.role === 'Admin') {
      result = true;
    }

    return result;
  }

  openNewPostDialog(): void {
    const postDialog = this.dialogModel.open(PostEditorComponent, {width: '720px', height: '480px', disableClose: false})
    postDialog.componentInstance.currentUserID = this.currentUserID;
    postDialog.componentInstance.forumComponent = this;
  }

  openNewCommentDialog(): void {
    const commentDialog = this.dialogModel.open(CommentEditorComponent, {width: '720px', height: '480px', disableClose: false})
    commentDialog.componentInstance.currentPostID = this.currentPost.id;
    commentDialog.componentInstance.currentUserID = this.currentUserID;
    commentDialog.componentInstance.forumComponent = this;
  }

  deletePost(): void {
    if (this.currentPost === undefined) {
      return;
    }

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
        this.onWaitingResponse();
        this.forumService.deletePost(this.currentPost.id).
        subscribe(
          response => {
            this.getPosts();
          },
          error => {
            this.getPosts();
          }
        );
        //Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  openPost(postId: number): void {
    this.currentPost = undefined;
    this.postLoaded = false;
    this.closePostEditor();
    this.forumState = this.ForumStates.OpenPost;

    this.forumService.getPost(postId).
    subscribe(
      data => {
        this.currentPost = data;
        this.postUserName = this.currentPost?.title;
        this.postLoaded = true;

        this.postEditorTitle = this.currentPost.title;
        this.postEditorContent = this.currentPost.experience;
      },
      error => {}
    );
  }

  reloadPost(): void {
    if (!this.currentPost) {
      return;
    }

    this.openPost(this.currentPost.id);
  }

  editPost(): void {
    this.editingPost = true;
    this.postEditorEnabled = true;
  }

  updatePost(): void {
    if (!this.currentPost) {
      return;
    }

    const updatedPost = {
      "id": this.currentPost.id,
      "title": this.postEditorTitle,
      "experience": this.postEditorContent
    }

    this.postEditorEnabled = false;
    this.onWaitingResponse();
    this.forumService.updatePost(updatedPost).
    subscribe(
      response => {
        this.reloadPost();
      },
      error => {
        this.postEditorEnabled = true;
      }
    );
  }

  closePostEditor(): void {
    this.editingPost = false;
    this.postEditorEnabled = false;

    if (this.currentPost) {
      this.postEditorTitle = this.currentPost.title;
      this.postEditorContent = this.currentPost.experience;
    } else {
      this.postEditorTitle = '';
      this.postEditorContent = '';
    }
  }

  showPosts(): void {
    this.forumState = this.ForumStates.ShowAllPosts;
  }

  onWaitingResponse(): void {
    this.forumState = this.ForumStates.WaitingResponse;
  }

  getUserImageStyle() {
    return {
      backgroundImage: 'url(' + this.uploadFileService.getUserPhoto(this.currentPost?.userImage) + ')'
    };
  }
}

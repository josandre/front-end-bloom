import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core';
import { ForumServiceService } from './services/forum-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

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

  // User info
  currentUser?:any;

  constructor(
    private readonly authService:AuthService,
    private readonly forumService:ForumServiceService,
    private readonly translate:TranslateService,
    private dialogModel: MatDialog
  ) { }

  ngOnInit(): void {
    // Get current user info
    this.currentUser = this.authService.currentUserValue;

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
        console.log(data);
        this.posts = data;
        this.postsLoaded = true;
      },
      error => {
        console.log(error);
        this.posts = Array(0).fill(null);
        this.postsLoaded = true;
      }
    )
  }

  
  openNewPostDialog(): void {
    const postDialog = this.dialogModel.open(PostEditorComponent, {width: '720px', height: '480px', disableClose: false})
    postDialog.componentInstance.currentUserID = this.currentUser.id;
    postDialog.componentInstance.forumComponent = this;
  } 

  openNewCommentDialog(): void {
    const commentDialog = this.dialogModel.open(CommentEditorComponent, {width: '720px', height: '480px', disableClose: false})
    commentDialog.componentInstance.currentPostID = this.currentPost.id;
    commentDialog.componentInstance.currentUserID = this.currentUser.id;
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
            console.log(response);
            this.getPosts();
          },
          error => {
            console.log(error);
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
    this.forumState = this.ForumStates.OpenPost;

    this.forumService.getPost(postId).
    subscribe(
      data => {
        this.currentPost = data;
        this.postUserName = this.currentPost?.title;
        this.postLoaded = true;
        console.log(this.currentPost);
      },
      error => {
        console.log(error);
      }
    );
  }

  showPosts(): void {
    this.forumState = this.ForumStates.ShowAllPosts;
  }

  onWaitingResponse(): void {
    this.forumState = this.ForumStates.WaitingResponse;
  }
}

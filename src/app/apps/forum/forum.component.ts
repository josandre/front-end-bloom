import { Component, OnInit } from '@angular/core';
import { ForumServiceService } from './services/forum-service.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { PostEditorComponent } from './post-editor/post-editor.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  ForumStates = {
    ShowAllPosts: 0,
    OpenPost: 1
  }

  posts?:any;
  postsLoaded:boolean = false;
  forumState: number = this.ForumStates.ShowAllPosts;

  currentPost?:any;
  postLoaded:boolean = false;
  postUserName:string;

  constructor(
    private readonly forumService:ForumServiceService,
    private dialogModel: MatDialog
  ) { }

  ngOnInit(): void {
    // Retrieve all the posts
    this.getPosts();
    return;
  }

  getPosts(): void {
    this.postsLoaded = false;
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
    this.dialogModel.open(PostEditorComponent, {width: '720px', height: '480px', disableClose: false})
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
    console.log('Opening post: ' + postId);
  }

  showPosts(): void {
    this.forumState = this.ForumStates.ShowAllPosts;
  }
}

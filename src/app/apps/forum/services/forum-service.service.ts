import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../config';
import { AuthService } from "@core";

const POSTS_ENDPOINT:string = API_URL + '/posts';
const COMMENTS_ENDPOINT:string = API_URL + '/comments';

@Injectable({
  providedIn: 'root'
})
export class ForumServiceService {

  constructor(private http:HttpClient, private readonly authService: AuthService) { }

  /**
   * Use this function to get a list of all the posts available in the app
   * @returns a list of posts
   */
  getAllPosts() : Observable<any> {
    return this.http.get(`${POSTS_ENDPOINT}`, {headers: this.generateHeader()});
  }

  /**
   * Use this function to get all the info about a specific post
   * @param postID unique identifier for the post
   * @returns all the info about the post
   */
  getPost(postID:number) : Observable<any> {
    return this.http.get(`${POSTS_ENDPOINT}/${postID}`, {headers: this.generateHeader()});
  }

  /**
   * Use this function to create a new post for the forums section
   * @param data info about the post
   * @returns 
   */
  savePost(data:{title:string, experience:string, user:{id:number}}) : Observable<any> {
    return this.http.post(POSTS_ENDPOINT, data, {headers: this.generateHeader()});
  }

  /**
   * Used to generate the header that includes an authorization token
   * @returns Header that includes an authorization token
   */
  generateHeader() : HttpHeaders {
    return new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token);
  }
}

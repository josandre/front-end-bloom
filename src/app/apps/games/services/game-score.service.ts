import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../config';
import {AuthService} from "@core";

const GAME_SCORE_ENDPOINT:string = API_URL + '/game-score';

@Injectable({
  providedIn: 'root'
})
export class GameScoreService {


  constructor(private http:HttpClient, private readonly authService: AuthService) { }

  /**
   * Use this function to retrieve all of the user scores on a specified game and difficulty level
   * @param gameID The identifier for the game
   * @param difficulty The difficulty level (from 0 to 4)
   * @param userID The identifier for the user
   * @returns a list of objects that contain game score data
   */
  getUserScores(gameID:number, difficulty:number, userID:number) : Observable<any> {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    return this.http.get(`${GAME_SCORE_ENDPOINT}/${gameID}/${difficulty}/${userID}`, {headers: header});
  }

  /**
   * Use this function to save a new game score
   * @param data info about the new score, this contains user, game, difficulty and score
   * @returns the data saved in the database
   */
  saveUserScore(data:{difficulty:number, score:number, user:{id:number}, game:{id:number}}) : Observable<any> {
    const header = new HttpHeaders().set("Authorization", 'Bearer ' + this.authService.currentUserValue.token)
    return this.http.post(GAME_SCORE_ENDPOINT, data, {headers: header});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../config';

const GAME_SCORE_ENDPOINT:string = API_URL + '/game-score';

@Injectable({
  providedIn: 'root'
})
export class GameScoreService {

  constructor(private http:HttpClient) { }

  /**
   * Use this function to retrieve all of the user scores on a specified game and difficulty level
   * @param gameID The identifier for the game
   * @param difficulty The difficulty level (from 1 to 5)
   * @param userID The identifier for the user
   * @returns a list of objects that contain game score data
   */
  getUserScores(gameID:number, difficulty:number, userID:number) : Observable<any> {
    return this.http.get(`${GAME_SCORE_ENDPOINT}/${gameID}/${difficulty}/${userID}`);
  }

  /**
   * Use this function to save a new game score
   * @param data info about the new score, this contains user, game, difficulty and score
   * @returns the data saved in the database
   */
  saveUserScore(data:{difficulty:number, score:number, user:{id:number}, game:{id:number}}) : Observable<any> {
    return this.http.post(GAME_SCORE_ENDPOINT, data);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { GameScoreService } from '../services/game-score.service';

@Component({
  selector: 'app-scores-list',
  templateUrl: './scores-list.component.html',
  styleUrls: ['./scores-list.component.scss']
})
export class ScoresListComponent implements OnInit {
  @Input() gameID:number;
  @Input() userID:number;
  @Input() difficulty:number;
  @Input() difficultyLabel:string;
  
  scores?:any;
  scoresLoaded:boolean = false;

  constructor(private readonly gameScoreService:GameScoreService) { }

  ngOnInit(): void {
    // Retrieve user scores
    this.getScores();
    return;
  }

  /**
   * This function is used to retrieve the highest scores for the game, difficulty and user specified
   */
  getScores(): void {
    this.scoresLoaded = false;
    this.gameScoreService.getUserScores(this.gameID, this.difficulty, this.userID)
    .subscribe(
      data => {
        // Get real values
        console.log(data);
        this.scores = data;
        this.scoresLoaded = true;
      },
      error => {
        // Assign dummy values
        console.log(error);
        this.scores = Array(0).fill(null);
        this.scoresLoaded = true;
      }
    );
  }
}

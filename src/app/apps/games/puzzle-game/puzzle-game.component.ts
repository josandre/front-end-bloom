import { Component, OnInit } from '@angular/core';
import { PuzzleTile } from '../logic/puzzle-tile';
import { AuthService } from '@core';
import { GameScoreService } from '../services/game-score.service';
import { PUZZLE_IMAGES, PuzzleImageData } from '../logic/puzzle-game-images';

interface PuzzleGameDifficulty {
  value: number;
  tilesNumber: number;
  viewValue: string;
}

@Component({
  selector: 'app-puzzle-game',
  templateUrl: './puzzle-game.component.html',
  styleUrls: ['./puzzle-game.component.scss']
})
export class PuzzleGameComponent implements OnInit {
  // Enums
  GameStates = {
    InitialScreen: 0,
    Gameplay: 1,
    ResultsScreen: 2,
    ScoresScreen: 3
  }

  // Game state
  difficulties: PuzzleGameDifficulty[] = [
    { value: 0, tilesNumber: 3, viewValue: 'MENUITEMS.GAMES-SECTION.DIFFICULTIES.VERY-EASY' },
    { value: 1, tilesNumber: 4, viewValue: 'MENUITEMS.GAMES-SECTION.DIFFICULTIES.EASY' },
    { value: 2, tilesNumber: 5, viewValue: 'MENUITEMS.GAMES-SECTION.DIFFICULTIES.MEDIUM' },
    { value: 3, tilesNumber: 6, viewValue: 'MENUITEMS.GAMES-SECTION.DIFFICULTIES.HARD' },
    { value: 4, tilesNumber: 7, viewValue: 'MENUITEMS.GAMES-SECTION.DIFFICULTIES.VERY-HARD' }
  ];
  gameState: number = this.GameStates.InitialScreen;
  backgroundIndex:number = 0;
  currentImage:PuzzleImageData = PUZZLE_IMAGES[0];

  // User info
  currentUser?:any;

  // Difficulty settings
  difficultySelected: number = 1;
  tileSize:number = 0;
  tilesNumber:number = 0;
  tiles?: PuzzleTile[] = Array(Math.pow(this.tilesNumber, 2)).fill(null);
  matrixSize:number = 0;
  showTileNumbers:boolean = true;
  showSolution:boolean = false;

  // Game state variables
  currentScore:number = 0;
  gameFinished: boolean = false;

  constructor(private readonly authService:AuthService, private readonly gameScoreService:GameScoreService) { }

  ngOnInit(): void {
    // Get user
    this.currentUser = this.authService.currentUserValue;
    this.goToMenu();
  }

   /**
   *  This function shows the menu to choose difficulty
   */
   goToMenu(): void {
    this.gameState = this.GameStates.InitialScreen;
  }

  /**
   * This function shows the menu with the scores for this user
   */
  goToScores(): void {
    this.gameState = this.GameStates.ScoresScreen;
    
  }

  /**
   * This function shows the results menu
   */
  goToResults(): void {  
    const newScore = {
      "difficulty": this.difficultySelected,
      "score": this.currentScore,
      "user": {
        "id": this.currentUser?.id
      },
      "game": {
        "id": 2
      }
    };

    console.log('SAVING!');
    console.log(newScore);
    // Make sure the score is saved
    this.gameScoreService.saveUserScore(newScore).
    subscribe(
      response => {
        console.log(response);
        this.gameState = this.GameStates.ResultsScreen;
      },
      error => {
        console.log(error);
        this.gameState = this.GameStates.ResultsScreen;
      }
    );
  }

  /**
   * This function is used to go back to the game without starting a new game
   */
  returnToGame(): void {
    this.gameState = this.GameStates.Gameplay;
  }
  
  /**
   * This function finds the number of tiles for the selected difficulty
   * @returns Number of tiles
   */ 
  getTilesNumberFromDifficulty(): number {
    let tilesNumber:number = 0;
    
    if (this.difficultySelected >= 0 && this.difficultySelected < this.difficulties.length) {
      tilesNumber = this.difficulties[this.difficultySelected].tilesNumber;
    }

    return tilesNumber;
  }

  /**
   * Used to get background image property of tiles
   * @returns 
   */
  getTileStyles() {
    return this.getBackgroundOptionStyle(this.currentImage.imagePath);
  }

  /**
   * Used to generate a style structure for a background image
   */
  getBackgroundOptionStyle(imagePath:string)  {
    return {
      backgroundImage: 'url(' + imagePath + ')'
    }
  }

  /**
   * Used to get the background images available
   * @returns 
   */
  getPuzzleImages() {
    return PUZZLE_IMAGES;
  }

  /**
   * Used to change the game background
   * @param backgroundIndex index of the selected background
   */
  changeBackground(backgroundIndex:number) {
    this.backgroundIndex = backgroundIndex;
    this.currentImage = PUZZLE_IMAGES[this.backgroundIndex];
  }

  /**
   * This function starts a new game
   */
  newGame(): void {
    // Restart game state
    this.gameState = this.GameStates.Gameplay;
    this.currentScore = 0;

    // Init tiles based on difficulty
    this.tilesNumber = this.getTilesNumberFromDifficulty();
    this.tileSize = 640 / this.tilesNumber;
    this.matrixSize = Math.pow(this.tilesNumber, 2);
    this.tiles = Array(this.matrixSize);

    // Fill tiles
    let count:number = 1;
    for (let i = 0; i < this.matrixSize; i++) {
      this.tiles[i] = {
        value: count,
        disabled: i == this.matrixSize - 1
      };

      count++;
    }

    // Shuffle tiles
    let currentIndex = this.matrixSize - 1; // Make sure bottom right is always empty
    while (currentIndex > 0) {
      const randIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap values
      const tempValue = this.tiles[currentIndex];
      this.tiles[currentIndex] = this.tiles[randIndex];
      this.tiles[randIndex] = tempValue;
    }    
  }

  /**
   * This function is called when the player clicks on a tile
   * @param tileIndex index of the selected tile
   */
  selectTile(tileIndex:number):void {
    if (!this.tiles) {
      return;
    }
    // Check for available tile
    let availableTileIndex:number = -1;

    // Left
    if (tileIndex > 0) {
      if (this.tiles[tileIndex - 1].disabled === true) {
        availableTileIndex = tileIndex - 1;
      }
    }

    // Right
    if (tileIndex < this.matrixSize - 1) {
      if (this.tiles[tileIndex + 1].disabled === true) {
        availableTileIndex = tileIndex + 1;
      }
    }

    // Up
    if (tileIndex - this.tilesNumber >= 0) {
      if (this.tiles[tileIndex - this.tilesNumber].disabled === true) {
        availableTileIndex = tileIndex - this.tilesNumber;
      }
    }

    // Down
    if (tileIndex + this.tilesNumber < this.matrixSize) {
      if (this.tiles[tileIndex + this.tilesNumber].disabled === true) {
        availableTileIndex = tileIndex + this.tilesNumber;
      }
    }

    // Do swap if possible
    if (availableTileIndex !== -1) {
      const temp = this.tiles[availableTileIndex];
      this.tiles[availableTileIndex] = this.tiles[tileIndex];
      this.tiles[tileIndex] = temp;

      this.checkWinCondition();
    }
  }

  /**
   * This function determines if the puzzle is solved
   * For this it only checks that the sequence is from 0 to X number of tiles
   * @returns true if the sequence is correct
   */
  checkWinCondition(): void {
    if (!this.tiles) {
      return;
    }
    let win:boolean = true;

    // Compare for tiles asc order, if the sequence is not consecutive then the puzzle is not solved yet
    let cont = 1;
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].value !== cont) {
        win = false;
        break;
      }
      cont++
    }
    this.currentScore++;
    
    if (win) {
      this.goToResults();
    }
  }
}

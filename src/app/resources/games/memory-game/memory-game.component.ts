import { Component, OnInit } from '@angular/core';
import { MemoryCard } from '../logic/memory-card';
import { AuthService } from '@core';
import { GameScoreService } from '../services/game-score.service';

interface MemoryGameDifficulty {
  value: number;
  cardsNumber: number;
  viewValue: string;
}

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {
  // Enums
  GameStates = {
    InitialScreen: 0,
    Gameplay: 1,
    ResultsScreen: 2,
    ScoresScreen: 3
  }

  // Game state
  difficulties: MemoryGameDifficulty[] = [
    { value: 0, cardsNumber: 8, viewValue: 'MENUITEMS.GAMES-SECTION.DIFFICULTIES.VERY-EASY' },
    { value: 1, cardsNumber: 10, viewValue: 'MENUITEMS.GAMES-SECTION.DIFFICULTIES.EASY' },
    { value: 2, cardsNumber: 18, viewValue: 'MENUITEMS.GAMES-SECTION.DIFFICULTIES.MEDIUM' },
    { value: 3, cardsNumber: 22, viewValue: 'MENUITEMS.GAMES-SECTION.DIFFICULTIES.HARD' },
    { value: 4, cardsNumber: 28, viewValue: 'MENUITEMS.GAMES-SECTION.DIFFICULTIES.VERY-HARD' }
  ];
  gameState: number = this.GameStates.InitialScreen;

  // User info
  currentUser?:any;

  // Difficulty settings
  difficultySelected: number = 1;
  cardsNumber: number = 0;
  cards?: MemoryCard[] = Array(this.cardsNumber).fill(null);

  // Cards selected by the difficulty
  firstCard?: MemoryCard;
  secondCard?: MemoryCard;

  // Game state variables
  currentScore:number = 0;
  gameFinished: boolean = false;
  gameLocked: boolean = false;   // Variable used to lock player input when clearing the selection

  constructor(private readonly authService:AuthService, private readonly gameScoreService:GameScoreService) {}

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
        "id": 1
      }
    };

    console.log('SAVING!');
    console.log(newScore);
    // Make sure the score is saved
    this.gameScoreService.saveUserScore(newScore).
    subscribe(
      data => {
        console.log(data);
        this.gameState = this.GameStates.ResultsScreen;
      },
      error => {
        console.log(error);
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
   * Find the number of cards assigned to a selected difficulty
   * @returns 
   */
  getCardsFromDifficulty(): number {
    let cardsNumber:number = 0;
    
    if (this.difficultySelected >= 0 && this.difficultySelected < this.difficulties.length) {
      cardsNumber = this.difficulties[this.difficultySelected].cardsNumber;
    }

    return cardsNumber;
  }

  /**
   * This function starts a new game
   */
  newGame(): void {
    this.cardsNumber = this.getCardsFromDifficulty();

    // Check if the number of cards is an even number
    if (this.cardsNumber % 2 != 0) {
      return;
    }

    // Restart game state
    this.gameState = this.GameStates.Gameplay;
    this.currentScore = 0;

    // Fill available cards
    this.cards = Array(this.cardsNumber);
    let count = 0;
    for (let i = 0; i < this.cardsNumber / 2; i++) {
      // Create two cards at different positions
      this.cards[i] = {
        value: count,
        paired: false,
        selected: false
      };
      this.cards[i + (this.cardsNumber / 2)] = {
        value: count,
        paired: false,
        selected: false
      };

      count++;
    }

    // Shuffle cards
    let currentIndex = this.cardsNumber;
    while (currentIndex > 0) {
      const randIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap values
      const tempValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randIndex];
      this.cards[randIndex] = tempValue;
    }
  }

  /**
   * This function is called when the player clicks a card
   * @param cardIndex The index of the selected card
   */
  async selectCard(cardIndex: number) {
    if (this.gameLocked) {
      return;
    }

    if (this.cards) {
      // Prevent selecting invalid cards
      if (this.cards[cardIndex].selected === true || this.cards[cardIndex].paired === true) {
        console.log('The card is either selected or paired');
        return;
      }

      if (!this.firstCard) {
        // The user is selecting the first card
        this.firstCard = this.cards[cardIndex];
        this.firstCard.selected = true;
      } else {
        // The user is selecting the second card
        this.secondCard = this.cards[cardIndex];
        this.secondCard.selected = true;
        
        // If the selected cards are pair then clear the selection immediately
        if (this.areCardsPaired()) {
          this.clearSelection();
        // If not then wait 1 second so the player can see both cards
        } else {
          this.gameLocked = true;
            setTimeout(() => this.clearSelection(), 1000);
        }        
      }
    }
  }

  /**
   * This function determines if the selected cards have the same symbol
   * @returns true if both cards have the same symbol
   */
  areCardsPaired(): boolean {
    // Check if the selected cards have the same value
    if (this.firstCard && this.secondCard) {
      // Then mark them as paired
      if (this.firstCard.value === this.secondCard.value) {
        this.firstCard.paired = true;
        this.secondCard.paired = true;

        return true;
      }
    }

    return false;
  }

  /**
   * This function is called when the player flips 2 cards
   */
  clearSelection(): void {
    // Deselect all cards
    if (this.cards) {
      for (let i = 0; i < this.cardsNumber; i++) {
        this.cards[i].selected = false;
      }
    }

    // Unnasign selected cards
    this.firstCard = undefined;
    this.secondCard = undefined;

    // Check for win conditions and unlock the game
    this.checkWinCondition();
    this.gameLocked = false;
  }

  /**
   * This function checks if all the cards are paired, if so then the game ends and the results menu is displayed
   */
  checkWinCondition(): void {
    let win: boolean = true;

    if (this.cards) {
      for (let i = 0; i < this.cardsNumber; i++) {
        if (this.cards[i].paired === false) {
          win = false;
          break;
        }
      }
    }

    // Go to results
    if (win) {
      this.goToResults();
    } else {
      this.currentScore++;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MemoryCard } from '../logic/memory-card';

interface MemoryGameDifficulty {
  value: number;
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
  Difficulties = {
    VeryEasy: {
      id:0, 
      cards: 14
    },
    Easy: {
      id:1, 
      cards: 18
    },
    Medium: {
      id:2, 
      cards: 20
    },
    High: {
      id:3, 
      cards: 24
    },
    VeryHigh: {
      id:4, 
      cards: 28
    }
  }

  // Game state
  difficulties: MemoryGameDifficulty[] = [
    { value: this.Difficulties.VeryEasy.cards, viewValue: 'Very Easy' },
    { value: this.Difficulties.Easy.cards, viewValue: 'Easy' },
    { value: this.Difficulties.Medium.cards, viewValue: 'Medium' },
    { value: this.Difficulties.High.cards, viewValue: 'High' },
    { value: this.Difficulties.VeryHigh.cards, viewValue: 'Very High' }
  ]

  gameState: number = this.GameStates.InitialScreen;

  // Difficulty settings
  cardsNumber: number = 0;
  cards?: MemoryCard[] = Array(this.cardsNumber).fill(null);

  // Cards selected by the difficulty
  firstCard?: MemoryCard;
  secondCard?: MemoryCard;

  // Game state variables
  gameFinished: boolean = false;
  gameLocked: boolean = false;   // Variable used to lock player input when clearing the selection

  ngOnInit(): void {
    this.goToMenu();
  }

  // This function shows the menu to choose difficulty
  goToMenu(): void {
    this.gameState = this.GameStates.InitialScreen;
  }

  // This function shows the menu with the scores for this user
  goToScores(): void {
    this.gameState = this.GameStates.ScoresScreen;
  }

  // This function is used to go back to the game without starting a new game
  returnToGame(): void {
    this.gameState = this.GameStates.Gameplay;
  }

  //This function starts a new game
  newGame(): void {
    if (this.cardsNumber % 2 != 0) {
      return;
    }

    // Restart game state
    this.gameState = this.GameStates.Gameplay;

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

  // This function is called when the player clicks a card
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

      console.log(this.cards[cardIndex]);
      if (!this.firstCard) {
        this.firstCard = this.cards[cardIndex];
        this.firstCard.selected = true;
      } else {
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

  // This function is called when the player flips 2 cards
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

    this.checkWinCondition();
    this.gameLocked = false;
  }

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

    if (win) {
      // Go to results
      this.gameState = this.GameStates.ResultsScreen;
    }
  }
}

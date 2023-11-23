import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-puzzle-game-background-option',
  templateUrl: './puzzle-game-background-option.component.html',
  styleUrls: ['./puzzle-game-background-option.component.scss']
})
export class PuzzleGameBackgroundOptionComponent implements OnInit {
  
  @Input() selected:boolean;

  constructor() { }

  ngOnInit(): void {
    return;
  }
}

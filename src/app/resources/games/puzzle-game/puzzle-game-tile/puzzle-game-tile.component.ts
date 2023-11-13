import { Component, OnInit, HostBinding, Input, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-puzzle-game-tile',
  templateUrl: './puzzle-game-tile.component.html',
  styleUrls: ['./puzzle-game-tile.component.scss']
})
export class PuzzleGameTileComponent implements OnInit, AfterContentChecked {
  @Input() index:number;  // Defines the order in the html hierarchy
  @Input() value:number;  // Defines the tile value (sort this to solve the puzzle)
  @Input() tilesNumber:number;
  @Input() tileSize:number;
  @Input() disabled:boolean;

  @HostBinding('style.top.px') topPosition:number;
  @HostBinding('style.left.px') leftPosition:number;
  @HostBinding('style.width.px') width:number;
  @HostBinding('style.height.px') height:number;
  @HostBinding('style.background-position-x.px') backgroundPositionX:number;
  @HostBinding('style.background-position-y.px') backgroundPositionY:number;
  constructor() { }

  ngOnInit(): void { 
    this.updatePosition();
  }

  ngAfterContentChecked(): void {
    this.updatePosition();
  }

  updatePosition(): void {
    // Use tile size and index to calculate relative position
    this.leftPosition = this.tileSize * (this.index % this.tilesNumber);
    this.topPosition = this.tileSize * Math.floor(this.index / this.tilesNumber);

    // Adjust tile size
    this.width = this.tileSize;
    this.height = this.tileSize;

    // Adjust background position
    this.backgroundPositionX = -(this.tileSize * ((this.value - 1) % this.tilesNumber));
    this.backgroundPositionY = -(this.tileSize * Math.floor((this.value - 1) / this.tilesNumber));
  }
}

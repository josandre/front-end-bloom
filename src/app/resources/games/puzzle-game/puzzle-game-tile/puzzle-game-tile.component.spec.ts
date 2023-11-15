import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleGameTileComponent } from './puzzle-game-tile.component';

describe('PuzzleGameTileComponent', () => {
  let component: PuzzleGameTileComponent;
  let fixture: ComponentFixture<PuzzleGameTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleGameTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleGameTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

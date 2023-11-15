import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleGameBackgroundOptionComponent } from './puzzle-game-background-option.component';

describe('PuzzleGameBackgroundOptionComponent', () => {
  let component: PuzzleGameBackgroundOptionComponent;
  let fixture: ComponentFixture<PuzzleGameBackgroundOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleGameBackgroundOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleGameBackgroundOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GameScoreService } from './game-score.service';

describe('GameScoreService', () => {
  let service: GameScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

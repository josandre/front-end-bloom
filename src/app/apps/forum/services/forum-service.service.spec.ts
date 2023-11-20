import { TestBed } from '@angular/core/testing';

import { ForumServiceService } from './forum-service.service';

describe('ForumServiceService', () => {
  let service: ForumServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

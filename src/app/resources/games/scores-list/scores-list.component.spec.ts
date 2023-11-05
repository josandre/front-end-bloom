import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresListComponent } from './scores-list.component';

describe('ScoresListComponent', () => {
  let component: ScoresListComponent;
  let fixture: ComponentFixture<ScoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

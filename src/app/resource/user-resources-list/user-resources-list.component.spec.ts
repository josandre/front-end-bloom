import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResourcesListComponent } from './user-resources-list.component';

describe('UserResourcesListComponent', () => {
  let component: UserResourcesListComponent;
  let fixture: ComponentFixture<UserResourcesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserResourcesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

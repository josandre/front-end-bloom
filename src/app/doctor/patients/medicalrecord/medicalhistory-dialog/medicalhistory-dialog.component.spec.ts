import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalhistoryDialogComponent } from './medicalhistory-dialog.component';

describe('MedicalhistoryDialogComponent', () => {
  let component: MedicalhistoryDialogComponent;
  let fixture: ComponentFixture<MedicalhistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalhistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalhistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

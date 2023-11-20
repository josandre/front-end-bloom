import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMedicalhistoryDialogComponent } from './delete-medicalhistory-dialog.component';

describe('DeleteMedicalhistoryDialogComponent', () => {
  let component: DeleteMedicalhistoryDialogComponent;
  let fixture: ComponentFixture<DeleteMedicalhistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMedicalhistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMedicalhistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ComposeResourceComponent } from "./compose.component";
describe("ComposeComponent", () => {
  let component: ComposeResourceComponent;
  let fixture: ComponentFixture<ComposeResourceComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ComposeResourceComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

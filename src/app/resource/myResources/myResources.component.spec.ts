import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MyResourcesComponent } from "./myResources.component";
describe("InboxComponent", () => {
  let component: MyResourcesComponent;
  let fixture: ComponentFixture<MyResourcesComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MyResourcesComponent],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(MyResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

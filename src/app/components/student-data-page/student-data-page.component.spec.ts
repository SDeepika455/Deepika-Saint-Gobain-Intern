import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDataPageComponent } from './student-data-page.component';

describe('StudentDataPageComponent', () => {
  let component: StudentDataPageComponent;
  let fixture: ComponentFixture<StudentDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDataPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

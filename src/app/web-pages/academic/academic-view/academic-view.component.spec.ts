import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicViewComponent } from './academic-view.component';

describe('AcademicViewComponent', () => {
  let component: AcademicViewComponent;
  let fixture: ComponentFixture<AcademicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

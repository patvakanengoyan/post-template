import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicComponent } from './academic.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AcademicComponent', () => {
  let component: AcademicComponent;
  let fixture: ComponentFixture<AcademicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicViewComponent } from './academic-view.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

describe('AcademicViewComponent', () => {
  let component: AcademicViewComponent;
  let fixture: ComponentFixture<AcademicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicViewComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule]
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

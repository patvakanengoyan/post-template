import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RabbiVersionViewComponent } from './rabbi-version-view.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

describe('RabbiVersionViewComponent', () => {
  let component: RabbiVersionViewComponent;
  let fixture: ComponentFixture<RabbiVersionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RabbiVersionViewComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RabbiVersionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

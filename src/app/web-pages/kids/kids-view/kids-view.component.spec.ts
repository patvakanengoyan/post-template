import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsViewComponent } from './kids-view.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

describe('KidsViewComponent', () => {
  let component: KidsViewComponent;
  let fixture: ComponentFixture<KidsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidsViewComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

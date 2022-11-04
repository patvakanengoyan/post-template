import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RabbiVersionComponent } from './rabbi-version.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RabbiVersionComponent', () => {
  let component: RabbiVersionComponent;
  let fixture: ComponentFixture<RabbiVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RabbiVersionComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RabbiVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

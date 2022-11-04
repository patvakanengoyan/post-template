import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesComponent } from './pieces.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PiecesComponent', () => {
  let component: PiecesComponent;
  let fixture: ComponentFixture<PiecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiecesComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

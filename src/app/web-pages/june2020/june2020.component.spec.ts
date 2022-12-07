import { ComponentFixture, TestBed } from '@angular/core/testing';

import { June2020Component } from './june2020.component';

describe('June2020Component', () => {
  let component: June2020Component;
  let fixture: ComponentFixture<June2020Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ June2020Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(June2020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

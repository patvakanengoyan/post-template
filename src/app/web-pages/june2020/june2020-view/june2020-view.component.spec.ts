import { ComponentFixture, TestBed } from '@angular/core/testing';

import { June2020ViewComponent } from './june2020-view.component';

describe('June2020ViewComponent', () => {
  let component: June2020ViewComponent;
  let fixture: ComponentFixture<June2020ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ June2020ViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(June2020ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

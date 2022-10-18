import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesViewComponent } from './pieces-view.component';

describe('PiecesViewComponent', () => {
  let component: PiecesViewComponent;
  let fixture: ComponentFixture<PiecesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiecesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiecesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

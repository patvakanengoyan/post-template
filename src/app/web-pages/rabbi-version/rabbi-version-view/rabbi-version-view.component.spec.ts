import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RabbiVersionViewComponent } from './rabbi-version-view.component';

describe('RabbiVersionViewComponent', () => {
  let component: RabbiVersionViewComponent;
  let fixture: ComponentFixture<RabbiVersionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RabbiVersionViewComponent ]
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

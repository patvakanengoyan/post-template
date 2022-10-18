import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RabbiVersionComponent } from './rabbi-version.component';

describe('RabbiVersionComponent', () => {
  let component: RabbiVersionComponent;
  let fixture: ComponentFixture<RabbiVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RabbiVersionComponent ]
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

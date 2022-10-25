import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomyComponent } from './taxonomy.component';

describe('TaxonomyComponent', () => {
  let component: TaxonomyComponent;
  let fixture: ComponentFixture<TaxonomyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxonomyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxonomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

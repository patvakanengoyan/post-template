import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicKeysComponent } from './topic-keys.component';

describe('TopicKeysComponent', () => {
  let component: TopicKeysComponent;
  let fixture: ComponentFixture<TopicKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicKeysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

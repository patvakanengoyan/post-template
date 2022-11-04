import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicKeysComponent } from './topic-keys.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";

describe('TopicKeysComponent', () => {
  let component: TopicKeysComponent;
  let fixture: ComponentFixture<TopicKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicKeysComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
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

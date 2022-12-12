import { TestBed } from '@angular/core/testing';

import { ViewPostGuard } from './view-post.guard';

describe('ViewPostGuard', () => {
  let guard: ViewPostGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewPostGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

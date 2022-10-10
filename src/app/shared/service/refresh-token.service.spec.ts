import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RefreshTokenService} from "./refresh-token.service";

describe('RefreshTokenService', () => {
  let service: RefreshTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RefreshTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ApplyNowService } from './apply-now.service';

describe('ApplyNowService', () => {
  let service: ApplyNowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyNowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

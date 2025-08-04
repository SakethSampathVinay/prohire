import { TestBed } from '@angular/core/testing';

import { LatestJobsService } from './latest-jobs.service';

describe('LatestJobsService', () => {
  let service: LatestJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatestJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

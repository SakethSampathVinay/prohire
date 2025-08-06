import { TestBed } from '@angular/core/testing';

import { AddJobsService } from './add-jobs.service';

describe('AddJobsService', () => {
  let service: AddJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

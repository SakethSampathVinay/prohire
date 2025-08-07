import { TestBed } from '@angular/core/testing';

import { ViewApplicationsService } from './view-applications.service';

describe('ViewApplicationsService', () => {
  let service: ViewApplicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewApplicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

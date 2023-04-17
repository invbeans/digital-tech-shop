import { TestBed } from '@angular/core/testing';

import { LoadInitDataService } from './load-init-data.service';

describe('LoadInitDataService', () => {
  let service: LoadInitDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadInitDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProgressBarDataService } from './progress-bar-data.service';

describe('ProgressBarDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressBarDataService = TestBed.get(ProgressBarDataService);
    expect(service).toBeTruthy();
  });
});

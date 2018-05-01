import { TestBed, inject } from '@angular/core/testing';

import { ClearanceService } from './clearance.service';

describe('ClearanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClearanceService]
    });
  });

  it('should be created', inject([ClearanceService], (service: ClearanceService) => {
    expect(service).toBeTruthy();
  }));
});

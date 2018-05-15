import { TestBed, async, inject } from '@angular/core/testing';

import { OfficeGuard } from './office.guard';

describe('OfficeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfficeGuard]
    });
  });

  it('should ...', inject([OfficeGuard], (guard: OfficeGuard) => {
    expect(guard).toBeTruthy();
  }));
});

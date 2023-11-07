import { TestBed } from '@angular/core/testing';

import { PreparationStepsService } from './preparation-steps.service';

describe('PreparationStepsService', () => {
  let service: PreparationStepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreparationStepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { IsAuthetifiedService } from './is-authetified.service';

describe('IsAuthetifiedService', () => {
  let service: IsAuthetifiedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsAuthetifiedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

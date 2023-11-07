import { TestBed } from '@angular/core/testing';

import { QuantityIngredientsService } from './quantity-ingredients.service';

describe('QuantityIngredientsService', () => {
  let service: QuantityIngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantityIngredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

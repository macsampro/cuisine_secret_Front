import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListIngredientsComponent } from './modal-list-ingredients.component';

describe('ModalListIngredientsComponent', () => {
  let component: ModalListIngredientsComponent;
  let fixture: ComponentFixture<ModalListIngredientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalListIngredientsComponent]
    });
    fixture = TestBed.createComponent(ModalListIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

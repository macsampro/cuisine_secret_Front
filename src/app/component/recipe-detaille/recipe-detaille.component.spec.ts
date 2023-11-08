import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailleComponent } from './recipe-detaille.component';

describe('RecipeDetailleComponent', () => {
  let component: RecipeDetailleComponent;
  let fixture: ComponentFixture<RecipeDetailleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeDetailleComponent]
    });
    fixture = TestBed.createComponent(RecipeDetailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

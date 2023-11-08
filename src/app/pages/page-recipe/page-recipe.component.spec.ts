import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRecipeComponent } from './page-recipe.component';

describe('PageRecipeComponent', () => {
  let component: PageRecipeComponent;
  let fixture: ComponentFixture<PageRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageRecipeComponent]
    });
    fixture = TestBed.createComponent(PageRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

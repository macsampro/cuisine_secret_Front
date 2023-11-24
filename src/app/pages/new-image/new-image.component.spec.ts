import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewImageComponent } from './new-image.component';

describe('NewImageComponent', () => {
  let component: NewImageComponent;
  let fixture: ComponentFixture<NewImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewImageComponent]
    });
    fixture = TestBed.createComponent(NewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvCategoryComponent } from './tv-category.component';

describe('TvCategoryComponent', () => {
  let component: TvCategoryComponent;
  let fixture: ComponentFixture<TvCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesInfoComponent } from './movies-info.component';

describe('MoviesInfoComponent', () => {
  let component: MoviesInfoComponent;
  let fixture: ComponentFixture<MoviesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

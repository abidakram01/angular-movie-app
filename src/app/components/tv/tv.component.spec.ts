import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvComponent } from './tv.component';

describe('TvComponent', () => {
  let component: TvComponent;
  let fixture: ComponentFixture<TvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

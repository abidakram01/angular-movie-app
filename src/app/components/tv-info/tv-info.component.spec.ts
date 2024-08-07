import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvInfoComponent } from './tv-info.component';

describe('TvInfoComponent', () => {
  let component: TvInfoComponent;
  let fixture: ComponentFixture<TvInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

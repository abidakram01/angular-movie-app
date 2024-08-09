import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaOverviewComponent } from './media.component';

describe('MediaOverviewComponent', () => {
  let component: MediaOverviewComponent;
  let fixture: ComponentFixture<MediaOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

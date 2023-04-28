import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOrderFeedComponent } from './track-order-feed.component';

describe('TrackOrderFeedComponent', () => {
  let component: TrackOrderFeedComponent;
  let fixture: ComponentFixture<TrackOrderFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackOrderFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackOrderFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

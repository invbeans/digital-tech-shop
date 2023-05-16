import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnFeedComponent } from './return-feed.component';

describe('ReturnFeedComponent', () => {
  let component: ReturnFeedComponent;
  let fixture: ComponentFixture<ReturnFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

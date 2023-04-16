import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountTypeFeedComponent } from './discount-type-feed.component';

describe('DiscountTypeFeedComponent', () => {
  let component: DiscountTypeFeedComponent;
  let fixture: ComponentFixture<DiscountTypeFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountTypeFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountTypeFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

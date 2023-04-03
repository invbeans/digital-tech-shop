import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsFeedItemComponent } from './discounts-feed-item.component';

describe('DiscountsFeedItemComponent', () => {
  let component: DiscountsFeedItemComponent;
  let fixture: ComponentFixture<DiscountsFeedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountsFeedItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountsFeedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsFeedComponent } from './discounts-feed.component';

describe('DiscountsFeedComponent', () => {
  let component: DiscountsFeedComponent;
  let fixture: ComponentFixture<DiscountsFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountsFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

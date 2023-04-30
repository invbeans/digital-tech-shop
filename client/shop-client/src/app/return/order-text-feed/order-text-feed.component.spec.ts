import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTextFeedComponent } from './order-text-feed.component';

describe('OrderTextFeedComponent', () => {
  let component: OrderTextFeedComponent;
  let fixture: ComponentFixture<OrderTextFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTextFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTextFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

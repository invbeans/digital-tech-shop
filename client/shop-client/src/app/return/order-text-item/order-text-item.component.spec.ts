import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTextItemComponent } from './order-text-item.component';

describe('OrderTextItemComponent', () => {
  let component: OrderTextItemComponent;
  let fixture: ComponentFixture<OrderTextItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTextItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTextItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

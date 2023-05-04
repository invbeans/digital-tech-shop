import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingServicePageComponent } from './shipping-service-page.component';

describe('ShippingServicePageComponent', () => {
  let component: ShippingServicePageComponent;
  let fixture: ComponentFixture<ShippingServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingServicePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

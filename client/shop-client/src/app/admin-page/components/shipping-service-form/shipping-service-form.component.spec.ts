import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingServiceFormComponent } from './shipping-service-form.component';

describe('ShippingServiceFormComponent', () => {
  let component: ShippingServiceFormComponent;
  let fixture: ComponentFixture<ShippingServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingServiceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

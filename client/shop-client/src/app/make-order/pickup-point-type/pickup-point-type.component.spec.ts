import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupPointTypeComponent } from './pickup-point-type.component';

describe('PickupPointTypeComponent', () => {
  let component: PickupPointTypeComponent;
  let fixture: ComponentFixture<PickupPointTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupPointTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupPointTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountInfoPageComponent } from './discount-info-page.component';

describe('DiscountInfoPageComponent', () => {
  let component: DiscountInfoPageComponent;
  let fixture: ComponentFixture<DiscountInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountInfoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

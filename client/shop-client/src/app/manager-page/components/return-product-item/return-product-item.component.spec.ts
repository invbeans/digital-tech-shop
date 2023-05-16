import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnProductItemComponent } from './return-product-item.component';

describe('ReturnProductItemComponent', () => {
  let component: ReturnProductItemComponent;
  let fixture: ComponentFixture<ReturnProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnProductItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

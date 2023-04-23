import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoItemComponent } from './product-info-item.component';

describe('ProductInfoItemComponent', () => {
  let component: ProductInfoItemComponent;
  let fixture: ComponentFixture<ProductInfoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInfoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInfoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

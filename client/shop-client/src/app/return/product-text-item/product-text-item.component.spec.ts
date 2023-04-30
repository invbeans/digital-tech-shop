import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTextItemComponent } from './product-text-item.component';

describe('ProductTextItemComponent', () => {
  let component: ProductTextItemComponent;
  let fixture: ComponentFixture<ProductTextItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTextItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTextItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

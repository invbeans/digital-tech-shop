import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShortComponent } from './product-short.component';

describe('ProductShortComponent', () => {
  let component: ProductShortComponent;
  let fixture: ComponentFixture<ProductShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductShortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoFeedComponent } from './product-info-feed.component';

describe('ProductInfoFeedComponent', () => {
  let component: ProductInfoFeedComponent;
  let fixture: ComponentFixture<ProductInfoFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInfoFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInfoFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

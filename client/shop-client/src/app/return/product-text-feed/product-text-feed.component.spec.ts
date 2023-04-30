import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTextFeedComponent } from './product-text-feed.component';

describe('ProductTextFeedComponent', () => {
  let component: ProductTextFeedComponent;
  let fixture: ComponentFixture<ProductTextFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTextFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTextFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsStatsPageComponent } from './products-stats-page.component';

describe('ProductsStatsPageComponent', () => {
  let component: ProductsStatsPageComponent;
  let fixture: ComponentFixture<ProductsStatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsStatsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

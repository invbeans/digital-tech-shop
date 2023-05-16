import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnProductFeedComponent } from './return-product-feed.component';

describe('ReturnProductFeedComponent', () => {
  let component: ReturnProductFeedComponent;
  let fixture: ComponentFixture<ReturnProductFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnProductFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnProductFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

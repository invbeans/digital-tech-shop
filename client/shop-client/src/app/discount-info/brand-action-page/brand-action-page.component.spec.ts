import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandActionPageComponent } from './brand-action-page.component';

describe('BrandActionPageComponent', () => {
  let component: BrandActionPageComponent;
  let fixture: ComponentFixture<BrandActionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandActionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandActionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

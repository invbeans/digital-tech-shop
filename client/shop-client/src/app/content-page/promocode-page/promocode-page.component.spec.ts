import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocodePageComponent } from './promocode-page.component';

describe('PromocodePageComponent', () => {
  let component: PromocodePageComponent;
  let fixture: ComponentFixture<PromocodePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromocodePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyValuePageComponent } from './property-value-page.component';

describe('PropertyValuePageComponent', () => {
  let component: PropertyValuePageComponent;
  let fixture: ComponentFixture<PropertyValuePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyValuePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyValuePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

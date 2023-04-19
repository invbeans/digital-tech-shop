import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayActionPageComponent } from './holiday-action-page.component';

describe('HolidayActionPageComponent', () => {
  let component: HolidayActionPageComponent;
  let fixture: ComponentFixture<HolidayActionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayActionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayActionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

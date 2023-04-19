import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleActionPageComponent } from './double-action-page.component';

describe('DoubleActionPageComponent', () => {
  let component: DoubleActionPageComponent;
  let fixture: ComponentFixture<DoubleActionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoubleActionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoubleActionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

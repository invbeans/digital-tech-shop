import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCatPageComponent } from './main-cat-page.component';

describe('MainCatPageComponent', () => {
  let component: MainCatPageComponent;
  let fixture: ComponentFixture<MainCatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCatPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

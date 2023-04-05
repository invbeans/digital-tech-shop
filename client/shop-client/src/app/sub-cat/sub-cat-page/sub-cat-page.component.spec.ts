import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatPageComponent } from './sub-cat-page.component';

describe('SubCatPageComponent', () => {
  let component: SubCatPageComponent;
  let fixture: ComponentFixture<SubCatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCatPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

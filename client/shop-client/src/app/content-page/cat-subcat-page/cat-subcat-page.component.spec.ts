import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSubcatPageComponent } from './cat-subcat-page.component';

describe('CatSubcatPageComponent', () => {
  let component: CatSubcatPageComponent;
  let fixture: ComponentFixture<CatSubcatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatSubcatPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatSubcatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

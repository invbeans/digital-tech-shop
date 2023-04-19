import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryActionPageComponent } from './sub-category-action-page.component';

describe('SubCategoryActionPageComponent', () => {
  let component: SubCategoryActionPageComponent;
  let fixture: ComponentFixture<SubCategoryActionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryActionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoryActionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

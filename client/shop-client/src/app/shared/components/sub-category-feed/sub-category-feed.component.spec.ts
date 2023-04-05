import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryFeedComponent } from './sub-category-feed.component';

describe('SubCategoryFeedComponent', () => {
  let component: SubCategoryFeedComponent;
  let fixture: ComponentFixture<SubCategoryFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoryFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

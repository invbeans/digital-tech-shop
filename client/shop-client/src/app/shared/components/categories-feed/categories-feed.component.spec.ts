import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesFeedComponent } from './categories-feed.component';

describe('CategoriesFeedComponent', () => {
  let component: CategoriesFeedComponent;
  let fixture: ComponentFixture<CategoriesFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

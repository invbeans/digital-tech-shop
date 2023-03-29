import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTextItemCardComponent } from './edit-text-item-card.component';

describe('EditTextItemCardComponent', () => {
  let component: EditTextItemCardComponent;
  let fixture: ComponentFixture<EditTextItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTextItemCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTextItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

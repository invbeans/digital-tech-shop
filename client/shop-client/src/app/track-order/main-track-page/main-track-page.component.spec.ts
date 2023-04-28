import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTrackPageComponent } from './main-track-page.component';

describe('MainTrackPageComponent', () => {
  let component: MainTrackPageComponent;
  let fixture: ComponentFixture<MainTrackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTrackPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTrackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAttendanceComponent } from './track-attendance.component';

describe('TrackAttendanceComponent', () => {
  let component: TrackAttendanceComponent;
  let fixture: ComponentFixture<TrackAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

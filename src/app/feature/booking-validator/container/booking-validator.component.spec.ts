import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingValidatorComponent } from './booking-validator.component';

describe('BookingValidatorComponent', () => {
  let component: BookingValidatorComponent;
  let fixture: ComponentFixture<BookingValidatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingValidatorComponent]
    });
    fixture = TestBed.createComponent(BookingValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterFormComponent } from './theater-form.component';

describe('TheaterFormComponent', () => {
  let component: TheaterFormComponent;
  let fixture: ComponentFixture<TheaterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheaterFormComponent]
    });
    fixture = TestBed.createComponent(TheaterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

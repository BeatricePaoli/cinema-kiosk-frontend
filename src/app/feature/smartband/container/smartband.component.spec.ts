import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartbandComponent } from './smartband.component';

describe('SmartbandComponent', () => {
  let component: SmartbandComponent;
  let fixture: ComponentFixture<SmartbandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartbandComponent]
    });
    fixture = TestBed.createComponent(SmartbandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

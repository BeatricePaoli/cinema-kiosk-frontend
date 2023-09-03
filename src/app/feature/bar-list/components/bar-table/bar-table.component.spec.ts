import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarTableComponent } from './bar-table.component';

describe('BarTableComponent', () => {
  let component: BarTableComponent;
  let fixture: ComponentFixture<BarTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarTableComponent]
    });
    fixture = TestBed.createComponent(BarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

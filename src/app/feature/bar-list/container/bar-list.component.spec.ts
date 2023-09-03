import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarListComponent } from './bar-list.component';

describe('BarListComponent', () => {
  let component: BarListComponent;
  let fixture: ComponentFixture<BarListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarListComponent]
    });
    fixture = TestBed.createComponent(BarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

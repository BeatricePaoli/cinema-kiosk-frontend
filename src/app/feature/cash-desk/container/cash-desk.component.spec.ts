import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDeskComponent } from './cash-desk.component';

describe('CashDeskComponent', () => {
  let component: CashDeskComponent;
  let fixture: ComponentFixture<CashDeskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashDeskComponent]
    });
    fixture = TestBed.createComponent(CashDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

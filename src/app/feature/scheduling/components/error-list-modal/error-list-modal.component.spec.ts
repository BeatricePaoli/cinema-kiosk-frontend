import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorListModalComponent } from './error-list-modal.component';

describe('ErrorListModalComponent', () => {
  let component: ErrorListModalComponent;
  let fixture: ComponentFixture<ErrorListModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorListModalComponent]
    });
    fixture = TestBed.createComponent(ErrorListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

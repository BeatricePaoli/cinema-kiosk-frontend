import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterListComponent } from './theater-list.component';

describe('TheaterListComponent', () => {
  let component: TheaterListComponent;
  let fixture: ComponentFixture<TheaterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheaterListComponent]
    });
    fixture = TestBed.createComponent(TheaterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

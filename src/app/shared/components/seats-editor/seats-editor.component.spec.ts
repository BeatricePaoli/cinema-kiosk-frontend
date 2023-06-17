import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsEditorComponent } from './seats-editor.component';

describe('SeatsEditorComponent', () => {
  let component: SeatsEditorComponent;
  let fixture: ComponentFixture<SeatsEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeatsEditorComponent]
    });
    fixture = TestBed.createComponent(SeatsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

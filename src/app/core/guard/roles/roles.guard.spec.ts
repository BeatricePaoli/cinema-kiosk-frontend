import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let service: RolesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ RolesGuard ]
    });
    service = TestBed.inject(RolesGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should call http.post with correct data when authMethod is called', () => {
    const email = 'test@example.com';
    const password = 'Test123';
    const mockResponse = { user: { id: 1, email: 'test@example.com' } };

    authService.authMethod(email, password).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/2performant/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password });

    req.flush(mockResponse);
  });

  it('should return an error if http.post fails', () => {
    const email = 'test@example.com';
    const password = 'Test123';

    authService.authMethod(email, password).subscribe(
        (response) => {
          fail('Request should have failed');
        },
        (error) => {
          expect(error).toBeTruthy();
        }
    );

    const req = httpTestingController.expectOne('http://localhost:3000/2performant/login');
    req.error(new ErrorEvent('Network error'));
  });
});

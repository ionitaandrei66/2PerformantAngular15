import { TestBed } from '@angular/core/testing';
import { ToastService } from './toasts.service';

describe('ToastService', () => {
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    toastService = TestBed.inject(ToastService);

    jasmine.clock().install();
  });

  afterEach(() => {

    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(toastService).toBeTruthy();
  });

  it('should show a success toast notification', () => {
    const message = 'Operation succeeded!';
    const type = 'success';
    const toastElement = document.createElement('div');

    spyOn(document, 'createElement').and.returnValue(toastElement);
    spyOn(document.body, 'appendChild').and.callThrough();
    spyOn(document.body, 'removeChild').and.callThrough();

    toastService.showNotification(message, type);

    expect(document.createElement).toHaveBeenCalledWith('div');
    expect(toastElement.className).toContain('toast bg-success text-light');
    expect(toastElement.innerHTML).toContain(message);

    expect(document.body.appendChild).toHaveBeenCalledWith(toastElement);

    jasmine.clock().tick(3000);

    expect(document.body.removeChild).toHaveBeenCalledWith(toastElement);
  });

  it('should show an error toast notification', () => {
    const message = 'Operation failed!';
    const type = 'error';
    const toastElement = document.createElement('div');

    spyOn(document, 'createElement').and.returnValue(toastElement);
    spyOn(document.body, 'appendChild').and.callThrough();
    spyOn(document.body, 'removeChild').and.callThrough();

    toastService.showNotification(message, type);

    expect(document.createElement).toHaveBeenCalledWith('div');
    expect(toastElement.className).toContain('toast bg-error text-light');
    expect(toastElement.innerHTML).toContain(message);

    expect(document.body.appendChild).toHaveBeenCalledWith(toastElement);

    jasmine.clock().tick(3000);

    expect(document.body.removeChild).toHaveBeenCalledWith(toastElement);
  });
});

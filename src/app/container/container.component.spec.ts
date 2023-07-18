import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {of, take} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toasts.service';
import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
    let component: ContainerComponent;
    let fixture: ComponentFixture<ContainerComponent>;
    let authService: AuthService;
    let toastService: ToastService;
    let authSpy: jasmine.SpyObj<AuthService>;
    const toastSpy = jasmine.createSpyObj('ToastService', ['showNotification']);

    beforeEach(async () => {
         authSpy = jasmine.createSpyObj('AuthService', ['authMethod']);
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [ContainerComponent],
            providers: [
                FormBuilder,
                { provide: AuthService, useValue: authSpy },
                { provide: ToastService, useValue: toastSpy },
            ],
        }).compileComponents();

        authService = TestBed.inject(AuthService);
        toastService = TestBed.inject(ToastService);

        fixture = TestBed.createComponent(ContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call AuthService authMethod when login is called with valid form', () => {
        const email = 'test@example.com';
        const password = 'Test123';
        const mockUser = {
            "email": "ionita_andrei_2002@yahoo.com",
            "id": 119389,
            "login": "ionita_andrei_2002",
            "name": "ionita_andrei_2002",
            "role": "affiliate",
            "unique_code": "1bf56dd5c",
            "created_at": "2023-07-17T21:22:55Z",
            "avatar_url": "https://secure.gravatar.com/avatar/4cb9b2d453fad5020435bcd4d274808c?d=https://network.2performant.com%2Fimg%2Favatar-default.jpg",
            "user_info": {
                "address": "",
                "city": "",
                "country": "Romania",
                "display_name": "regular",
                "firstname": "",
                "lastname": "",
                "organization": "",
                "phone": "",
                "state": "",
                "typeofbusiness": ""
            },
            "newsletter_subscription": false,
            "influencer_marketing_wizard_state": null,
            "influencer_profile_status": null
        };

        component.loginForm.setValue({ email, password });
        authSpy.authMethod.and.returnValue(of({ user: mockUser }).pipe(take(1)));
        component.login();

        expect(authService.authMethod).toHaveBeenCalledWith(email, password);
        expect(component.user).toEqual(mockUser);
        expect(component.time).toBeDefined();
        expect(component.templateLogin).toBeFalse();
        expect(toastService.showNotification).toHaveBeenCalledWith(
            'Operation succeeded!',
            'success'
        );
    });

    it('should show error toast if login fails', () => {
        const email = 'test@example.com';
        const password = 'Hello123';

        component.loginForm.patchValue({ email, password });
        authSpy.authMethod.and.returnValue(of(null).pipe(take(1)));
        component.login();

        expect(authService.authMethod).toHaveBeenCalledWith(email, password);
        expect(component.user).toBeUndefined();
        expect(component.time).toBeUndefined();
        expect(component.templateLogin).toBeTrue();
        expect(toastService.showNotification).toHaveBeenCalledWith(
            'Operation failed!',
            'error'
        );
    });
});

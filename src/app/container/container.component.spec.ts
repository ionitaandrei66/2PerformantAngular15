import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContainerComponent } from './container.component';
import { take } from 'rxjs/operators';
import {of} from "rxjs";

describe('ContainerComponent', () => {
    let component: ContainerComponent;
    let fixture: ComponentFixture<ContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContainerComponent],
            imports: [ReactiveFormsModule, HttpClientTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should show the login form template initially', () => {
        expect(component.templateLogin).toBe(true);
    });

    it('should login and update user, time, and templateLogin properties on successful login', () => {
        const mockUserData = {
            user:  {
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
            },
        };

        // Spy on the HttpClient post method and return a mock response
        spyOn(component.http, 'post').and.returnValue(
            of(mockUserData).pipe(take(1))
        );

        component.loginForm.patchValue({
            username: 'testuser',
            password: 'Test1234',
        });

        component.login();

        // Check if the user and time properties are updated after successful login
        expect(component.user).toEqual(mockUserData.user);
        expect(component.time).toBeTruthy();
        expect(component.templateLogin).toBe(false);
    });

    it('should log out and reset user, time, and templateLogin properties', () => {
        // Set some initial values for user, time, and templateLogin
        component.user = {
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
        component.time = new Date();
        component.templateLogin = false;

        component.logOut();

        // Check if the properties are reset to their initial values after logout
        expect(component.user).toBeUndefined();
        expect(component.time).toBeUndefined();
        expect(component.templateLogin).toBe(true);
    });
});
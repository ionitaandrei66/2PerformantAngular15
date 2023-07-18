import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, take} from "rxjs";
import {User} from "../interfaces/user.interface";
import {AuthService} from "../services/auth.service";
import {ToastService} from "../services/toasts.service";

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
    loginForm: FormGroup;
    user: User | undefined;
    time: Date | undefined;
    templateLogin: boolean = true;


    constructor(private fb: FormBuilder, public auth: AuthService, private toastService: ToastService) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    login() {
        if (this.loginForm.valid) {
            const {email, password} = this.loginForm.value;

            this.auth.authMethod(email, password).pipe(take(1), catchError((err) => {
                this.toastService.showNotification('Login failed!', 'error');
                return err
            })).subscribe((res: any) => {
                if (res) {
                    this.user = res.user;
                    this.time = new Date();
                    this.templateLogin = false;
                    this.toastService.showNotification('Logged in!', 'success');
                } else {
                    this.toastService.showNotification('Login failed!', 'error');
                }
            })
        }else{
            this.toastService.showNotification('Form is invalid!', 'error');
        }
    }

    logOut() {
        this.user = undefined;
        this.time = undefined;
        this.templateLogin = true;
        this.loginForm = this.fb.group({
            email: ['', [Validators.required]],
            password: [
                '',
                [
                    Validators.required,
                ],
            ],
        });
        this.toastService.showNotification('Logged out!', 'success');
    }
}

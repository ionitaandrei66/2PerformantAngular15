import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs";
import {User} from "../interfaces/user.interface";

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


    constructor(private fb: FormBuilder, public http: HttpClient) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(4)]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/),
                ],
            ],
        });
    }

    login() {
        if (this.loginForm.valid) {
            this.http.post("http://localhost:3000/2performant/login", {
                email: this.loginForm.controls['email'].value,
                password: this.loginForm.controls['password'].value
            }).pipe(take(1)).subscribe((res: any) => {
                if (res) {
                    this.user = res.user;
                    this.time = new Date();
                    this.templateLogin = false;
                }
            })
        }
    }

    logOut() {
        this.user = undefined;
        this.time = undefined;
        this.templateLogin = true;
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(4)]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/),
                ],
            ],
        });
    }
}

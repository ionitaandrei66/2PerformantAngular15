import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) {

  }

  authMethod(email: string, password: string): Observable<any>{
    return   this.http.post("http://localhost:3000/2performant/login", {
      email: email,
      password: password
    });
  }
}

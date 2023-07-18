import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResponse, User} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public authMethod(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("http://localhost:3000/2performant/login", {
      email: email,
      password: password
    });
  }
}

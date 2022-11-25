import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/@models/user';

const LOGIN_URL= 'users/login'
const REGISTER_URL= 'users'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(
      LOGIN_URL,
      {user: user}
    )
  }

  register(user: User) {
    return this.http.post(
      REGISTER_URL,
      {user: user}
    )
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../../models/auth-response';
import { LoginUser } from '../../models/user-auth-forms';
import { RegistrationUser } from '../../models/user-auth-forms';
import { UserDto } from '../../models/user-dto';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role = 4 //состояние пользователя (4 по дефолту)
  isAuth = false
  userDto = new UserDto(0, "", 0)
  errorMessage = ""

  mapping: string = 'http://localhost:3000/user/';
  constructor(private http: HttpClient) { }

  setRole(role: number) {
    this.userDto.role = role
  }

  getRole() {
    return this.userDto.role
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth
  }

  getAuth() {
    return this.isAuth
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getUserDto(){
    return this.userDto
  }

  login(loginUser: LoginUser) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }
    const { email, password } = loginUser
    const body = { email, password }
    return this.http.post<AuthResponse | null>(this.mapping + 'login', body, httpOptions)
      .pipe(
        map((data: AuthResponse | null) => {
          if (data && typeof data != 'string') {
            localStorage.setItem('token', data.accessToken)
            this.isAuth = true
            this.userDto = data.userDto
          }
          return data
        })
      )
  }

  registration(registrationUser: RegistrationUser) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }
    const { firstname, surname, lastname, username, email, password, phone_number, points } = registrationUser
    const birthday_date = registrationUser.birthday_date.toString()
    const body = { firstname, surname, lastname, username, birthday_date, email, password, phone_number, points }
    return this.http.post<AuthResponse | null>(this.mapping + 'registration', body, httpOptions)
      .pipe(
        map((data: AuthResponse | null) => {
          if (data && typeof data != 'string') {
            localStorage.setItem('token', data.accessToken)
            this.isAuth = true
            this.userDto = data.userDto
          }
          return data
        })
      )
  }

  logout() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }
    return this.http.get(this.mapping + 'logout', httpOptions)
      .pipe(
        map((data: any) => {
          localStorage.removeItem('token')
          this.isAuth = false
          this.userDto = {} as UserDto
          return data
        })
      )
  }

  checkAuth() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }
    return this.http.get<AuthResponse | null>(this.mapping + 'refresh', httpOptions)
      .pipe(
        map((data: AuthResponse | null) => {
          if (data && typeof data != 'string') { //мб сообщение
            localStorage.setItem('token', data.accessToken)
            this.isAuth = true
            this.userDto = data.userDto
          }
          else {
            this.isAuth = false
            this.userDto = {} as UserDto
          }
          return data
        })
      )
  }
}

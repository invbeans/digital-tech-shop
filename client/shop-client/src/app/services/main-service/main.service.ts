import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Action } from 'src/app/shared/models/action';
import { MainCategory } from 'src/app/shared/models/main-category';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable()
export class MainService {

  mapping: string = 'http://localhost:3000/';
  constructor(private http: HttpClient, private cookieService: CookieService, private authService: AuthService) {
    //console.log(cookieService.check('refreshToken'))
  }

  getLastAction() {
    return this.http.get<Action | null>(this.mapping + 'discount/action/last');
  }

  getAllCategories() {
    return this.http.get<MainCategory | null>(this.mapping + 'storefront/main_category');
  }

  getAllUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Beaver ${localStorage.getItem('token')}`
      }),
      withCredentials: true
    }
    return this.http.get<User | null>(this.mapping + 'user/user', httpOptions)
  }
}

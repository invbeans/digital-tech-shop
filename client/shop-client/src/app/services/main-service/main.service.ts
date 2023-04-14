import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Action } from 'src/app/shared/models/action';
import { MainCategory } from 'src/app/shared/models/main-category';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { map } from 'rxjs';
import { AuthResponse } from 'src/app/shared/models/auth-response';

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
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.get<User | null>(this.mapping + 'user/user', httpOptions)
    .pipe(
      map((data: any) => {
        if(data.status === 401){
          this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
            if(refreshData){
              localStorage.setItem('token', refreshData.accessToken) //это должен быть рефреш по истечению времени вроде
            }
          })
        }
        this.http.get<User | null>(this.mapping + 'user/user', httpOptions)
      })
    )
  }
}

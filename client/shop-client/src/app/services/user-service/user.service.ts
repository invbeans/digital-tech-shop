import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthResponse } from 'src/app/shared/models/auth-response';
import { MetaUser } from 'src/app/shared/models/meta-user';
import { Role } from 'src/app/shared/models/role';
import { UserAdminPage } from 'src/app/shared/models/user-admin-page';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  mapping: string = 'http://localhost:3000/user/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.get<UserAdminPage | null>(this.mapping + `user/`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getUsers()
              }
            })
          }
          else return data
        })
      )
  }

  getRoles() {
    return this.http.get<Role | null>(this.mapping + `role/`)
  }

  changeUserRole(id: number, roleId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    const body = {role: roleId}
    return this.http.put<MetaUser | null>(this.mapping + `user/change_role/${id}`, body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.changeUserRole(id, roleId)
              }
            })
          }
          else return data
        })
      )
  }

  findUserBySurname(surname: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    const body = {surname: surname}
    return this.http.post<UserAdminPage | null>(this.mapping + `user/by_surname`, body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.findUserBySurname(surname)
              }
            })
          }
          else return data
        })
      )
  }

}

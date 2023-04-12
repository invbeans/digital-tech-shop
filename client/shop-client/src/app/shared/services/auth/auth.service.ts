import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role = 4 //состояние пользователя (4 по дефолту)
  constructor() { }

  setRole(role: number){
    this.role = role
  }

  getRole() {
    return this.role
  }
}

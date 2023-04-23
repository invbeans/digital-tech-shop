import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthResponse } from 'src/app/shared/models/auth-response';
import { Basket } from 'src/app/shared/models/basket';
import { BasketProduct } from 'src/app/shared/models/basket-product';
import { Product } from 'src/app/shared/models/product';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  mapping: string = 'http://localhost:3000/order/';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getBasket() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    let dateTime = new Date().toISOString();
    const body = { begin_date: dateTime }
    return this.http.post<Basket | null>(this.mapping + 'basket/by_user', body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getBasket()
              }

            })
          }
          else return data
        })
      )
  }

  addBasketProduct(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    const body = { product: id }
    return this.http.post<BasketProduct | null>(this.mapping + 'basket_product', body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.addBasketProduct(id)
              }
            })
          }
          else return data
        })
      )
  }

  getProductsByBasket() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.get<Product | null>(this.mapping + 'product/by_basket', httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getProductsByBasket()
              }
            })
          }
          else return data
        })
      )
  }

  deleteBasketProductByProduct(id: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.delete<any>(this.mapping + `/basket_product/by_product/${id}`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this. deleteBasketProductByProduct(id)
              }
            })
          }
          else return data
        })
      )
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Adress } from 'src/app/shared/models/adress';
import { AuthResponse } from 'src/app/shared/models/auth-response';
import { Basket } from 'src/app/shared/models/basket';
import { BasketProduct } from 'src/app/shared/models/basket-product';
import { BasketProductPage } from 'src/app/shared/models/basket-product-page';
import { Check } from 'src/app/shared/models/check';
import { Order } from 'src/app/shared/models/order';
import { PaymentMethod } from 'src/app/shared/models/payment-method';
import { PickupPointType } from 'src/app/shared/models/pickup-point-type';
import { Product } from 'src/app/shared/models/product';
import { ShippingService } from 'src/app/shared/models/shipping-service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  mapping: string = 'http://localhost:3000/order/';
  products: BasketProductPage[] = []
  allProductsPrice = 0


  constructor(private http: HttpClient, private authService: AuthService) { }

  fillOrderProducts(products: BasketProductPage[]) {
    this.products = []
    products = products.filter(prod => prod.count > 0)
    this.products = products
  }

  getOrderProducts() {
    return this.products
  }

  clearOrderProducts() {
    this.products = []
  }

  getAllProductsPrice() {
    return this.allProductsPrice
  }

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
          this.products = []
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getProductsByBasket()
              }
            })
          }
          else {
            this.makeProductPageArray(data)
          }
          return this.products
        })
      )
  }

  getProductsByOrder(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.get<Product | null>(this.mapping + `product/by_order/${id}`, httpOptions)
      .pipe(
        map((data: any) => {
          this.products = []
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getProductsByOrder(id)
              }
            })
          }
          else {
            this.makeProductPageArray(data)
          }
          return this.products
        })
      )
  }

  makeProductPageArray(data: any) {
    let count: Map<any, number> = new Map<any, number>()
    for (let elem of data) {
      let id = elem.id
      if (count.has(id)) {
        let curr: number = count.get(id) || 0
        count.set(id, curr + 1)
      }
      else {
        count.set(id, 1)
        this.products.push(new BasketProductPage(elem, 0))
      }
    }
    let ind = 0
    this.allProductsPrice = 0
    for (let entry of count.entries()) {
      this.products[ind].count = entry[1]
      this.allProductsPrice += this.products[ind].product.price * this.products[ind].count
      ind += 1
    }
  }

  deleteBasketProductByProduct(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.delete<any>(this.mapping + `basket_product/by_product/${id}`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.deleteBasketProductByProduct(id)
              }
            })
          }
          else return data
        })
      )
  }

  getPaymentMethods() {
    return this.http.get<PaymentMethod | null>(this.mapping + `payment_method`)
  }

  makeOrder(dateTime: string, products: BasketProductPage[], paymentMethod: PaymentMethod, finalPrice: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    const body = { date: dateTime, products: products, payment_method: paymentMethod, full_price: finalPrice }
    return this.http.post<Order | null>(this.mapping + `make_order/`, body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.makeOrder(dateTime, products, paymentMethod, finalPrice)
              }
            })
          }
          else return data
        })
      )
  }

  getCheckByOrder(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.get<Check | null>(this.mapping + `check/by_order/${id}`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getCheckByOrder(id)
              }
            })
          }
          else return data
        })
      )
  }

}

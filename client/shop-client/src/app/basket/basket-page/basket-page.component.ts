import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order-service/order.service';
import { Basket } from 'src/app/shared/models/basket';
import { BasketProductPage } from 'src/app/shared/models/basket-product-page';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss']
})
export class BasketPageComponent implements OnInit {
  basket: Basket = {} as Basket
  products: BasketProductPage[] = []
  finalPrice = 0

  constructor(private orderService: OrderService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.checkAuth()
    this.getBasket()
    this.getBasketProducts()

  }

  getBasket() {
    this.orderService.getBasket()
      .subscribe((data: any) => {
        let tempDate = new Date(data.begin_date)
        this.basket = new Basket(data.user, tempDate)
      })
  }

  getBasketProducts() {
    this.products = []
    this.finalPrice = 0
    this.orderService.getProductsByBasket()
      .subscribe((data: any) => {
        this.products = data
        this.finalPrice = this.orderService.getAllProductsPrice()
      })
  }

  onFinalPriceChange() {
    this.finalPrice = 0
    for (let product of this.products) {
      this.finalPrice += product.product.price * product.count
    }
  }

  onProductsChange(id: number) {
    console.log("delete", id)
    this.orderService.deleteBasketProductByProduct(id)
      .subscribe((data: any) => {
        console.log(data)
        this.getBasketProducts()
      })
  }

  onMakeOrderClick() {
    this.orderService.fillOrderProducts(this.products)
    this.router.navigate([`/make_order`])
    //корзину будем удалять только после успешного оформления заказа ВОТ
  }

  checkAuth() {
    this.authService.checkAuth().subscribe((data: any) => {
      let logined = this.authService.getAuth()
      if (!logined) {
        this.router.navigate(['/auth'])
      }
    })
  }

}

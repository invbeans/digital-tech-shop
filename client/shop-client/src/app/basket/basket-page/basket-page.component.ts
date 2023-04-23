import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order-service/order.service';
import { Basket } from 'src/app/shared/models/basket';
import { BasketProductPage } from 'src/app/shared/models/basket-product-page';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss']
})
export class BasketPageComponent implements OnInit {
  basket: Basket = {} as Basket
  products: BasketProductPage[] = []
  finalPrice = 0

  constructor(private orderService: OrderService){}

  ngOnInit(): void {
    this.getBasket()
    this.getBasketProducts()
  }

  getBasket(){
    this.orderService.getBasket()
    .subscribe((data: any) => {
      let tempDate = new Date(data.begin_date)
      this.basket = new Basket(data.user, tempDate)
    })
  }

  getBasketProducts(){
    this.products = []
    this.finalPrice = 0
    this.orderService.getProductsByBasket()
    .subscribe((data: any) => {
      let count: Map<any, number> = new Map<any, number>()
      for(let elem of data){
        let id = elem.id
        if(count.has(id)){
          let curr: number = count.get(id) || 0
          count.set(id, curr + 1)
        }
        else {
          count.set(id, 1)
          this.products.push(new BasketProductPage(elem, 0))
        }
      }
      let ind = 0
      for(let entry of count.entries()){
        this.products[ind].count = entry[1]
        this.finalPrice += this.products[ind].product.price * this.products[ind].count
        ind += 1
      }
    })
  }

  onFinalPriceChange(){
    this.finalPrice = 0
    for(let product of this.products){
      this.finalPrice += product.product.price * product.count
    }
  }

  onProductsChange(id: number){
    console.log("delete", id)
    this.orderService.deleteBasketProductByProduct(id)
    .subscribe((data: any) => {
      console.log(data)
      this.getBasketProducts()
    })
  }

}

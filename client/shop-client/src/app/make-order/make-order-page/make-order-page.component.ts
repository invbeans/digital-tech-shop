import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order-service/order.service';
import { BasketProductPage } from 'src/app/shared/models/basket-product-page';
import { PaymentMethod } from 'src/app/shared/models/payment-method';
import { ShippingMethod } from 'src/app/shared/models/shipping-method';

@Component({
  selector: 'app-make-order-page',
  templateUrl: './make-order-page.component.html',
  styleUrls: ['./make-order-page.component.scss']
})
export class MakeOrderPageComponent implements OnInit {
  products: BasketProductPage[] = []
  paymentMethod: PaymentMethod = {} as PaymentMethod
  shippingMethod: ShippingMethod = {} as ShippingMethod
  showAdressInput = false
  allProductsPrice = 0
  finalPrice = 0


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.products = this.orderService.getOrderProducts()
    for (let product of this.products) {
      this.allProductsPrice += product.product.price * product.count
      this.finalPrice = this.allProductsPrice
    }
    console.log(this.products)
  }

  onPromocodeUsed(percent: number) {
    this.finalPrice = (100 - percent)/100 * this.allProductsPrice
  }

  onPaymentMethodChange(method: PaymentMethod){
    this.paymentMethod = method //нужно при оформлении проверить, что поле заполнено
  }

  onShippingMethodChange(method: ShippingMethod){
    this.shippingMethod = method
    this.showAdressInput = true
  }
}

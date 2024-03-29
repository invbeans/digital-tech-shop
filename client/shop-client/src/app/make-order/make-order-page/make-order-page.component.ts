import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order-service/order.service';
import { ShippingOrderService } from 'src/app/services/shipping-service/shipping-order.service';
import { Adress } from 'src/app/shared/models/adress';
import { BasketProductPage } from 'src/app/shared/models/basket-product-page';
import { PaymentMethod } from 'src/app/shared/models/payment-method';
import { PickupPointType } from 'src/app/shared/models/pickup-point-type';
import { ShippingMethod } from 'src/app/shared/models/shipping-method';
import { ShippingService } from 'src/app/shared/models/shipping-service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-make-order-page',
  templateUrl: './make-order-page.component.html',
  styleUrls: ['./make-order-page.component.scss']
})
export class MakeOrderPageComponent implements OnInit {
  products: BasketProductPage[] = []
  pickupPointTypes: PickupPointType[] = []
  rawPickupPointTypes: PickupPointType[] = []
  paymentMethod: PaymentMethod = {} as PaymentMethod
  shippingMethod: ShippingMethod = {} as ShippingMethod
  adress: Adress = {} as Adress
  stringAdress = ""
  pickupPointType: PickupPointType = {} as PickupPointType
  showAdressInput = false
  showPickupPointType = false
  allProductsPrice = 0
  shippingService: ShippingService = {} as ShippingService
  shippingPrice = 0
  finalPrice = 0
  percent = 0

  orderDisabled = true


  constructor(private orderService: OrderService, private shippingOrderService: ShippingOrderService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.checkAuth()
    this.getProducts()
    this.getPickupPointTypes()
  }

  getProducts() {
    this.products = this.orderService.getOrderProducts()
    for (let product of this.products) {
      this.allProductsPrice += product.product.price * product.count
      this.finalPrice = this.allProductsPrice
    }
  }

  getPickupPointTypes() {
    this.shippingOrderService.getPickupPointTypes()
      .subscribe((data: any) => {
        for (let elem of data) {
          this.rawPickupPointTypes.push(new PickupPointType(elem.id, elem.name, elem.storage_days))
        }
        this.pickupPointTypes = this.rawPickupPointTypes.filter(elem => elem.name !== "На дом")
        this.pickupPointType = this.rawPickupPointTypes.filter(elem => elem.name === "На дом")[0]
      })
  }

  onPromocodeUsed(percent: number) {
    this.percent = percent
    this.finalPrice = (100 - percent) / 100 * this.allProductsPrice + this.shippingPrice
  }

  recountPrice() {
    this.finalPrice = (100 - this.percent) / 100 * this.allProductsPrice + this.shippingPrice
  }

  onPaymentMethodChange(method: PaymentMethod) {
    this.paymentMethod = method //нужно при оформлении проверить, что поле заполнено
    this.orderDisabled = (!this.paymentMethod.name || !this.shippingMethod.name || !this.adress.region || this.products.length == 0)
  }

  onShippingMethodChange(methodObject: any) {
    this.shippingMethod = methodObject.shippingMethod
    this.shippingService = methodObject.shippingService
    this.shippingPrice = this.shippingService.price
    this.recountPrice()
    this.pickupPointType = this.rawPickupPointTypes.filter(elem => elem.name === "На дом")[0]
    this.showAdressInput = true
    if (this.shippingMethod.name === "Самовывоз") this.showPickupPointType = true
    else this.showPickupPointType = false
    this.orderDisabled = (!this.paymentMethod.name || !this.shippingMethod.name || !this.adress.region || this.products.length == 0)
  }

  onPickupPointTypeChange(pointType: PickupPointType) {
    this.pickupPointType = pointType
  }

  onAdressChange(adress: Adress) {
    this.adress = adress
    this.orderDisabled = (!this.paymentMethod.name || !this.shippingMethod.name || !this.adress.region || this.products.length == 0)
  }

  onOrderClick() {
    let dateTime = new Date().toISOString()
    this.orderService.makeOrder(dateTime, this.products, this.paymentMethod, this.finalPrice)
    .subscribe((data: any) => {
      if(data.order){
        this.shippingOrderService.makeOrder(dateTime, data.order, data.user, this.adress, this.shippingService, this.pickupPointType)
        .subscribe((res: any) => {
          this.router.navigate(['/track-order'])
        })
      }
    })
  }

  checkAuth() {
    this.authService.checkAuth().subscribe((data: any) => {
      let logined = this.authService.getAuth()
      if(!logined){
        this.router.navigate(['/auth'])
      }
    })
  }
}

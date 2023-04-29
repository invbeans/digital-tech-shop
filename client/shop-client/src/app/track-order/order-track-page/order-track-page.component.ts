import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order-service/order.service';
import { ShippingOrderService } from 'src/app/services/shipping-service/shipping-order.service';
import { Adress } from 'src/app/shared/models/adress';
import { BasketProductPage } from 'src/app/shared/models/basket-product-page';
import { Check } from 'src/app/shared/models/check';
import { PickupPointType } from 'src/app/shared/models/pickup-point-type';
import { ShippingHistoryTrackPage } from 'src/app/shared/models/shipping-history-track-page';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.scss']
})
export class OrderTrackPageComponent implements OnInit {
  id: number = 0
  products: BasketProductPage[] = []
  adress: Adress = {} as Adress
  pickupPointType: PickupPointType = {} as PickupPointType
  shippingHistory: ShippingHistoryTrackPage[] = []
  check: Check = {} as Check
  showDays = true;

  constructor(private router: Router, private authService: AuthService, private shippingOrderService: ShippingOrderService, private orderService: OrderService) {
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.id = this.router.getCurrentNavigation()?.extras?.state?.['orderId'];
    }
  }
  ngOnInit(): void {
    this.checkAuth()
    this.getProducts()
    this.getAdress()
    this.getPickupPointType()
    this.getShippingHistory()
    this.getCheck()
  }

  getProducts() {
    this.orderService.getProductsByOrder(this.id)
      .subscribe((data: any) => {
        this.products = data
      })
  }

  checkAuth() {
    this.authService.checkAuth().subscribe((data: any) => {
      let logined = this.authService.getAuth()
      if (!logined) {
        this.router.navigate(['/auth'])
      }
    })
  }

  getAdress() {
    this.shippingOrderService.getAdressByOrder(this.id)
      .subscribe((data: any) => {
        this.adress = new Adress(data.id, data.order_adress, data.region, data.street_type, data.house, data.building, data.apartment, data.postcode)
      })
  }

  getPickupPointType() {
    this.shippingOrderService.getPickupPointByOrder(this.id)
      .subscribe((data: any) => {
        this.pickupPointType = new PickupPointType(data.id, data.name, data.storage_days)
        if(this.pickupPointType.storageDays == 0) this.showDays = false
      })
  }

  getShippingHistory() {
    this.shippingOrderService.getShippingHistoryByOrder(this.id)
      .subscribe((data: any) => {
        for (let elem of data) {
          let tempDate = new Date(elem.date)
          this.shippingHistory.push(new ShippingHistoryTrackPage(elem.id, tempDate, elem.shipping_status))
        }
        console.log(this.shippingHistory)
      })
  }

  getCheck(){
    this.orderService.getCheckByOrder(this.id)
    .subscribe((data: any) => {
      this.check = new Check(data.order, data.payment_method, data.full_price)
    })
  }

}

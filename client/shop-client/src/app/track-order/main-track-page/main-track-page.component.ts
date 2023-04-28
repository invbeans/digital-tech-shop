import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShippingOrderService } from 'src/app/services/shipping-service/shipping-order.service';
import { TrackOrderShort } from 'src/app/shared/models/track-order-short';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-main-track-page',
  templateUrl: './main-track-page.component.html',
  styleUrls: ['./main-track-page.component.scss']
})
export class MainTrackPageComponent implements OnInit {
  trackOrderItems: TrackOrderShort[] = []

  constructor(private shippingOrderService: ShippingOrderService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.checkAuth()
    this.getTrackOrders()
  }

  getTrackOrders() {
    this.shippingOrderService.getTrackOrderShort()
      .subscribe((data: any) => {
        for (let elem of data) {
          let tempDate = new Date(elem.date)
          this.trackOrderItems.push(new TrackOrderShort(elem.order, tempDate, elem.shipping_method, elem.shipping_status))
        }
      })
  }

  onTrackOrderItemClick(id: number) {
    this.router.navigate(['/track-order/order'], { state: { orderId: this.trackOrderItems[id].order } })
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

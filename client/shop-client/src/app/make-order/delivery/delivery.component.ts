import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShippingOrderService } from 'src/app/services/shipping-service/shipping-order.service';
import { ShippingMethod } from 'src/app/shared/models/shipping-method';
import { ShippingService } from 'src/app/shared/models/shipping-service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  shippingMethods: ShippingMethod[] = []
  shippingServices: ShippingService[] = []
  chosenMethod: ShippingMethod = {} as ShippingMethod
  @Output() shippingMethodChange = new EventEmitter<{ shippingMethod: ShippingMethod, shippingService: ShippingService }>()

  constructor(private shippingOrderService: ShippingOrderService) { }

  ngOnInit(): void {
    this.getShippingMethods()
  }

  getShippingMethods() {
    this.shippingOrderService.getShippingMethods()
      .subscribe((data: any) => {
        for (let elem of data) {
          this.shippingMethods.push(new ShippingMethod(elem.id, elem.name, elem.shipping_time))
          this.getShippingServices(elem.id)
        }
        this.shippingServices.sort((a, b) => (a.id || 0) - (b.id || 0))
      })
  }

  getShippingServices(id: any) {
    this.shippingOrderService.getShippingServiceByShippingMethod(id || 0)
      .subscribe((info: any) => {
        this.shippingServices.push(new ShippingService(info[0].id, info[0].name, info[0].shipping_method, info[0].price))
      })
  }


  onRadioClick(id: number) {
    this.chosenMethod = this.shippingMethods[id]
    let shippingObject = { shippingMethod: this.chosenMethod, shippingService: this.shippingServices[id] }
    this.shippingMethodChange.emit(shippingObject)
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShippingOrderService } from 'src/app/services/shipping-service/shipping-order.service';
import { ShippingMethod } from 'src/app/shared/models/shipping-method';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  shippingMethods: ShippingMethod[] = []
  chosenMethod: ShippingMethod = {} as ShippingMethod
  @Output() shippingMethodChange = new EventEmitter<ShippingMethod>()

  constructor(private shippingOrderService: ShippingOrderService){}

  ngOnInit(): void {
    this.shippingOrderService.getShippingMethods()
    .subscribe((data: any) => {
      this.shippingMethods = data
    })
  }

  onRadioClick(id: number){
    this.chosenMethod = this.shippingMethods[id]
    this.shippingMethodChange.emit(this.chosenMethod)
  }

}

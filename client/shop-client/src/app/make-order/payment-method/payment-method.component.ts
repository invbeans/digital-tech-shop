import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderService } from 'src/app/services/order-service/order.service';
import { PaymentMethod } from 'src/app/shared/models/payment-method';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  paymentMethods: PaymentMethod[] = []
  chosenMethod: PaymentMethod = {} as PaymentMethod
  @Output() paymentMethodChange = new EventEmitter<PaymentMethod>()

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getPaymentMethods()
      .subscribe((data: any) => {
        this.paymentMethods = data
      })
  }

  onRadioClick(id: number){
    this.chosenMethod = this.paymentMethods[id]
    this.paymentMethodChange.emit(this.chosenMethod)
  }

}

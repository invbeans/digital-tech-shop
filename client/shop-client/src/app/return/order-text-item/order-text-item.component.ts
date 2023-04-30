import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-order-text-item',
  templateUrl: './order-text-item.component.html',
  styleUrls: ['./order-text-item.component.scss']
})
export class OrderTextItemComponent {
  @Input() order: Order = {} as Order
  @Input() products: Product = {} as Product
  @Output() orderClicked = new EventEmitter<boolean>()

  onOrderClick(){
    this.orderClicked.emit(true)
  }
}

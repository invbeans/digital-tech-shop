import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order-service/order.service';
import { ProductProdPage } from 'src/app/shared/models/product-prod-page';

@Component({
  selector: 'app-product-short',
  templateUrl: './product-short.component.html',
  styleUrls: ['./product-short.component.scss']
})
export class ProductShortComponent {
  @Input() product: ProductProdPage = {} as ProductProdPage
  @Input() canBasket = false;

  constructor(private orderService: OrderService) { }

  onBasketClick() {
    if (this.product.amount != 0) {
      this.orderService.addBasketProduct(this.product.id || 0)
        .subscribe((data: any) => {
          console.log(data)
        })
    }
  }

}

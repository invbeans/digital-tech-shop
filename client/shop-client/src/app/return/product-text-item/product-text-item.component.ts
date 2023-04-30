import { Component, Input, Output } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductReturnPage } from 'src/app/shared/models/product-return-page';

@Component({
  selector: 'app-product-text-item',
  templateUrl: './product-text-item.component.html',
  styleUrls: ['./product-text-item.component.scss']
})
export class ProductTextItemComponent {
  @Input() product: ProductReturnPage = {} as ProductReturnPage
  @Input() listNumber = 0

  onChoseClick(){
    this.product.chosen = !this.product.chosen
    if(!this.product.chosen) this.product.properQuality = false
  }
  
}

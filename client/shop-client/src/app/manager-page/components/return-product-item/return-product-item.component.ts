import { Component, Input } from '@angular/core';
import { ProductReturnPage } from 'src/app/shared/models/product-return-page';

@Component({
  selector: 'app-return-product-item',
  templateUrl: './return-product-item.component.html',
  styleUrls: ['./return-product-item.component.scss']
})
export class ReturnProductItemComponent {
  @Input() product: ProductReturnPage = {} as ProductReturnPage
}

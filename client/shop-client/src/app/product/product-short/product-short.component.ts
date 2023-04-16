import { Component, Input, OnInit } from '@angular/core';
import { ProductProdPage } from 'src/app/shared/models/product-prod-page';

@Component({
  selector: 'app-product-short',
  templateUrl: './product-short.component.html',
  styleUrls: ['./product-short.component.scss']
})
export class ProductShortComponent {
  @Input() product: ProductProdPage = {} as ProductProdPage 

}

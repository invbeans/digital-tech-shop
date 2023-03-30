import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product_name = "Название";
  @Input() product_price = "100000000р";
  @Input() product_rate = "5.5";
  @Input() image_link = "https://designshack.net/wp-content/uploads/placeholder-image.png"

}

import { state } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() id = "";

  constructor(private router: Router){}

  onClick(){
    this.router.navigate(['/product'], {state: {productId: this.id}})
  }
}

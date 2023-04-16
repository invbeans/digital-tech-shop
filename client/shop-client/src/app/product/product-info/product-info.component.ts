import { Component, Input } from '@angular/core';
import { PropertyValueInfo } from 'src/app/shared/models/property-value-info';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  @Input() productInfo: PropertyValueInfo[] = []
  
}

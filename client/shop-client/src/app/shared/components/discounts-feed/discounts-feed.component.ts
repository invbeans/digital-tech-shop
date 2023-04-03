import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-discounts-feed',
  templateUrl: './discounts-feed.component.html',
  styleUrls: ['./discounts-feed.component.scss']
})
export class DiscountsFeedComponent {
  @Input() actionType = "Акция 1+1";
}

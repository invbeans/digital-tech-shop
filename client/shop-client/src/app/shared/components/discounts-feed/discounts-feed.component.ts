import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-discounts-feed',
  templateUrl: './discounts-feed.component.html',
  styleUrls: ['./discounts-feed.component.scss']
})
export class DiscountsFeedComponent implements OnInit {
  @Input() actionType = "Акция 1+1";
  @Input() link = "";
  @Input() linkText = "";
  showLink = false;

  ngOnInit(): void {
    if(this.link.length > 0) this.showLink = true
  }
}

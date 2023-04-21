import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from 'src/app/shared/models/action';

@Component({
  selector: 'app-discount-type-feed',
  templateUrl: './discount-type-feed.component.html',
  styleUrls: ['./discount-type-feed.component.scss']
})
export class DiscountTypeFeedComponent implements OnInit {
  @Input() actions: Action[] = [];
  @Input() actionType: string = "";

  SUB_CATEGORY_TYPE = 1
  HOLIDAY_TYPE = 2
  BRAND_TYPE = 3
  DOUBLE_TYPE = 4

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onClick(action: Action) {
    switch (action.actionType) {
      case (this.SUB_CATEGORY_TYPE):
        this.router.navigate([`/discount/sub_category/${action.id}`])
        break
      case (this.HOLIDAY_TYPE):
        this.router.navigate([`/discount/holiday/${action.id}`])
        break
      case (this.BRAND_TYPE):
        this.router.navigate([`/discount/brand/${action.id}`])
        break
      case (this.DOUBLE_TYPE):
        this.router.navigate([`/discount/double/${action.id}`])
        break
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscountService } from 'src/app/services/discount-service/discount.service';
import { StorefrontService } from 'src/app/services/storefront-service/storefront.service';
import { Action } from 'src/app/shared/models/action';
import { ActionDoublePage } from 'src/app/shared/models/action-double-page';
import { DoubleAction } from 'src/app/shared/models/double-action';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-double-action-page',
  templateUrl: './double-action-page.component.html',
  styleUrls: ['./double-action-page.component.scss']
})
export class DoubleActionPageComponent implements OnInit {
  id: number = 0;
  actionInfo: ActionDoublePage = {} as ActionDoublePage;
  fullPriceProduct: Product = {} as Product;
  discountProduct: Product = {} as Product;

  constructor(private discountService: DiscountService, private activateRoute: ActivatedRoute, private storefrontService: StorefrontService) {
    this.activateRoute.params
      .subscribe(params => {
        this.id = params['id']
      })
  }

  ngOnInit(): void {
    this.discountService.getActionFullInfo(this.id)
    .subscribe((data: any) => {
      let tempBegin = new Date(data.action.date_begin)
      let tempEnd = new Date(data.action.date_end)
      let tempAction = new Action(data.action.id, data.action.name, tempBegin, tempEnd, data.action.percent, data.action.image, data.action.action_type)
      let tempDoubleAction = new DoubleAction(data.action.id, data.info.full_price_product, data.info.discount_product)
      this.actionInfo = new ActionDoublePage(tempAction, tempDoubleAction)
      this.storefrontService.getProductById(data.info.full_price_product)
      .subscribe((info: any) => {
        this.fullPriceProduct = info
      })
      this.storefrontService.getProductById(data.info.discount_product)
      .subscribe((info: any) => {
        this.discountProduct = info
      })
      console.log(this.actionInfo)
    })
  }
}

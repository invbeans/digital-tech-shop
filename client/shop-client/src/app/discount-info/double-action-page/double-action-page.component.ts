import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DiscountService } from 'src/app/services/discount-service/discount.service';
import { StorefrontService } from 'src/app/services/storefront-service/storefront.service';
import { Action } from 'src/app/shared/models/action';
import { ActionDoublePage } from 'src/app/shared/models/action-double-page';
import { DoubleAction } from 'src/app/shared/models/double-action';
import { ProductProdPage } from 'src/app/shared/models/product-prod-page';

@Component({
  selector: 'app-double-action-page',
  templateUrl: './double-action-page.component.html',
  styleUrls: ['./double-action-page.component.scss']
})
export class DoubleActionPageComponent implements OnInit {
  id: number = 0;
  actionInfo: ActionDoublePage = {} as ActionDoublePage;
  action: Action = {} as Action;
  fullPriceProductId = 0;
  discountProductId = 0;
  fullPriceProduct: ProductProdPage = {} as ProductProdPage;
  discountProduct: ProductProdPage = {} as ProductProdPage;

  constructor(private discountService: DiscountService, private activateRoute: ActivatedRoute, private storefrontService: StorefrontService) {
    this.activateRoute.params
      .subscribe(params => {
        this.id = params['id']
      })
  }

  ngOnInit(): void {
    this.getDoubleAction()
  }

  getDoubleAction() {
    this.discountService.getActionFullInfo(this.id)
      .subscribe((data: any) => {
        let tempBegin = new Date(data.action.date_begin)
        let tempEnd = new Date(data.action.date_end)
        this.action = new Action(data.action.id, data.action.name, tempBegin, tempEnd, data.action.percent, data.action.image, data.action.action_type)
        this.getProducts(data.info.full_price_product, data.info.discount_product)
      })
  }

  getProducts(fullPriceId: number, discountId: number) {
    this.storefrontService.getProductProdPageById(fullPriceId)
      .subscribe((info: any) => {
        this.fullPriceProduct = info
        console.log(this.fullPriceProduct)
      })
    this.storefrontService.getProductProdPageById(discountId)
      .subscribe((info: any) => {
        this.discountProduct = info
        this.prepareFields()
      })
  }

  prepareFields(){
    let tempDoubleAction = new DoubleAction(this.action.id, this.fullPriceProduct.id || 0, this.discountProduct.id || 0)
    this.actionInfo = new ActionDoublePage(this.action, tempDoubleAction)
  }
}

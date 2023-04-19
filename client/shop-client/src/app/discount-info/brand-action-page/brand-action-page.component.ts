import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscountService } from 'src/app/services/discount-service/discount.service';
import { StorefrontService } from 'src/app/services/storefront-service/storefront.service';
import { Action } from 'src/app/shared/models/action';
import { ActionBrandPage } from 'src/app/shared/models/action-brand-page';
import { BrandAction } from 'src/app/shared/models/brand-action';
import { Manufacturer } from 'src/app/shared/models/manufacturer';

@Component({
  selector: 'app-brand-action-page',
  templateUrl: './brand-action-page.component.html',
  styleUrls: ['./brand-action-page.component.scss']
})
export class BrandActionPageComponent implements OnInit {
  id: number = 0;
  actionInfo: ActionBrandPage = {} as ActionBrandPage;
  manufacturer: Manufacturer = {} as Manufacturer;

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
        let tempBrandAction = new BrandAction(data.action.id, data.info.manufacturer)
        this.actionInfo = new ActionBrandPage(tempAction, tempBrandAction)
        this.storefrontService.getManufacturerById(data.info.manufacturer)
          .subscribe((info: any) => {
            this.manufacturer = info
          })
        console.log(this.actionInfo)
      })
  }

}

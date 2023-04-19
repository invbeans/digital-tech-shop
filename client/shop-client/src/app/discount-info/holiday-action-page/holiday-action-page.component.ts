import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscountService } from 'src/app/services/discount-service/discount.service';
import { StorefrontService } from 'src/app/services/storefront-service/storefront.service';
import { Action } from 'src/app/shared/models/action';
import { ActionHolidayPage } from 'src/app/shared/models/action-holiday-page';
import { HolidayAction } from 'src/app/shared/models/holiday-action';
import { SubCategory } from 'src/app/shared/models/sub-category';

@Component({
  selector: 'app-holiday-action-page',
  templateUrl: './holiday-action-page.component.html',
  styleUrls: ['./holiday-action-page.component.scss']
})
export class HolidayActionPageComponent implements OnInit {
  id: number = 0;
  actionInfo: ActionHolidayPage = {} as ActionHolidayPage;
  subCategory: SubCategory = {} as SubCategory;

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
      let tempHolidayAction = new HolidayAction(data.info.id, data.action.id, data.info.sub_category)
      this.actionInfo = new ActionHolidayPage(tempAction, tempHolidayAction)
      this.storefrontService.getSubCategoryById(data.info.sub_category)
      .subscribe((info: any) => {
        this.subCategory = info
      })
    })
  }

}

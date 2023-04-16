import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/services/discount-service/discount.service';
import { Action } from 'src/app/shared/models/action';

@Component({
  selector: 'app-discounts-page',
  templateUrl: './discounts-page.component.html',
  styleUrls: ['./discounts-page.component.scss']
})
export class DiscountsPageComponent implements OnInit {
  subCategoryActions: Action[] = []
  holidayActions: Action[] = []
  brandActions: Action[] = []
  doubleActions: Action[] = []

  showSubCategory: boolean = false
  showHoliday: boolean = false
  showBrand: boolean = false
  showDouble: boolean = false

  constructor(private discountService: DiscountService) { }

  ngOnInit(): void {
    this.getActions()
  }

  getActions() {
    this.discountService.getActionsByTypes(1)
      .subscribe((data: any) => {
        this.subCategoryActions = this.prepareActions(data)
        if (this.subCategoryActions.length > 0) this.showSubCategory = true
      })
    this.discountService.getActionsByTypes(2)
      .subscribe((data: any) => {
        this.holidayActions = this.prepareActions(data)
        if (this.holidayActions.length > 0) this.showHoliday = true
      })
    this.discountService.getActionsByTypes(3)
      .subscribe((data: any) => {
        this.brandActions = this.prepareActions(data)
        if (this.brandActions.length > 0) this.showBrand = true
      })
    this.discountService.getActionsByTypes(4)
      .subscribe((data: any) => {
        this.doubleActions = this.prepareActions(data)
        if (this.doubleActions.length > 0) this.showDouble = true
      })
  }

  prepareActions(actions: any): Action[] {
    let preparedActions: Action[] = []
    for (let action of actions) {
      let tempBegin = new Date(action.date_begin)
      let tempEnd = new Date(action.date_end)
      preparedActions.push(new Action(action.id, action.name, tempBegin, tempEnd, action.percent, action.image, action.action_type))
    }
    return preparedActions
  }

}

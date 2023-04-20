import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DiscountService } from 'src/app/services/discount-service/discount.service';
import { StorefrontService } from 'src/app/services/storefront-service/storefront.service';
import { Action } from 'src/app/shared/models/action';
import { ActionSubCatPage } from 'src/app/shared/models/action-sub-cat-page';
import { SubCategory } from 'src/app/shared/models/sub-category';
import { SubCategoryAction } from 'src/app/shared/models/sub-category-action';
import { SubCatPageComponent } from 'src/app/sub-cat/sub-cat-page/sub-cat-page.component';

@Component({
  selector: 'app-sub-category-action-page',
  templateUrl: './sub-category-action-page.component.html',
  styleUrls: ['./sub-category-action-page.component.scss']
})
export class SubCategoryActionPageComponent implements OnInit {
   id: number = 0;
   actionInfo: ActionSubCatPage = {} as ActionSubCatPage;
   subCategory: SubCategory = {} as SubCategory;

  constructor(private discountService: DiscountService, private activateRoute: ActivatedRoute, private storefrontService: StorefrontService, private router: Router) {
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
      let tempSubCategoryAction = new SubCategoryAction(data.action.id, data.info.sub_category)
      this.actionInfo = new ActionSubCatPage(tempAction, tempSubCategoryAction)
      this.storefrontService.getSubCategoryById(data.info.sub_category)
      .subscribe((info: any) => {
        let tempSubCategory = new SubCategory(info.id, info.main_category, info.name)
        this.subCategory = tempSubCategory
      })
    })
  }

  onSubCategoryClick(){
    this.router.navigate([`/main_category/${this.subCategory.id}`])
  }

}

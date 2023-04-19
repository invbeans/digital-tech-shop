import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription} from 'rxjs';
import { DiscountService } from 'src/app/services/discount-service/discount.service';
import { Action } from 'src/app/shared/models/action';
import { BrandAction } from 'src/app/shared/models/brand-action';

@Component({
  selector: 'app-discount-info-page',
  templateUrl: './discount-info-page.component.html',
  styleUrls: ['./discount-info-page.component.scss']
})
export class DiscountInfoPageComponent implements OnInit {
  id: number | undefined;
  action: Action = {} as Action
  actionInfo: any = {}
  actionInfoPromise: Observable<Object>| undefined = undefined
  actionType = 0

  constructor(private discountService: DiscountService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let subscription: Subscription = this.activateRoute.params
      .subscribe(params => {
        this.id = params['id']
        this.getActionInfo()
      })
  }

  getAction() {
    let actionType = 0
    if (this.id !== undefined) {
      this.discountService.getActionById(this.id)
        .subscribe((data: any) => {
          this.action = data
          this.actionType = this.action.actionType
          actionType = this.action.actionType
          console.log(this.action)
        })
        
    }
  }

  getActionInfo() {
    if (this.id !== undefined) {
      console.log(this.id)
      this.discountService.getActionFullInfo(this.id)
        .subscribe((info: any) => {
          this.actionInfo = info
          this.actionInfoPromise = info
          console.log(info)
        })
    }
  }
}

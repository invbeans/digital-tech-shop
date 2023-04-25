import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Action } from 'src/app/shared/models/action';
import { BrandAction } from 'src/app/shared/models/brand-action';
import { DoubleAction } from 'src/app/shared/models/double-action';
import { HolidayAction } from 'src/app/shared/models/holiday-action';
import { Promocode } from 'src/app/shared/models/promocode';
import { SubCategoryAction } from 'src/app/shared/models/sub-category-action';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  mapping: string = 'http://localhost:3000/discount/';
  action: Action = {} as Action
  tempInfo = {} as any
  SUB_CATEGORY_TYPE = 1;
  HOLIDAY_TYPE = 2;
  BRAND_TYPE = 3;
  DOUBLE_TYPE = 4;

  constructor(private http: HttpClient) { }

  getActionsByTypes(id: number) {
    return this.http.get<Action | null>(this.mapping + `action/by_type/${id}`)
  }

  getActionById(id: number) {
    return this.http.get<Action | null>(this.mapping + `action/${id}`)
  }

  getActionFullInfo(id: number) {
    return this.http.get(this.mapping + `action_info/${id}`)
  }

  getActionInfo(actionId: number, actionType: number): Observable<any> {
    switch (actionId) {
      case this.SUB_CATEGORY_TYPE:
        return this.getSubCategoryActionInfo(actionId);
      case this.HOLIDAY_TYPE:
        return this.getHolidayActionInfo(actionId);
      case this.BRAND_TYPE:
        return this.getBrandActionInfo(actionId);
      default:
        return this.getDoubleActionInfo(actionId);
    }
  }

  getSubCategoryActionInfo(id: number) {
    return this.http.get<SubCategoryAction | null>(this.mapping + `sub_category_action/by_action/${id}`)
  }

  getHolidayActionInfo(id: number) {
    return this.http.get<HolidayAction | null>(this.mapping + `holiday_action/by_action/${id}`)
  }

  getBrandActionInfo(id: number) {
    return this.http.get<BrandAction | null>(this.mapping + `brand_action/by_action/${id}`)
  }

  getDoubleActionInfo(id: number) {
    return this.http.get<DoubleAction | null>(this.mapping + `double_action/by_action/${id}`)
  }

  getPromocodeByText(text: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    const body = { text }
    return this.http.post<Promocode | null>(this.mapping + 'promocode/get_by_text', body, httpOptions)
  }


}

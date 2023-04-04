import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from 'src/app/shared/models/action';
import { MainCategory } from 'src/app/shared/models/main-category';

@Injectable()
export class MainService {
  mapping: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getLastAction() {
    return this.http.get<Action | null>(this.mapping + 'discount/action/last');
  }

  getAllCategories() {
    return this.http.get<MainCategory | null>(this.mapping + 'storefront/main_category');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubCategory } from 'src/app/shared/models/sub-category';

@Injectable({
  providedIn: 'root'
})
export class StorefrontService {
  mapping: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getSubcategoriesByMainCategory(id: number){
    return this.http.get<SubCategory | null>(this.mapping + `storefront/sub_category/by_main_category/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductProdPage } from 'src/app/shared/models/product-prod-page';
import { PropertyValueInfo } from 'src/app/shared/models/property-value-info';
import { SubCategory } from 'src/app/shared/models/sub-category';

@Injectable({
  providedIn: 'root'
})
export class StorefrontService {
  mapping: string = 'http://localhost:3000/storefront/';
  constructor(private http: HttpClient) { }

  getSubcategoriesByMainCategory(id: number){
    return this.http.get<SubCategory | null>(this.mapping + `sub_category/by_main_category/${id}`);
  }

  getProductsBySubCategory(id: number){
    return this.http.get<Product | null>(this.mapping + `product/by_sub_category/${id}`);
  }

  getProductById(id: number){
    return this.http.get<ProductProdPage | null>(this.mapping + `product/${id}`)
  }

  getProductPropValInfo(id: number){
    return this.http.get<PropertyValueInfo | null>(this.mapping + `product_prop_val_info/by_product/${id}`)
  }
}

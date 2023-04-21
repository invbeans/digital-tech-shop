import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainCategory } from 'src/app/shared/models/main-category';
import { Manufacturer } from 'src/app/shared/models/manufacturer';
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
    return this.http.get<Product | null>(this.mapping + `product/${id}`)
  }

  getProductProdPageById(id: number){
    return this.http.get<ProductProdPage | null>(this.mapping + `product_prod_page/${id}`)
  }

  getProductPropValInfo(id: number){
    return this.http.get<PropertyValueInfo | null>(this.mapping + `product_prop_val_info/by_product/${id}`)
  }

  getSubCategoryById(id: number){
    return this.http.get<SubCategory | null>(this.mapping + `sub_category/${id}`)
  }

  getManufacturerById(id: number){
    return this.http.get<Manufacturer | null>(this.mapping + `manufacturer/${id}`)
  }

  getProductsByManufacturer(id: number){
    return this.http.get<Product | null>(this.mapping + `product/by_manufacturer/${id}`)
  }

  getProductsByManufacturerAndSubCategory(manufacturer: number, sub_category: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    const body = { manufacturer, sub_category }
    return this.http.post<Product | null>(this.mapping + `/product/by_manufacturer_sub_category`, body, httpOptions)
  }

  getMainCategoriesByManufacturer(id: number){
    return this.http.get<MainCategory | null>(this.mapping + `main_category/by_manufacturer/${id}`)
  }

  getSubCategoriesByManufacturer(manufacturer: number, main_category: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    const body = { manufacturer, main_category }
    return this.http.post<SubCategory | null>(this.mapping + `sub_category/by_manufacturer`, body, httpOptions)
  }
}

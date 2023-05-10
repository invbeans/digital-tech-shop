import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthResponse } from 'src/app/shared/models/auth-response';
import { MainCategory } from 'src/app/shared/models/main-category';
import { Manufacturer } from 'src/app/shared/models/manufacturer';
import { Product } from 'src/app/shared/models/product';
import { ProductProdPage } from 'src/app/shared/models/product-prod-page';
import { PropertyValueInfo } from 'src/app/shared/models/property-value-info';
import { SubCategory } from 'src/app/shared/models/sub-category';
import { Supplier } from 'src/app/shared/models/supplier';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorefrontService {
  mapping: string = 'http://localhost:3000/storefront/';
  constructor(private http: HttpClient, private authService: AuthService) { }

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

  getManufacturers(){
    return this.http.get<Manufacturer | null>(this.mapping + `manufacturer/`)
  }

  changeManufacturerById(id: number, manufacturer: Manufacturer){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    const body = {name: manufacturer.name, email: manufacturer.email}
    return this.http.put<Manufacturer | null>(this.mapping + `manufacturer/${id}`, body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.changeManufacturerById(id, manufacturer)
              }
            })
          }
          else return data
        })
      )
  }

  deleteManufacturerById(id: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.delete<Manufacturer | null>(this.mapping + `manufacturer/${id}`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.deleteManufacturerById(id)
              }
            })
          }
          else return data
        })
      )
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

  getSuppliers(){
    return this.http.get<Supplier | null>(this.mapping + `supplier/`)
  }

  changeSupplierById(id: number, supplier: Supplier){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    const body = {name: supplier.name, email: supplier.email, phone: supplier.phone}
    return this.http.put<Supplier | null>(this.mapping + `supplier/${id}`, body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.changeSupplierById(id, supplier)
              }
            })
          }
          else return data
        })
      )
  }

  deleteSupplierById(id: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.delete<Supplier | null>(this.mapping + `supplier/${id}`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.deleteSupplierById(id)
              }
            })
          }
          else return data
        })
      )
  }
}

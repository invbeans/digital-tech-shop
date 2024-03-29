import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SidebarElement } from '../../models/sidebar-element';
import { MainCategory } from '../../models/main-category';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadInitDataService {
  NOT_AUTHORIZED_USER = 0;
  USER_ROLE = 4;
  CONTENT_ROLE = 3;
  MANAGER_ROLE = 2;
  ADMIN_ROLE = 1;

  mapping: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getSidebarContent(userRole: number) {
    let sidebarElements: SidebarElement[] = []
    switch (userRole) {
      case (this.ADMIN_ROLE):
        sidebarElements.push(new SidebarElement("Сотрудники ИС", "/admin/staff"))
        sidebarElements.push(new SidebarElement("Производители", "/admin/manufacturer"))
        sidebarElements.push(new SidebarElement("Поставщики", "/admin/supplier"))
        sidebarElements.push(new SidebarElement("Сервисы доставки", "/admin/shipping_service"))
        return of(sidebarElements) 
      case(this.MANAGER_ROLE):
        sidebarElements.push(new SidebarElement("Возвраты", "/manager/return"))
        sidebarElements.push(new SidebarElement("Статистика заказов", "/manager/orders"))
        sidebarElements.push(new SidebarElement("Статистика товаров", "/manager/products_stats"))
        return of(sidebarElements)
      case(this.CONTENT_ROLE):
        sidebarElements.push(new SidebarElement("Категории/Подкатегории", "content/cat_subcat")),
        sidebarElements.push(new SidebarElement("Характеристики товаров", "content/property")),
        sidebarElements.push(new SidebarElement("Значения характеристик товаров", "content/property_value")),
        sidebarElements.push(new SidebarElement("Товары", "content/product")),
        sidebarElements.push(new SidebarElement("Акции", "content/discount")),
        sidebarElements.push(new SidebarElement("Промокоды", "content/promocode"))
        return of(sidebarElements)
      default:
        return this.http.get<MainCategory | null>(this.mapping + 'storefront/main_category')
          .pipe(
            map((data: any) => {
              for (let mainCat of data) {
                let elem = new SidebarElement(mainCat.name, `/main_category/${mainCat.id}`)
                sidebarElements.push(elem)
              }
              return sidebarElements
            })
          )
    }
  }
}

import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {

  products: Product[] = []
  constructor() { }

  updateProducts(newProducts: Product[]) {
    this.products = newProducts
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { SearchProductsService } from 'src/app/shared/services/search-products-state/search-products.service';

@Component({
  selector: 'app-search-products-page',
  templateUrl: './search-products-page.component.html',
  styleUrls: ['./search-products-page.component.scss']
})
export class SearchProductsPageComponent{
  products: Product[] = []
  
  constructor(private searchProductsService: SearchProductsService){
    this.products = this.searchProductsService.products
  }

}

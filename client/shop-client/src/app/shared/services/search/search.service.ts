import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product';

@Injectable()
export class SearchService {
  mapping: string = 'http://localhost:3000/storefront/';
  constructor(private http: HttpClient) { }

  searchProducts(searchStr: string) {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type':  'application/json'
      })
    };

    const body = {input: searchStr};
    return this.http.post<Product | null>(this.mapping + 'product/search', body, httpOptions);
  }
}

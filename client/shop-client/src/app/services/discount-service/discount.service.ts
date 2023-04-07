import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from 'src/app/shared/models/action';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  mapping: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getActionsByTypes(id: number) {
    return this.http.get<Action | null>(this.mapping + `discount/action/by_type/${id}`)
  }
}

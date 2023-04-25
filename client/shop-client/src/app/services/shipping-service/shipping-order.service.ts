import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from 'src/app/shared/models/city';
import { Region } from 'src/app/shared/models/region';
import { ShippingMethod } from 'src/app/shared/models/shipping-method';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingOrderService {
  mapping: string = 'http://localhost:3000/shipping/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getShippingMethods() {
    return this.http.get<ShippingMethod | null>(this.mapping + `shipping_method`)
  }

  getRegions() {
    return this.http.get<Region | null>(this.mapping + `region`)
  }

  getCitiesByRegion(id: number) {
    return this.http.get<City | null>(this.mapping + `city/by_region/${id}`)
  }
}

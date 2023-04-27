import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Adress } from 'src/app/shared/models/adress';
import { AuthResponse } from 'src/app/shared/models/auth-response';
import { City } from 'src/app/shared/models/city';
import { District } from 'src/app/shared/models/district';
import { PickupPointType } from 'src/app/shared/models/pickup-point-type';
import { Region } from 'src/app/shared/models/region';
import { ShippingHistory } from 'src/app/shared/models/shipping-history';
import { ShippingMethod } from 'src/app/shared/models/shipping-method';
import { ShippingService } from 'src/app/shared/models/shipping-service';
import { Street } from 'src/app/shared/models/street';
import { StreetType } from 'src/app/shared/models/street-type';
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

  getDistrictsByCity(id: number) {
    return this.http.get<District | null>(this.mapping + `district/by_city/${id}`)
  }

  getStreetByDistrictAndCity(district: number, city: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    const body = { district, city }
    return this.http.post<Street | null>(this.mapping + `street/by_district_and_city`, body, httpOptions)
  }

  getStreetTypes() {
    return this.http.get<StreetType | null>(this.mapping + "street_type/")
  }

  getPickupPointTypes() {
    return this.http.get<PickupPointType | null>(this.mapping + "pickup_point_type/")
  }

  getShippingServiceByShippingMethod(id: number){
    return this.http.get<ShippingService | null>(this.mapping + `shipping_service/by_method/${id}`)
  }

  makeOrder(dateTime: string, orderId: number, adress: Adress, shippingService: ShippingService, pickupPointType: PickupPointType) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    const body = {date: dateTime, order: orderId, adress, shipping_service: shippingService, pickup_point_type: pickupPointType}
    return this.http.post<ShippingHistory | null>(this.mapping + `make_order/`, body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.makeOrder(dateTime, orderId, adress, shippingService, pickupPointType)
              }
            })
          }
          else return data
        })
      )
  }
}

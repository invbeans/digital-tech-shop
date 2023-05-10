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
import { ShippingHistoryTrackPage } from 'src/app/shared/models/shipping-history-track-page';
import { ShippingMethod } from 'src/app/shared/models/shipping-method';
import { ShippingService } from 'src/app/shared/models/shipping-service';
import { ShippingServiceAdmin } from 'src/app/shared/models/shipping-service-admin';
import { Street } from 'src/app/shared/models/street';
import { StreetType } from 'src/app/shared/models/street-type';
import { TrackOrderShort } from 'src/app/shared/models/track-order-short';
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

  makeOrder(dateTime: string, orderId: number, user: number, adress: Adress, shippingService: ShippingService, pickupPointType: PickupPointType) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    const body = {date: dateTime, order: orderId, user, adress, shipping_service: shippingService, pickup_point_type: pickupPointType}
    return this.http.post<ShippingHistory | null>(this.mapping + `make_order/`, body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.makeOrder(dateTime, orderId, user, adress, shippingService, pickupPointType)
              }
            })
          }
          else return data
        })
      )
  }

  getTrackOrderShort() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.get<TrackOrderShort | null>(this.mapping + `track_order_short/`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getTrackOrderShort()
              }
            })
          }
          else return data
        })
      )
  }

  getAdressByOrder(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.get<Adress | null>(this.mapping + `/adress/by_order/${id}`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getAdressByOrder(id)
              }
            })
          }
          else return data
        })
      )
  }

  getPickupPointByOrder(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.get<PickupPointType | null>(this.mapping + `/pickup_point_type/by_order/${id}`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getPickupPointByOrder(id)
              }
            })
          }
          else return data
        })
      )
  }

  getShippingHistoryByOrder(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.get<ShippingHistoryTrackPage | null>(this.mapping + `/shipping_history_track/by_order/${id}`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getShippingHistoryByOrder(id)
              }
            })
          }
          else return data
        })
      )
  }

  getShippingServicesForAdmin() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.get<ShippingServiceAdmin | null>(this.mapping + `/shipping_service/full_info`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getShippingServicesForAdmin()
              }
            })
          }
          else return data
        })
      )
  }

  changeShippingServicesById(id: number, shippingService: ShippingService) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    const body = {name: shippingService.name, shipping_method: shippingService.shippingMethod, price: shippingService.price}
    return this.http.put<ShippingService | null>(this.mapping + `/shipping_service/${id}`, body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.changeShippingServicesById(id, shippingService)
              }
            })
          }
          else return data
        })
      )
  }

  deleteShippingServicesById(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.delete<ShippingService | null>(this.mapping + `/shipping_service/${id}`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.deleteShippingServicesById(id)
              }
            })
          }
          else return data
        })
      )
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShippingOrderService } from 'src/app/services/shipping-service/shipping-order.service';
import { EditObject } from 'src/app/shared/models/edit-object';
import { ShippingMethod } from 'src/app/shared/models/shipping-method';
import { ShippingService } from 'src/app/shared/models/shipping-service';
import { ShippingServiceAdmin } from 'src/app/shared/models/shipping-service-admin';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-shipping-service-page',
  templateUrl: './shipping-service-page.component.html',
  styleUrls: ['./shipping-service-page.component.scss']
})
export class ShippingServicePageComponent implements OnInit {
  shippingServices: ShippingServiceAdmin[] = []
  shippingMethods: ShippingMethod[] = []
  chosenShippingMethod: number = 0
  readonlyArr: boolean[] = []
  tempShippingService: ShippingService = {} as ShippingService

  constructor(private shippingOrderService: ShippingOrderService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.checkAuth()
    this.getShippingServices()
    this.getShippingMethods()
  }

  getShippingServices() {
    this.shippingOrderService.getShippingServicesForAdmin()
      .subscribe((data: any) => {
        this.shippingServices  = data
        for (let elem of data) {
          this.readonlyArr.push(true)
        }
      })
  }

  getShippingMethods() {
    this.shippingOrderService.getShippingMethods()
    .subscribe((data: any) => {
      for(let elem of data){
        this.shippingMethods.push(new ShippingMethod(elem.id, elem.name, elem.shipping_time))
      }
    })
  }

  onShippingServiceChanged(shippingService: ShippingService){
    this.tempShippingService = shippingService
  }

  onDeleteClick(id: number){
    this.shippingOrderService.deleteShippingServicesById(this.shippingServices[id].id || 0)
    .subscribe((data: any) => {
      this.shippingServices.filter(elem => elem.id != id)
      this.readonlyArr.pop()
    })
  }

  onNewShippingServiceClick(){
    this.shippingServices.splice(0, 0, new ShippingServiceAdmin(0, "", "", 0))
    this.readonlyArr.splice(0, 0, true)
  }

  onEditSaveClick(editObject: EditObject){
    this.readonlyArr[editObject.index] = !this.readonlyArr[editObject.index]
    if(!editObject.isEdit){ //то есть нажатие на кнопку "Сохранить"
      this.shippingOrderService.changeShippingServicesById(this.shippingServices[editObject.index].id || 0, this.tempShippingService)
      .subscribe((data: any) => {
        this.shippingServices[editObject.index] = new ShippingServiceAdmin(data.id, data.name,
          this.shippingMethods.filter(elem => elem.id == data.shipping_method)[0].name, data.price)
      })
    }
  }

  checkAuth() {
    this.authService.checkAuth().subscribe((data: any) => {
      let logined = this.authService.getAuth()
      if (!logined) {
        this.router.navigate(['/auth'])
      }
    })

  }
}

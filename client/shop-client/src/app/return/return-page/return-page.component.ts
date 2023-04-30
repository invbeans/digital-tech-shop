import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/services/activity-service/activity.service';
import { OrderService } from 'src/app/services/order-service/order.service';
import { Order } from 'src/app/shared/models/order';
import { Product } from 'src/app/shared/models/product';
import { ProductReturnPage } from 'src/app/shared/models/product-return-page';
import { ReturnApplication } from 'src/app/shared/models/return-application';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-return-page',
  templateUrl: './return-page.component.html',
  styleUrls: ['./return-page.component.scss']
})
export class ReturnPageComponent implements OnInit{
  returnApplications: ReturnApplication[] = []
  orders: Order[] = []
  products: ProductReturnPage[] = []
  openedOrder: number = 0
  applicationForm: FormGroup

  constructor(private authService: AuthService, private activityService: ActivityService, private router: Router, private orderService: OrderService){
    this.applicationForm = new FormGroup({
      "text": new FormControl("", Validators.required)
    })
  }

  ngOnInit(): void {
    this.checkAuth()
    this.getReturnApplicationsByUser()
    this.getOrdersByUser()
  }

  checkAuth() {
    this.authService.checkAuth().subscribe((data: any) => {
      let logined = this.authService.getAuth()
      if (!logined) {
        this.router.navigate(['/auth'])
      }
    })
  }

  haveChosenProducts(){
    for(let item of this.products){
      if (item.chosen == true) return true
    }
    return false
  }

  getReturnApplicationsByUser(){
    this.activityService.getReturnApplicationsByUser()
    .subscribe((data: any) => {
      this.returnApplications = data
    })
  }

  getOrdersByUser(){
    this.orderService.getOrdersByUser()
    .subscribe((data: any) => {
      for(let elem of data){
        let tempDate = new Date(elem.date)
        this.orders.push(new Order(elem.id, elem.user, tempDate))
      }
    })
  }

  onOrderClick(id: number){
    this.products = []
    this.openedOrder = id
    this.orderService.getShortProductsByOrder(id)
    .subscribe((data: any) => {
      for(let elem of data){
        this.products.push(new ProductReturnPage(elem, false, false))
      }
    })
  }

  submitApplication(){
    console.log(this.products)
    let chosenProducts: ProductReturnPage[] = []
    for(let elem of this.products){
      if (elem.chosen) chosenProducts.push(elem)
    }
    this.activityService.postReturnApplication(this.products, this.openedOrder, this.applicationForm.controls["text"].getRawValue())
    .subscribe((data: any) => {
      this.router.navigate(['/return']).then(() => location.reload())
    })
  }

}

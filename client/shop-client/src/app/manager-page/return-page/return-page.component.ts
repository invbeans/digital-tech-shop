import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/services/activity-service/activity.service';
import { OrderService } from 'src/app/services/order-service/order.service';
import { Product } from 'src/app/shared/models/product';
import { ProductReturnPage } from 'src/app/shared/models/product-return-page';
import { ReturnApplication } from 'src/app/shared/models/return-application';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-return-page',
  templateUrl: './return-page.component.html',
  styleUrls: ['./return-page.component.scss']
})
export class ReturnPageComponent implements OnInit {
  returnApplications: ReturnApplication[] = []
  returnProducts: ProductReturnPage[] = []
  openedApplication: number = 0
  changed = false
  changedText = "Сохранено!"

  constructor(private activityService: ActivityService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.checkAuth()
    this.getReturnApplications()
  }

  onReturnApplicationClick(id: number) {
    this.returnProducts = []
    this.changed = false
    this.activityService.getReturnProductsByApplication(id)
      .subscribe((data: any) => {
        for (let elem of data) {
          let tempProduct = new Product(elem.id, elem.name, elem.sub_category, elem.manufacturer, elem.supplier, elem.price, elem.rating, "", 0)
          this.returnProducts.push(new ProductReturnPage(tempProduct, true, elem.proper_quality))
        }
        this.openedApplication = id
      })
  }

  onSubmitChangesClick(id: number){
    this.activityService.changeReturnApplicationStatus(id, this.returnApplications.filter(elem => elem.id == id)[0].approved)
    .subscribe((data: any) => {
      this.changed = true
    })
  }

  getReturnApplications() {
    this.activityService.getReturnApplications()
      .subscribe((data: any) => {
        for (let elem of data) {
          let tempDate = new Date(elem.date)
          this.returnApplications.push(new ReturnApplication(elem.id, elem.user, tempDate, elem.order, elem.text, elem.approved))
        }
        console.log(data)
      })
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

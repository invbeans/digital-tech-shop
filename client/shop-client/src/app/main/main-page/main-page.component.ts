import { Component, OnInit, inject } from '@angular/core';
import { MainService } from 'src/app/services/main-service/main.service';
import { Action } from 'src/app/shared/models/action';
import { MainCategory } from 'src/app/shared/models/main-category';
import { Product } from 'src/app/shared/models/product';
import { CookieService } from 'ngx-cookie';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [MainService]
})
export class MainPageComponent implements OnInit {
  lastAction: Action | null = {} as Action;
  bestProducts: Product[] = [];
  mainCategories: MainCategory[] = [];

  constructor(private mainService: MainService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.checkAuth()
    this.getLastAction();
    this.getMainCategories();
    //this.getAllUsers()
  }

  checkAuth(){
    this.authService.checkAuth().subscribe((data: any) => console.log(data))
  }

  getLastAction() {
    this.mainService.getLastAction()
      .subscribe((data: any) => {
        this.lastAction = data
        if (this.lastAction === null) {
          this.lastAction = new Action(null, "Пока нет предложений", null, null, 0, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDVuaQbojYLTlYezNW7HPVIYO6QiLZsd8RFP86jMuySoBlJ369aVAK0Mtzo7La2hyVcxU&usqp=CAU", 0);
        } else {
          let tempBegin = new Date(data.date_begin)
          let tempEnd = new Date(data.date_end)
          this.lastAction.dateBegin = tempBegin
          this.lastAction.dateEnd = tempEnd
        }
      })
  }

  getMainCategories() {
    this.mainService.getAllCategories()
      .subscribe((data: any) => {
        this.mainCategories = data
      })
  }

  getAllUsers() {
    this.mainService.getAllUsers()
    .subscribe((data: any) => {
      console.log(data)
    })
  }

}

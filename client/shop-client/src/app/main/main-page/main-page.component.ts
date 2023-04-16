import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main-service/main.service';
import { Action } from 'src/app/shared/models/action';
import { MainCategory } from 'src/app/shared/models/main-category';
import { Product } from 'src/app/shared/models/product';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [MainService]
})
export class MainPageComponent implements OnInit {
  lastAction: Action = {} as Action;
  bestProducts: Product[] = [];
  mainCategories: MainCategory[] = [];
  actionFeedTitle = "Самое последнее предложение";
  showAction = true;

  constructor(private mainService: MainService, private router: Router, private authService: AuthService) {
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
        if (this.lastAction === undefined) {
          this.actionFeedTitle = "Пока нет предложений"
          this.showAction = false
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

  toMainCatPage(id: number | null){
    if(id !== null){
      this.router.navigate([`/main_category/${id}`])
    }
  }

}

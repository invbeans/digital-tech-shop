import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service/main.service';
import { Action } from 'src/app/shared/models/action';
import { MainCategory } from 'src/app/shared/models/main-category';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [MainService]
})
export class MainPageComponent implements OnInit {
  lastAction: Action | null = null;
  bestProducts: Product[] = [];
  mainCategories: MainCategory[] = [];

  constructor(private mainService: MainService) { }
  ngOnInit(): void {
    this.getLastAction();
    this.getMainCategories();
  }

  getLastAction() {
    this.mainService.getLastAction()
      .subscribe((data: any) => {
        this.lastAction = data
        if (this.lastAction === null) {
          this.lastAction = new Action(null, "Пока нет предложений", null, null, 0, "img", 0);
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
}

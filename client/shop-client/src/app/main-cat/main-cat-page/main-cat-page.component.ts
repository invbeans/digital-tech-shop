import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main-service/main.service';
import { MainCategory } from 'src/app/shared/models/main-category';

@Component({
  selector: 'app-main-cat-page',
  templateUrl: './main-cat-page.component.html',
  styleUrls: ['./main-cat-page.component.scss'],
  providers: [MainService]
})
export class MainCatPageComponent implements OnInit {
  mainCategories: MainCategory[] = []

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.getMainCategories()
  }

  getMainCategories() {
    this.mainService.getAllCategories()
      .subscribe((data: any) => {
        this.mainCategories = data
      })
  }

}

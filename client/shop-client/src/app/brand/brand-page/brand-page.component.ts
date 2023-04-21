import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorefrontService } from 'src/app/services/storefront-service/storefront.service';
import { MainCategory } from 'src/app/shared/models/main-category';
import { Product } from 'src/app/shared/models/product';
import { SubCategory } from 'src/app/shared/models/sub-category';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.scss']
})
export class BrandPageComponent implements OnInit {
  id: number = 0;
  mainCategories: MainCategory[] = []
  subCategories: SubCategory[] = []
  showSubCategoriesFeed = false
  showProductsFeed = false
  products: Product[] = []

  constructor(private activateRoute: ActivatedRoute, private storefrontService: StorefrontService, private router: Router) {
    this.activateRoute.params
      .subscribe(params => {
        this.id = params['id']
      })
  }

  ngOnInit(): void {
    this.getMainCategories()
  }

  getMainCategories(){
    this.mainCategories = []
    this.storefrontService.getMainCategoriesByManufacturer(this.id)
    .subscribe((data: any) => {
      this.mainCategories = data
    })
  }

  onMainCategoryClick(mainCatId: number){
    this.subCategories = []
    this.storefrontService.getSubCategoriesByManufacturer(this.id, mainCatId)
    .subscribe((data: any) => {
      this.subCategories = data
      this.showProductsFeed = false
      this.showSubCategoriesFeed = true
    })
  }

  onSubCategoryClick(subCatId: number){
    this.products = []
    this.storefrontService.getProductsByManufacturerAndSubCategory(this.id, subCatId)
    .subscribe((data: any) => {
      this.products = data
      console.log(data)
      this.showProductsFeed = true
    })
  }
}

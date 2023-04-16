import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorefrontService } from 'src/app/services/storefront-service/storefront.service';
import { Product } from 'src/app/shared/models/product';
import { SubCategory } from 'src/app/shared/models/sub-category';

@Component({
  selector: 'app-sub-cat-page',
  templateUrl: './sub-cat-page.component.html',
  styleUrls: ['./sub-cat-page.component.scss']
})
export class SubCatPageComponent implements OnInit {
  id: number | undefined;
  subCategories: SubCategory[] = [];
  products: Product[] = [];

  private subscription: Subscription;
  constructor(private storefrontService: StorefrontService, private activateRoute: ActivatedRoute, private router: Router) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.getSubCategories()
  }

  getSubCategories() {
    if (this.id !== undefined) {
      this.storefrontService.getSubcategoriesByMainCategory(this.id)
        .subscribe((data: any) => this.subCategories = data)
    }
  }

  getProducts(id: number | null) {
    this.products = [];
    if (id !== null) {
      this.storefrontService.getProductsBySubCategory(id)
        .subscribe((data: any) => {
          this.products = data
        })
    }
  }
}

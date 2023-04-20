import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorefrontService } from 'src/app/services/storefront-service/storefront.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.scss']
})
export class BrandPageComponent implements OnInit {
  id: number = 0;
  products: Product[] = []

  constructor(private activateRoute: ActivatedRoute, private storefrontService: StorefrontService, private router: Router) {
    this.activateRoute.params
      .subscribe(params => {
        this.id = params['id']
      })
  }
  ngOnInit(): void {
    this.products = []
    this.storefrontService.getProductsByManufacturer(this.id)
    .subscribe((data: any) => {
      this.products = data
    })
  }
}

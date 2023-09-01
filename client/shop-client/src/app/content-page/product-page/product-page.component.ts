import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorefrontService } from 'src/app/services/storefront-service/storefront.service';
import { MainCategory } from 'src/app/shared/models/main-category';
import { Manufacturer } from 'src/app/shared/models/manufacturer';
import { Product } from 'src/app/shared/models/product';
import { Property } from 'src/app/shared/models/property';
import { PropertyValue } from 'src/app/shared/models/property-value';
import { SubCategory } from 'src/app/shared/models/sub-category';
import { Supplier } from 'src/app/shared/models/supplier';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  productForm: FormGroup
  categories: MainCategory[] = []
  subCategories: SubCategory[] = []
  manufacturers: Manufacturer[] = []
  suppliers: Supplier[] = []
  properties: Property[] = []
  propertyValues: PropertyValue[] = []
  products: Product[] = []

  //amount, rating по умолчанию (эмаунта вообще нет в модели клоунша)
  constructor(private authService: AuthService, private storefrontService: StorefrontService, private router: Router){
    this.productForm = new FormGroup({
      "name": new FormControl(Validators.required),
      "subCategory": new FormControl(Validators.required),
      "manufacturer": new FormControl(Validators.required),
      "supplier": new FormControl(Validators.required),
      "price": new FormControl(Validators.required),
      "image_link": new FormControl(Validators.required)
    })
  }

  ngOnInit(): void {
    this.checkAuth()
    this.loadInitData()
  }

  loadInitData(){
    this.storefrontService.getProductById(5)
    .subscribe((data: any) => {
      console.log(data)
      this.productForm.controls["name"].setValue("Игровой ноутбук Компания характеристики")
      this.productForm.controls["subCategory"].setValue("Игровые ноутбуки")
      this.productForm.controls["manufacturer"].setValue("Производитель")
      this.productForm.controls["supplier"].setValue("Поставщик")
      this.productForm.controls["price"].setValue(59999)
      this.productForm.controls["image_link"].setValue("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1r7KqisD1mW1GIS3COrTq2264iwZwkEPlfQ&usqp=CAU")
      //this.productForm.controls["s"]
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

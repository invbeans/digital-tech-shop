import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatSubcatPageComponent } from './cat-subcat-page/cat-subcat-page.component';
import { PropertyPageComponent } from './property-page/property-page.component';
import { PropertyValuePageComponent } from './property-value-page/property-value-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { PromocodePageComponent } from './promocode-page/promocode-page.component';
import { SharedModule } from '../shared/shared.module';
import { Routes } from '@angular/router';
import { DiscountPageComponent } from './discount-page/discount-page.component';

const routes: Routes = [
  {path: 'cat_subcat', component: CatSubcatPageComponent},
  {path: 'property', component: PropertyPageComponent},
  {path: 'property_value', component: PropertyValuePageComponent},
  {path: 'product', component: ProductPageComponent},
  {path: 'discount', component: DiscountPageComponent},
  {path: 'promocode', component: PromocodePageComponent}
]

@NgModule({
  declarations: [
    CatSubcatPageComponent,
    PropertyPageComponent,
    PropertyValuePageComponent,
    ProductPageComponent,
    PromocodePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class ContentPageModule { }

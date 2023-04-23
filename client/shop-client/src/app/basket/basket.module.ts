import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketPageComponent } from './basket-page/basket-page.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProductInfoItemComponent } from './product-info-item/product-info-item.component';
import { ProductInfoFeedComponent } from './product-info-feed/product-info-feed.component';

const routes: Routes = [
  {path: '', component: BasketPageComponent}
]

@NgModule({
  declarations: [
    BasketPageComponent,
    ProductInfoItemComponent,
    ProductInfoFeedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    BasketPageComponent,
    ProductInfoItemComponent,
    ProductInfoFeedComponent
  ],
  providers: []
})
export class BasketModule { }

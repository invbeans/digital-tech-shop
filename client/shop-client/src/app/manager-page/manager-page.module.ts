import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnPageComponent } from './return-page/return-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { ProductsStatsPageComponent } from './products-stats-page/products-stats-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReturnFeedComponent } from './components/return-feed/return-feed.component';
import { ReturnItemComponent } from './components/return-item/return-item.component';
import { ReturnProductItemComponent } from './components/return-product-item/return-product-item.component';
import { ReturnProductFeedComponent } from './components/return-product-feed/return-product-feed.component';

const routes: Routes = [
  {path: 'return', component: ReturnPageComponent},
  {path: 'orders', component: OrdersPageComponent},
  {path: 'products_stats', component: ProductsStatsPageComponent}
]

@NgModule({
  declarations: [
    ReturnPageComponent,
    OrdersPageComponent,
    ProductsStatsPageComponent,
    ReturnFeedComponent,
    ReturnItemComponent,
    ReturnProductItemComponent,
    ReturnProductFeedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ReturnPageComponent,
    OrdersPageComponent,
    ProductsStatsPageComponent
  ],
  providers: []
})
export class ManagerPageModule { }

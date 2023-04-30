import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ReturnPageComponent } from './return-page/return-page.component';
import { ReturnFeedComponent } from './return-feed/return-feed.component';
import { ReturnItemComponent } from './return-item/return-item.component';
import { OrderTextItemComponent } from './order-text-item/order-text-item.component';
import { ProductTextItemComponent } from './product-text-item/product-text-item.component';
import { OrderTextFeedComponent } from './order-text-feed/order-text-feed.component';
import { ProductTextFeedComponent } from './product-text-feed/product-text-feed.component';

const routes: Routes = [
  {path: '', component: ReturnPageComponent}
]

@NgModule({
  declarations: [
    ReturnPageComponent,
    ReturnFeedComponent,
    ReturnItemComponent,
    OrderTextItemComponent,
    ProductTextItemComponent,
    OrderTextFeedComponent,
    ProductTextFeedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ReturnPageComponent
  ],
  providers: []
})
export class ReturnModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountsPageComponent } from './discounts-page/discounts-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DiscountTypeFeedComponent } from './discount-type-feed/discount-type-feed.component';

const routes: Routes = [
  {path: '', component: DiscountsPageComponent}
]

@NgModule({
  declarations: [
    DiscountsPageComponent,
    DiscountTypeFeedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    DiscountsPageComponent
  ]
})
export class DiscountsModule { }

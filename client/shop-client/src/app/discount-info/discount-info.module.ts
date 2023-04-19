import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountInfoPageComponent } from './discount-info-page/discount-info-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SubCategoryActionPageComponent } from './sub-category-action-page/sub-category-action-page.component';
import { HolidayActionPageComponent } from './holiday-action-page/holiday-action-page.component';
import { BrandActionPageComponent } from './brand-action-page/brand-action-page.component';
import { DoubleActionPageComponent } from './double-action-page/double-action-page.component';

const routes: Routes = [
  {path: 'sub_category/:id', component: SubCategoryActionPageComponent},
  {path: 'holiday/:id', component: HolidayActionPageComponent},
  {path: 'brand/:id', component: BrandActionPageComponent},
  {path: 'double/:id', component: DoubleActionPageComponent}
]

@NgModule({
  declarations: [
    DiscountInfoPageComponent,
    SubCategoryActionPageComponent,
    HolidayActionPageComponent,
    BrandActionPageComponent,
    DoubleActionPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    DiscountInfoPageComponent,
    SubCategoryActionPageComponent,
    HolidayActionPageComponent,
    BrandActionPageComponent,
    DoubleActionPageComponent
  ],
  providers: []
})
export class DiscountInfoModule { }

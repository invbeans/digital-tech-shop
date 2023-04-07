import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountsPageComponent } from './discounts-page/discounts-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path: '', component: DiscountsPageComponent}
]

@NgModule({
  declarations: [
    DiscountsPageComponent
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

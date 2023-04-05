import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProductsPageComponent } from './search-products-page/search-products-page.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: SearchProductsPageComponent}
]

@NgModule({
  declarations: [
    SearchProductsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    SearchProductsPageComponent
  ]
})
export class SearchProductsModule { }

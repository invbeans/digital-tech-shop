import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{path: '/main_categories', component: MainCatPageComponent},
  //{path: '', component: MainPageComponent}
  {path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  {path: 'main_categories', loadChildren: () => import('./main-cat/main-cat.module').then(m => m.MainCatModule)},
  {path: 'main_category/:id', loadChildren: () => import('./sub-cat/sub-cat.module').then(m => m.SubCatModule)},
  {path: 'search_products', loadChildren: () => import('./search-products/search-products.module').then(m => m.SearchProductsModule)},
  {path: 'discounts', loadChildren: () => import('./discounts/discounts.module').then(m => m.DiscountsModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  {path: 'discount', loadChildren: () => import('./discount-info/discount-info.module').then(m => m.DiscountInfoModule)},
  {path: 'brand/:id', loadChildren: () => import('./brand/brand.module').then(m => m.BrandModule)},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule)},
  {path: 'make_order', loadChildren: () => import('./make-order/make-order.module').then(m => m.MakeOrderModule)},
  {path: 'track-order', loadChildren: () => import('./track-order/track-order.module').then(m => m.TrackOrderModule)},
  {path: 'help', loadChildren: () => import('./help-page/help-page.module').then(m => m.HelpPageModule)},
  {path: 'return', loadChildren: () => import('./return/return.module').then(m => m.ReturnModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

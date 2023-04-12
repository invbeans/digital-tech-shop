import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminPageModule } from './admin-page/admin-page.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandModule } from './brand/brand.module';
import { ContentPageModule } from './content-page/content-page.module';
//import { DiscountsModule } from './discounts/discounts.module';
//import { MainCatModule } from './main-cat/main-cat.module';
//import { MainModule } from './main/main.module';
import { MakeOrderModule } from './make-order/make-order.module';
import { ManagerPageModule } from './manager-page/manager-page.module';
import { ProductModule } from './product/product.module';
import { ReturnModule } from './return/return.module';
import { SharedModule } from './shared/shared.module';
//import { SubCatModule } from './sub-cat/sub-cat.module';
import { TrackOrderModule } from './track-order/track-order.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    //MainModule,
    //MainCatModule,
    //SubCatModule,
    ProductModule,
    //DiscountsModule,
    BrandModule,
    MakeOrderModule,
    TrackOrderModule,
    ReturnModule,
    AdminPageModule,
    ManagerPageModule,
    ContentPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

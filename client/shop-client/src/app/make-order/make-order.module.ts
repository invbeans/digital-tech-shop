import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeOrderPageComponent } from './make-order-page/make-order-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PromocodeComponent } from './promocode/promocode.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AdressComponent } from './adress/adress.component';

const routes: Routes = [
  { path: '', component: MakeOrderPageComponent }
]

@NgModule({
  declarations: [
    MakeOrderPageComponent,
    PromocodeComponent,
    PaymentMethodComponent,
    DeliveryComponent,
    AdressComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MakeOrderPageComponent
  ],
  providers: []
})
export class MakeOrderModule { }

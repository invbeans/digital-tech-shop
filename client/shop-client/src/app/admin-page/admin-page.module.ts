import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffPageComponent } from './staff-page/staff-page.component';
import { ManufacturerPageComponent } from './manufacturer-page/manufacturer-page.component';
import { SupplierPageComponent } from './supplier-page/supplier-page.component';
import { ShippingServicePageComponent } from './shipping-service-page/shipping-service-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path: 'staff', component: StaffPageComponent},
  {path: 'shipping_service', component: ShippingServicePageComponent},
  {path: 'supplier', component: SupplierPageComponent},
  {path: 'manufacturer', component: ManufacturerPageComponent}
]

@NgModule({
  declarations: [
    StaffPageComponent,
    ManufacturerPageComponent,
    SupplierPageComponent,
    ShippingServicePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    StaffPageComponent,
    ShippingServicePageComponent,
    SupplierPageComponent,
    ManufacturerPageComponent
  ],
  providers: []
})
export class AdminPageModule { }

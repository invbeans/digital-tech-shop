import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandPageComponent } from './brand-page/brand-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path: '', component: BrandPageComponent}
]

@NgModule({
  declarations: [
    BrandPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    BrandPageComponent
  ],
  providers: []
})
export class BrandModule { }

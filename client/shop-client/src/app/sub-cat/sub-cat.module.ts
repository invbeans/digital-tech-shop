import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCatPageComponent } from './sub-cat-page/sub-cat-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path: '', component: SubCatPageComponent}
]

@NgModule({
  declarations: [
    SubCatPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    SubCatPageComponent
  ]
})
export class SubCatModule { }

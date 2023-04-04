import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCatPageComponent } from './main-cat-page/main-cat-page.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: MainCatPageComponent}
]

@NgModule({
  declarations: [
    MainCatPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MainCatPageComponent
  ]
})
export class MainCatModule { }

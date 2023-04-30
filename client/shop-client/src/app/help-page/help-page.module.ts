import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpPageComponent } from './help-page/help-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path: '', component: HelpPageComponent}
]

@NgModule({
  declarations: [
    HelpPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    HelpPageComponent
  ],
  providers: []
})
export class HelpPageModule { }

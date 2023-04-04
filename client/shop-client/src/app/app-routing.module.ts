import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main/main-page/main-page.component';
import { MainCatPageComponent } from './main-cat/main-cat-page/main-cat-page.component';

const routes: Routes = [
  //{path: '/main_categories', component: MainCatPageComponent},
  //{path: '', component: MainPageComponent}
  {path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  {path: 'main_categories', loadChildren: () => import('./main-cat/main-cat.module').then(m => m.MainCatModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

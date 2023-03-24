import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation/navigation.component';

@NgModule({
    imports: [
      CommonModule,
    ],
    declarations: [
      NavigationComponent
    ],
    providers: [
      
    ],
    exports: [
      NavigationComponent
    ]
  })
  export class SharedModule { }
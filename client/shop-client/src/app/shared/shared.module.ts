import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    imports: [
      CommonModule,
    ],
    declarations: [
      NavigationComponent,
      FooterComponent
    ],
    providers: [
      
    ],
    exports: [
      NavigationComponent,
      FooterComponent
    ]
  })
  export class SharedModule { }
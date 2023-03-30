import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarService } from './services/show-sidebar/sidebar.service';
import { EditTextItemCardComponent } from './components/edit-text-item-card/edit-text-item-card.component';
import { ProductContainerComponent } from './components/product-container/product-container.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
    imports: [
      CommonModule,
    ],
    declarations: [
      NavigationComponent,
      FooterComponent,
      SidebarComponent,
      EditTextItemCardComponent,
      ProductContainerComponent,
      ProductCardComponent
    ],
    providers: [
      SidebarService
    ],
    exports: [
      NavigationComponent,
      FooterComponent,
      SidebarComponent,
      EditTextItemCardComponent,
      ProductCardComponent,
      ProductContainerComponent
    ]
  })
  export class SharedModule { }
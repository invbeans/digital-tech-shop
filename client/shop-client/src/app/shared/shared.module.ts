import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarService } from './services/show-sidebar/sidebar.service';
import { EditTextItemCardComponent } from './components/edit-text-item-card/edit-text-item-card.component';
import { ProductContainerComponent } from './components/product-container/product-container.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { DiscountsFeedComponent } from './components/discounts-feed/discounts-feed.component';
import { DiscountsFeedItemComponent } from './components/discounts-feed-item/discounts-feed-item.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { CategoriesFeedComponent } from './components/categories-feed/categories-feed.component';

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
      ProductCardComponent,
      DiscountsFeedComponent,
      DiscountsFeedItemComponent,
      CategoriesFeedComponent,
      CategoryItemComponent
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
      ProductContainerComponent,
      DiscountsFeedComponent,
      DiscountsFeedItemComponent,
      CategoriesFeedComponent,
      CategoryItemComponent
    ]
  })
  export class SharedModule { }
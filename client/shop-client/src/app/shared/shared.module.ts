import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarService } from './services/show-sidebar/sidebar.service';
import { EditTextItemCardComponent } from './components/edit-text-item-card/edit-text-item-card.component';

@NgModule({
    imports: [
      CommonModule,
    ],
    declarations: [
      NavigationComponent,
      FooterComponent,
      SidebarComponent,
      EditTextItemCardComponent
    ],
    providers: [
      SidebarService
    ],
    exports: [
      NavigationComponent,
      FooterComponent,
      SidebarComponent,
      EditTextItemCardComponent
    ]
  })
  export class SharedModule { }
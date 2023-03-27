import { Component } from '@angular/core';
import { SidebarService } from '../../services/show-sidebar/sidebar.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(public sidebarService: SidebarService){}

  toggleSidebar(){
    this.sidebarService.toggle()
  }
}

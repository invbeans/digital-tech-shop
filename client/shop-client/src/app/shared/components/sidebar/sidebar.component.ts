import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarService } from '../../services/show-sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(public sidebarService: SidebarService){}

}

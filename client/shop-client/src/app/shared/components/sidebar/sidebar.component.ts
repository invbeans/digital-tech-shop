import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarService } from '../../services/show-sidebar/sidebar.service';
import { SidebarElement } from '../../models/sidebar-element';
import { LoadInitDataService } from '../../services/load-init-data/load-init-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges {
  @Input() userRole = 0;
  count = 0;
  sidebarElements: SidebarElement[] = []

  constructor(public sidebarService: SidebarService, private loadInitDataService: LoadInitDataService){}
 
  ngOnChanges(changes: SimpleChanges): void {
    for(const userRole in changes){
      const change = changes[userRole]
      this.userRole = change.currentValue
      this.count++;
    }
    if(this.count == 2 && this.sidebarElements.length == 0) this.loadData()
  }

  loadData(){
    this.loadInitDataService.getSidebarContent(this.userRole)
    .subscribe((data: any) => {
      this.sidebarElements = data
    })
  }

}

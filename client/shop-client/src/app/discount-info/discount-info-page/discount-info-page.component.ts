import { Component, Input, OnInit } from '@angular/core';
import { Action } from 'src/app/shared/models/action';

@Component({
  selector: 'app-discount-info-page',
  templateUrl: './discount-info-page.component.html',
  styleUrls: ['./discount-info-page.component.scss']
})
export class DiscountInfoPageComponent implements OnInit {
  @Input() action: Action = {} as Action


  ngOnInit(): void {
    
  }

  
}

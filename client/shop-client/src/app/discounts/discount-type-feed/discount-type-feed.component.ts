import { Component, Input, OnInit } from '@angular/core';
import { Action } from 'src/app/shared/models/action';

@Component({
  selector: 'app-discount-type-feed',
  templateUrl: './discount-type-feed.component.html',
  styleUrls: ['./discount-type-feed.component.scss']
})
export class DiscountTypeFeedComponent implements OnInit {
  @Input() actions: Action[] = [];
  @Input() actionType: string = "";

  ngOnInit(): void {
    
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-discounts-feed-item',
  templateUrl: './discounts-feed-item.component.html',
  styleUrls: ['./discounts-feed-item.component.scss']
})
export class DiscountsFeedItemComponent {
  @Input() dateStart = "April 5, 2025"
  @Input() dateEnd = "April 5, 2025"
  @Input() image = "https://sun9-73.userapi.com/impg/eYA8W7KRemGk6XrsOI3kAvLiDCVi0iE9fN_u_Q/fqBVirM5_5Q.jpg?size=735x733&quality=95&sign=0a3d12845f96617e1a342867e732809a&type=album"
  @Input() actionName = "Дофига акция"
  showDates = true

  dateStartDate = new Date()
  dateEndDate = new Date()
  
  ngOnInit(){
    if(this.dateStart === null) {
      this.showDates = false
    } else {
      this.dateStartDate = new Date(this.dateStart)
      this.dateEndDate = new Date(this.dateEnd)
    }
  }
}

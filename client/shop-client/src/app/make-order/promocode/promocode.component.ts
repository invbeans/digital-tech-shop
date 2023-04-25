import { Component, EventEmitter, Output } from '@angular/core';
import { DiscountService } from 'src/app/services/discount-service/discount.service';

@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.scss']
})
export class PromocodeComponent {
  promocode = ""
  promocodeUsed = false
  @Output() promocodePercent = new EventEmitter<number>()

  constructor(private discountService: DiscountService) { }

  onInputClick(text: string) {
    this.discountService.getPromocodeByText(text)
      .subscribe((data: any) => {
        this.promocodeUsed = (data[0]) ? true : false
        if(this.promocodeUsed){
          this.promocodePercent.emit(data[0].percent)
        }
        else {
          this.promocodePercent.emit(0)
        }
      })
  }
}

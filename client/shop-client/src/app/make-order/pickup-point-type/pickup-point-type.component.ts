import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShippingOrderService } from 'src/app/services/shipping-service/shipping-order.service';
import { PickupPointType } from 'src/app/shared/models/pickup-point-type';

@Component({
  selector: 'app-pickup-point-type',
  templateUrl: './pickup-point-type.component.html',
  styleUrls: ['./pickup-point-type.component.scss']
})
export class PickupPointTypeComponent implements OnInit{
  @Input() pickupPointTypes: PickupPointType[] = []
  chosenPickupPointType: PickupPointType = {} as PickupPointType
  @Output() pickupPointTypeChange = new EventEmitter<PickupPointType>()


  ngOnInit(): void {
    
  }

  onRadioClick(id: number) {
    this.chosenPickupPointType = this.pickupPointTypes[id]
    this.pickupPointTypeChange.emit(this.chosenPickupPointType)
  }

}

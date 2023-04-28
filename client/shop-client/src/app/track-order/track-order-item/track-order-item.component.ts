import { Component, Input } from '@angular/core';
import { TrackOrderShort } from 'src/app/shared/models/track-order-short';

@Component({
  selector: 'app-track-order-item',
  templateUrl: './track-order-item.component.html',
  styleUrls: ['./track-order-item.component.scss']
})
export class TrackOrderItemComponent {
  @Input() trackOrderItem: TrackOrderShort = {} as TrackOrderShort
  @Input() index = 0
}

import { Component, Input } from '@angular/core';
import { ShippingHistoryTrackPage } from 'src/app/shared/models/shipping-history-track-page';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
  @Input() shippingHistory: ShippingHistoryTrackPage[] = []
}

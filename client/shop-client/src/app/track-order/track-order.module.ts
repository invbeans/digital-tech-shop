import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTrackPageComponent } from './main-track-page/main-track-page.component';
import { OrderTrackPageComponent } from './order-track-page/order-track-page.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TrackOrderFeedComponent } from './track-order-feed/track-order-feed.component';
import { TrackOrderItemComponent } from './track-order-item/track-order-item.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  {path: '', component: MainTrackPageComponent},
  {path: 'order', component: OrderTrackPageComponent}
]

@NgModule({
  declarations: [
    MainTrackPageComponent,
    OrderTrackPageComponent,
    TrackOrderFeedComponent,
    TrackOrderItemComponent,
    OrderHistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MainTrackPageComponent,
    OrderTrackPageComponent
  ]
})
export class TrackOrderModule { }

import { Component, Input } from '@angular/core';
import { ActivityService } from 'src/app/services/activity-service/activity.service';

@Component({
  selector: 'app-review-input',
  templateUrl: './review-input.component.html',
  styleUrls: ['./review-input.component.scss']
})
export class ReviewInputComponent {
  text = "";
  points = 5;
  @Input() productId: number = 0;
  inputBtnDisabled = true

  constructor(private activityService: ActivityService){}

  sendReview(){
    this.activityService.postReview(this.text, this.points, this.productId)
    .subscribe(() => this.text = "")
  }

  checkInput(){
    this.inputBtnDisabled = (this.text.length == 0)
  }
}

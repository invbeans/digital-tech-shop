import { Component, Input } from '@angular/core';
import { ActivityService } from 'src/app/services/activity-service/activity.service';

@Component({
  selector: 'app-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.scss']
})
export class QuestionInputComponent {
  text = "";
  @Input() productId: number = 0;
  inputBtnDisabled = true

  constructor(private activityService: ActivityService){}

  sendQuestion(){
    this.activityService.postQuestion(this.text, this.productId)
    .subscribe(() => this.text = "Отправлено!")
  }

  checkInput(){
    this.inputBtnDisabled = (this.text.length == 0)
  }

}

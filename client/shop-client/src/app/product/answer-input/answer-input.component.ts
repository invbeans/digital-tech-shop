import { Component, Input } from '@angular/core';
import { ActivityService } from 'src/app/services/activity-service/activity.service';

@Component({
  selector: 'app-answer-input',
  templateUrl: './answer-input.component.html',
  styleUrls: ['./answer-input.component.scss']
})
export class AnswerInputComponent {
  text = "";
  @Input() questionId: number | null = 0;
  inputBtnDisabled = true

  constructor(private activityService: ActivityService) { }

  sendAnswer() {
    this.activityService.postAnswer(this.text, this.questionId || 0)
      .subscribe(() => this.text = "Отправлено!")
  }

  checkInput() {
    this.inputBtnDisabled = (this.text.length == 0)
  }
}

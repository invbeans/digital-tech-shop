import { Component, Input } from '@angular/core';
import { QuestionAnswer } from 'src/app/shared/models/question-answer';
import { QuestionProdPage } from 'src/app/shared/models/question-prod-page';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question: QuestionProdPage = {} as QuestionProdPage;
}

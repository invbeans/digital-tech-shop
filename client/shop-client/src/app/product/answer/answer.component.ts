import { Component, Input } from '@angular/core';
import { AnswerProdPage } from 'src/app/shared/models/answer-prod-page';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {
  @Input() answer: AnswerProdPage = {} as AnswerProdPage
}

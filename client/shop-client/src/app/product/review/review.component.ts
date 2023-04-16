import { Component, Input } from '@angular/core';
import { ReviewProdPage } from 'src/app/shared/models/review-prod-page';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input() review: ReviewProdPage = {} as ReviewProdPage;
}

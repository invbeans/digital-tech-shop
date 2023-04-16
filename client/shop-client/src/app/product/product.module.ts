import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page/product-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductShortComponent } from './product-short/product-short.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ReviewsContainerComponent } from './reviews-container/reviews-container.component';
import { ReviewComponent } from './review/review.component';
import { QuestionsAnswersContainerComponent } from './questions-answers-container/questions-answers-container.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { ReviewInputComponent } from './review-input/review-input.component';

const routes: Routes = [
  {path: '', component: ProductPageComponent}
]

@NgModule({
  declarations: [
    ProductPageComponent,
    ProductShortComponent,
    ProductInfoComponent,
    ReviewsContainerComponent,
    ReviewComponent,
    QuestionsAnswersContainerComponent,
    QuestionComponent,
    AnswerComponent,
    ReviewInputComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProductPageComponent
  ],
  providers: []
})
export class ProductModule { }

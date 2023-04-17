import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/services/activity-service/activity.service';
import { StorefrontService } from 'src/app/services/storefront-service/storefront.service';
import { ProductProdPage } from 'src/app/shared/models/product-prod-page';
import { PropertyValueInfo } from 'src/app/shared/models/property-value-info';
import { QuestionAnswer } from 'src/app/shared/models/question-answer';
import { ReviewProdPage } from 'src/app/shared/models/review-prod-page';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  id: number = 0;
  product: ProductProdPage | null = {} as ProductProdPage;
  productPropValInfo: PropertyValueInfo[] = []
  reviews: ReviewProdPage[] = []
  questionsAnswers: QuestionAnswer[] = []
  showContent = 1;
  showInputs = false;
  showManagerInputs = false;

  constructor(private storefrontService: StorefrontService, private router: Router, private activityService: ActivityService, private authService: AuthService) {
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.id = this.router.getCurrentNavigation()?.extras?.state?.['productId'];
    }
  }

  ngOnInit(): void {
    this.checkAuth()
    this.getProduct()
    this.getProductPropValInfo()
  }

  getProduct() {
    this.storefrontService.getProductById(this.id)
      .subscribe((data: any) => {
        this.product = data
      })
  }

  getProductPropValInfo() {
    this.storefrontService.getProductPropValInfo(this.id)
      .subscribe((data: any) => {
        this.productPropValInfo = data
      })
  }

  getProductReviews() {
    this.activityService.getReviewsByProduct(this.id)
      .subscribe((data: any) => {
        for (const elem of data) {
          let tempDate = new Date(elem.date)
          let revElem: ReviewProdPage = new ReviewProdPage(elem.id, elem.user, elem.product, elem.points, tempDate, elem.text)
          this.reviews.push(revElem)
        }
      })
  }

  getProductQuestionsAnswers() {
    this.activityService.getQuestionsByProduct(this.id)
    .subscribe((data: any) => {
      this.questionsAnswers = data
    })
  }

  productInfoClick() {
    this.showContent = 1;
  }

  productReviewClick() {
    if (this.reviews.length == 0) {
      this.getProductReviews()
    }
    this.showContent = 2;
  }

  productQaAClick() {
    if(this.questionsAnswers.length == 0){
      this.getProductQuestionsAnswers()
    }
    this.showContent = 3;
  }

  checkAuth() {
    this.authService.checkAuth().subscribe((data: any) => {
      this.showInputs = this.authService.getAuth()
      this.showManagerInputs = (data.userDto.role == 1 || data.userDto.role == 2)
    })
  }
}

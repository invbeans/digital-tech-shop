import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Answer } from 'src/app/shared/models/answer';
import { AnswerProdPage } from 'src/app/shared/models/answer-prod-page';
import { AuthResponse } from 'src/app/shared/models/auth-response';
import { ProductReturnPage } from 'src/app/shared/models/product-return-page';
import { Question } from 'src/app/shared/models/question';
import { QuestionProdPage } from 'src/app/shared/models/question-prod-page';
import { ReturnApplication } from 'src/app/shared/models/return-application';
import { Review } from 'src/app/shared/models/review';
import { ReviewProdPage } from 'src/app/shared/models/review-prod-page';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  mapping: string = 'http://localhost:3000/activity/'
  constructor(private http: HttpClient, private authService: AuthService) { }

  getReviewsByProduct(id: number) {
    return this.http.get<ReviewProdPage | null>(this.mapping + `review/by_product/${id}`)
  }

  getQuestionsByProduct(id: number) {
    let questionsAnswers: any = []
    return this.http.get<QuestionProdPage | null>(this.mapping + `question/by_product/${id}`)
      .pipe(
        map((questions: any) => {
          for (const question of questions) {
            let questionAnswersElem: any = {}
            let tempQuestionDate = new Date(question.date)
            let queElem = new QuestionProdPage(question.id, question.user, question.product, tempQuestionDate, question.text)
            questionAnswersElem.question = queElem
            questionAnswersElem.answers = []
            this.getAnswersByQuestion(question.id).subscribe(
              (answers: any) => {
                for (const answer of answers) {
                  let tempAnswerDate = new Date(answer.date)
                  let ansElem = new AnswerProdPage(answer.id, answer.user, answer.question, tempAnswerDate, answer.text)
                  questionAnswersElem.answers.push(ansElem)
                }
              })
            questionsAnswers.push(questionAnswersElem)
          }
        })
      ).pipe(
        map(() => questionsAnswers)
      )
  }

  getAnswersByQuestion(id: number) {
    return this.http.get<AnswerProdPage | null>(this.mapping + `answer/by_question/${id}`)
  }

  postReview(text: string, points: number, product: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    let dateTime = new Date().toISOString();
    const body = { product, points, date: dateTime, text }
    return this.http.post<Review | null>(this.mapping + 'review', body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.postReview(text, points, product)
              }
            })
          }
          else return data
        })
      )
  }

  postQuestion(text: string, product: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    let dateTime = new Date().toISOString();
    const body = { product, date: dateTime, text }
    return this.http.post<Question | null>(this.mapping + 'question', body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.postQuestion(text, product)
              }
            })
          }
          else return data
        })
      )
  }

  postAnswer(text: string, question: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    let dateTime = new Date().toISOString();
    const body = { question, date: dateTime, text }
    return this.http.post<Answer | null>(this.mapping + 'answer', body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.postAnswer(text, question)
              }
            })
          }
          else return data
        })
      )
  }

  getReturnApplicationsByUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.get<ReturnApplication | null>(this.mapping + `return_application/by_user`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getReturnApplicationsByUser()
              }
            })
          }
          else return data
        })
      )
  }

  postReturnApplication(products: ProductReturnPage[], order: number, text: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    let dateTime = new Date().toISOString();
    const body = { products, date: dateTime, order, text }
    return this.http.post<ReturnApplication | null>(this.mapping + 'return_application', body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.postReturnApplication(products, order, text)
              }
            })
          }
          else return data
        })
      )
  }

  getReturnApplications() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.get<ReturnApplication | null>(this.mapping + 'return_application', httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getReturnApplications()
              }
            })
          }
          else return data
        })
      )
  }

  getReturnProductsByApplication(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    return this.http.get<ProductReturnPage | null>(this.mapping + `return_product/by_return_application/${id}`, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.getReturnProductsByApplication(id)
              }
            })
          }
          else return data
        })
      )
  }

  changeReturnApplicationStatus(id: number, approved: boolean) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    const body = {approved: approved}
    return this.http.put<ReturnApplication | null>(this.mapping + `return_application/change_status/${id}`, body, httpOptions)
      .pipe(
        map((data: any) => {
          if (data.status === 401) {
            this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
              if (refreshData) {
                localStorage.setItem('token', refreshData.accessToken)
                this.changeReturnApplicationStatus(id, approved)
              }
            })
          }
          else return data
        })
      )
  }
}

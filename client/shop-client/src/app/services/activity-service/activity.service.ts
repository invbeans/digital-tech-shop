import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthResponse } from 'src/app/shared/models/auth-response';
import { Review } from 'src/app/shared/models/review';
import { ReviewProdPage } from 'src/app/shared/models/review-prod-page';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  mapping: string = 'http://localhost:3000/activity/'
  constructor(private http: HttpClient, private authService: AuthService) { }

  getReviewsByProduct(id: number){
    return this.http.get<ReviewProdPage | null>(this.mapping + `review/by_product/${id}`)
  }

  postReview(text: string, points: number, product: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      "observe?": "response"
    }
    let dateTime = new Date().toISOString();
    const body = {product, points, date: dateTime, text}
    console.log(dateTime)
    return this.http.post<Review | null>(this.mapping + 'review', body, httpOptions)
    .pipe(
      map((data: any) => {
        if(data.status === 401){
          this.authService.checkAuth().subscribe((refreshData: AuthResponse | null) => {
            if(refreshData){
              localStorage.setItem('token', refreshData.accessToken)
            }
          })
        }
        this.http.post<Review | null>(this.mapping + 'review', body, httpOptions)
      })
    )
  }
}

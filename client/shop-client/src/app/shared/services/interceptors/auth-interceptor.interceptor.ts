import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Beaver ${localStorage.getItem('token')}`)
    })
    
    return next.handle(authReq).pipe(
      tap(
        (event) => {
          if(event instanceof HttpResponse){
            console.log('RESPONSE')
          }
          if(event instanceof HttpRequest){
            console.log('REQUEEEEST')
            
          }
        }
      )
    )
  }
}

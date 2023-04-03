import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from 'src/app/shared/models/action';

@Injectable()
export class MainService {
  mapping: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getLastAction() {
    return this.http.get<Action | null>(this.mapping + 'discount/action/last');
  }
}

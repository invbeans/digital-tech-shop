import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isOpen$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  toggle(){
    this.isOpen$.next(!this.isOpen$.value);
  }
}

// loader.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  show() {
    console.log('Loader show called');
    this.isLoading.next(true);
  }

  hide() {
    console.log('Loader hide called');
    this.isLoading.next(false);
  }
}
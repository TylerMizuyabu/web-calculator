import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from './app-state';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private stateSubject = new BehaviorSubject<AppState>({
    calculations: new Array<string>(10),
  });

  constructor() {}

  addCalculation(c: string) {
    const { calculations } = this.stateSubject.value;
    this.stateSubject.next({
      ...this.stateSubject.value,
      calculations: [c, ...calculations.slice(0, calculations.length - 1)],
    });
  }

  getState(): Observable<AppState> {
    return this.stateSubject.asObservable();
  }
}

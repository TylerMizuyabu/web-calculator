import { Injectable, OnDestroy } from '@angular/core';
import { AppStateService } from '../app-state/app-state.service';
import { Socket } from 'ngx-socket-io';
import { Calculation } from './calculation';
import { MessageTypes } from './message-types';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerClientService implements OnDestroy {
  private newCalculationSubscription: Subscription;

  constructor(private socket: Socket, private appState: AppStateService) {
    this.newCalculationSubscription = this.socket.fromEvent<Calculation>(MessageTypes.NewCalculation).subscribe((message) => {
      if (!!message) {
        this.appState.addCalculation(`${message.equation}=${message.result}`);
      }
    });
  }

  ngOnDestroy() {
    this.newCalculationSubscription?.unsubscribe();
  }

  submitCalculation(equation: string, result: number) {
    const c: Calculation = {
      equation,
      result: `${result}`,
    };
    console.log(this.socket.emit(MessageTypes.SubmitCalculation, c));
  }
}

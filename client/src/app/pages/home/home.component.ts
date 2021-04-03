import { Component, OnInit } from '@angular/core';
import { ServerClientService } from '../../core/server-client/server-client.service';
import { AppStateService } from '../../core/app-state/app-state.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  calculations: Observable<string[]> = this.appState.getState()?.pipe(map((s) => s.calculations.filter((str) => !!str && str.length > 0)));
  constructor(private serverClient: ServerClientService, private appState: AppStateService) {}

  ngOnInit(): void {}

  submitCalculation(evaluation: [string, number]) {
    this.serverClient.submitCalculation(evaluation[0], evaluation[1]);
  }
}

import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HomeComponent } from './home.component';
import { ServerClientService } from '../../core/server-client/server-client.service';
import { AppStateService } from '../../core/app-state/app-state.service';

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  const createComponent = createComponentFactory({ component: HomeComponent, mocks: [ServerClientService, AppStateService] });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

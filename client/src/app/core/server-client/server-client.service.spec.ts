import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ServerClientService } from './server-client.service';
import { AppStateService } from '../app-state/app-state.service';
import { Socket } from 'ngx-socket-io';

describe('ServerClientService', () => {
  let spectator: SpectatorService<ServerClientService>;
  const createService = createServiceFactory({ service: ServerClientService, mocks: [Socket, AppStateService] });

  beforeEach(() => (spectator = createService()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
});

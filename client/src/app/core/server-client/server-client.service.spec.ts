import { TestBed } from '@angular/core/testing';

import { ServerClientService } from './server-client.service';

describe('ServerClientService', () => {
  let service: ServerClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

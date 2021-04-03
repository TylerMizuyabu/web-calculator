import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { InputComponent } from './input.component';
import { EvaluatorService } from '../shared/evaluator.service';
import { AppStateService } from '../../core/app-state/app-state.service';
import { TokenizerService } from '../shared/tokenizer.service';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('InputComponent', () => {
  let spectator: Spectator<InputComponent>;
  const createComponent = createComponentFactory({
    component: InputComponent,
    mocks: [TokenizerService, EvaluatorService, AppStateService, MatSnackBar],
    imports: [MatCardModule],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

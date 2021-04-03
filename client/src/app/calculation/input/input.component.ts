import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { TokenizerService } from '../shared/tokenizer.service';
import { EvaluatorService } from '../shared/evaluator.service';
import { of, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isUndefined } from 'util';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Output() evaluation: EventEmitter<[string, number]> = new EventEmitter<[string, number]>();
  equationControl: FormControl;
  showError: boolean = false;

  constructor(private tokenizer: TokenizerService, private evaluator: EvaluatorService, private snackBar: MatSnackBar) {
    this.equationControl = new FormControl('', []);
  }

  submit(event: Event) {
    event.preventDefault();
    of(this.tokenizer.tokenize(this.equationControl.value))
      .pipe(
        map((tokens) => this.evaluator.toRPN(tokens)),
        map((tokens) => this.evaluator.evaluateRPN(tokens)),
        catchError((err: Error) => {
          this.displayError(err.message);
          return EMPTY;
        })
      )
      .subscribe((result) => {
        if (isUndefined(result)) {
          this.displayError('Unable to evaluate expression');
        } else {
          this.evaluation.emit([this.equationControl.value, result]);
        }
      });
  }

  displayError(err: string) {
    this.snackBar.open(err, 'Dismiss', { duration: 5000 });
  }

  disableButton(): boolean {
    return this.equationControl.value === '';
  }

  ngOnInit(): void {}
}

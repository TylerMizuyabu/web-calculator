import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { TokenizerService } from '../shared/tokenizer.service';
import { EvaluatorService } from '../shared/evaluator.service';
import { of, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  submit() {
    of(this.tokenizer.tokenize(this.equationControl.value))
      .pipe(
        map((tokens) => this.evaluator.toShuntingYard(tokens)),
        map((tokens) => this.evaluator.evaluateShuntingYard(tokens)),
        catchError((err: Error) => {
          this.displayError(err.message);
          return EMPTY;
        })
      )
      .subscribe((result) => {
        result = result || 0;
        this.evaluation.emit([this.equationControl.value, result]);
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

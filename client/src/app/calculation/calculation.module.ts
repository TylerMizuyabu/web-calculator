import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TokenizerService } from './shared/tokenizer.service';
import { EvaluatorService } from './shared/evaluator.service';
import { InstructionCardComponent } from './instruction-card/instruction-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [InputComponent, InstructionCardComponent],
  imports: [CommonModule, MatFormFieldModule, MatCardModule, MatInputModule, MatSnackBarModule, MatButtonModule, ReactiveFormsModule, BrowserModule],
  providers: [TokenizerService, EvaluatorService],
  exports: [InputComponent, InstructionCardComponent],
})
export class CalculationModule {}

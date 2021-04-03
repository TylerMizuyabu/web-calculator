import { Injectable } from '@angular/core';
import Token, { TokenType, AssociativityType } from './token';
import { missingFunctionRequirements, fnMap } from './functions';

@Injectable({
  providedIn: 'root',
})
export class EvaluatorService {
  evaluateShuntingYard(tokens: Token[]): number {
    let stack: number[] = [];
    for (let token of tokens) {
      if (token.isTokenType(TokenType.Literal)) {
        stack.push(parseFloat(token.getTokenValue()));
      } else if (token.isTokenType(TokenType.Operator)) {
        if (stack.length < 2) {
          throw new Error(`Invalid expression.  Operator ${token.getTokenValue()} expects atleast 2 operands`);
        }

        const operator1 = stack.pop();
        const operator2 = stack.pop();
        switch (token.getTokenValue()) {
          case '+':
            stack.push(operator1 + operator2);
            break;
          case '-':
            stack.push(operator2 - operator1);
            break;
          case '/':
            if (operator1 === 0) {
              throw new Error(`Invalid expression. Attempted to divide by zero`);
            }
            stack.push(operator2 / operator1);
            break;
          case '*':
            stack.push(operator1 * operator2);
            break;
          case '^':
            stack.push(Math.pow(operator2, operator1));
            break;
          default:
            throw new Error(`Invalid expression. Unrecognized operator ${token.getTokenValue()}`);
        }
      } else if (token.isTokenType(TokenType.Function)) {
        const fn = fnMap.get(token.getTokenValue());
        if (!fn) {
          throw new Error(`Invalid expression. Unrecognized function ${token.getTokenValue()}`);
        }

        const errors = missingFunctionRequirements(stack.length, fn);
        if (errors.length > 0) {
          throw new Error(`Invalid expression. Function ${token.getTokenValue()} has the following requirements:\n${errors.join('\n')}`);
        }

        const args = [];
        while (stack.length > 0 && (!fn.maxArgs || args.length < fn.maxArgs)) {
          args.push(stack.pop());
        }

        const result = token.getTokenValue() === fn.positiveIdentifier ? fn.applyFn(args) : -1 * fn.applyFn(args);
        if (!isFinite(result)) {
          throw new Error(`Invalid expression. Function ${token.getTokenValue()} resulted in a inFinite value of ${result}`);
        }
        stack.push(result);
      } else if (token.isTokenType(TokenType.Variable)) {
        throw new Error('Invalid expression. Variables are not supported yet. Sorry');
      }
    }
    return stack.pop();
  }

  toShuntingYard(tokens: Token[]): Token[] {
    const outputQueue: Token[] = [];
    const operatorStack: Token[] = [];

    for (let token of tokens) {
      if (token.isTokenType(TokenType.Literal) || token.isTokenType(TokenType.Variable)) {
        outputQueue.push(token);
      } else if (token.isTokenType(TokenType.Function)) {
        operatorStack.push(token);
      } else if (token.isTokenType(TokenType.ArgumentSeperator) || token.isTokenType(TokenType.ClosingParenthesis)) {
        for (let top = this.peekStack(operatorStack); !!top && !top.isTokenType(TokenType.OpenParenthesis); top = this.peekStack(operatorStack)) {
          outputQueue.push(operatorStack.pop());
        }
        // if the token is a closing parenthesis we want to pop the opening parenthesis off the stack
        if (token.isTokenType(TokenType.ClosingParenthesis)) {
          operatorStack.pop();
          const nextToken = this.peekStack(operatorStack);
          // if the next token in the stack is a function we pop that onto the output queue
          if (!!nextToken && nextToken.isTokenType(TokenType.Function)) {
            outputQueue.push(operatorStack.pop());
          }
        }
      } else if (token.isTokenType(TokenType.Operator)) {
        for (let top = this.peekStack(operatorStack); !!top && this.shuntingYardOperatorConditional(top, token); top = this.peekStack(operatorStack)) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token.isTokenType(TokenType.OpenParenthesis)) {
        operatorStack.push(token);
      }
    }

    return outputQueue.concat(operatorStack.reverse());
  }

  private peekStack<T>(stack: T[]): T | undefined {
    return stack.length > 0 ? stack[stack.length - 1] : undefined;
  }

  private shuntingYardOperatorConditional(operatorStackToken: Token, token: Token): boolean {
    if (!operatorStackToken.isTokenType(TokenType.Operator)) {
      return false;
    } else if (token.getAssociativity() === AssociativityType.Left) {
      // if the operator we are comparing has left associativity then return true if its presedence is less than or equal to than the operator we are comparing against
      return token.getPresedence() <= operatorStackToken.getPresedence();
    } else {
      // if the operator we are comparing has right associativity then return true if its precedence is less than the operator wer are comparing against
      return token.getPresedence() < operatorStackToken.getPresedence();
    }
  }
}

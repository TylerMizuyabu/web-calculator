import { Injectable } from '@angular/core';
import Token, { TokenType } from './token';
import { Operators } from './token';

@Injectable({
  providedIn: 'root',
})
export class TokenizerService {
  private bufferIsNegative = false;
  private numberBuffer: string[] = [];
  private letterBuffer: string[] = [];

  private tokenizeLetterBuffer(tokenType: TokenType.Variable | TokenType.Function): Token {
    const token = new Token(tokenType, this.setPositiveOrNegative(this.letterBuffer.join('')));
    this.letterBuffer = [];
    return token;
  }

  private tokenizeNumberBuffer(): Token {
    const token = new Token(TokenType.Literal, this.setPositiveOrNegative(this.numberBuffer.join('')));
    this.numberBuffer = [];
    return token;
  }

  private setPositiveOrNegative(tokenValue: string): string {
    const value = `${this.bufferIsNegative ? '-' : ''}${tokenValue}`;
    this.bufferIsNegative = false;
    return value;
  }

  private addToken(token: Token, tokenList: Token[]) {
    const lastToken = tokenList[tokenList.length - 1];
    if (!!lastToken && token.implicitMultiplicationWithToken(lastToken)) {
      tokenList.push(new Token(TokenType.Operator, '*'));
    } else if (token.isAddOrSubtractOperator() && (!lastToken || lastToken.canBeAddedOrSubtractedFrom())) {
      this.bufferIsNegative = this.bufferIsNegative ? token.getTokenValue() === Operators.Add : token.getTokenValue() === Operators.Subtract;
      return; // short-circuit since we don't want to add the sign as a separate token
    } else if (token.isTokenType(TokenType.Literal) || token.isTokenType(TokenType.Variable)) {
      token = this.bufferIsNegative ? new Token(token.getTokenType(), `-${token.getTokenValue()}`) : token;
      this.bufferIsNegative = false;
    }
    tokenList.push(token);
  }

  tokenize(equation: string): Token[] {
    let result: Token[] = [];

    equation.replace(/\s+/g, '');

    for (let char of equation.split('')) {
      if (this.isDigitOrDecimal(char)) {
        if (this.letterBuffer.length > 0) {
          this.addToken(this.tokenizeLetterBuffer(TokenType.Variable), result);
        }
        this.numberBuffer.push(char);
      } else if (this.isLetter(char)) {
        if (this.numberBuffer.length > 0) {
          this.addToken(this.tokenizeNumberBuffer(), result);
        }
        this.letterBuffer.push(char);
      } else if (this.isOperator(char)) {
        this.tokenizeBuffers(result);
        this.addToken(new Token(TokenType.Operator, char), result);
      } else if (this.isOpenParathensis(char)) {
        this.tokenizeBuffers(result, TokenType.Function);
        this.addToken(new Token(TokenType.OpenParenthesis, char), result);
      } else if (this.isClosingParathensis(char)) {
        this.tokenizeBuffers(result);
        this.addToken(new Token(TokenType.ClosingParenthesis, char), result);
      } else if (this.isComma(char)) {
        this.tokenizeBuffers(result);
        this.addToken(new Token(TokenType.ArgumentSeperator, char), result);
      }
    }

    this.tokenizeBuffers(result);
    return result;
  }

  private tokenizeBuffers(dest: Token[], letterBufferType: TokenType.Variable | TokenType.Function = TokenType.Variable) {
    if (this.letterBuffer.length > 0) {
      this.addToken(this.tokenizeLetterBuffer(letterBufferType), dest);
    } else if (this.numberBuffer.length > 0) {
      this.addToken(this.tokenizeNumberBuffer(), dest);
    }
  }

  private isComma(character: string): boolean {
    return character === ',';
  }

  private isDigitOrDecimal(character: string): boolean {
    return /\d|\./.test(character);
  }

  private isLetter(character: string): boolean {
    return /[a-z]/i.test(character);
  }

  private isOperator(character: string): boolean {
    return /\+|-|\*|\/|\^/.test(character);
  }

  private isOpenParathensis(character: string): boolean {
    return character === '(';
  }

  private isClosingParathensis(character: string): boolean {
    return character === ')';
  }
}

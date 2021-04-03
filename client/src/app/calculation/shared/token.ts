export enum TokenType {
  Literal = 0,
  Variable,
  Function,
  Operator,
  OpenParenthesis,
  ClosingParenthesis,
  ArgumentSeperator,
}

export enum AssociativityType {
  Left = 0,
  Right,
}

export enum Operators {
  Add = '+',
  Subtract = '-',
  Divide = '/',
  Multiply = '*',
  PowerOf = '^',
}

export default class Token {
  private static readonly associativity = {
    [Operators.PowerOf]: AssociativityType.Right,
    [Operators.Multiply]: AssociativityType.Left,
    [Operators.Divide]: AssociativityType.Left,
    [Operators.Add]: AssociativityType.Left,
    [Operators.Subtract]: AssociativityType.Left,
  };
  private static readonly presedence = {
    [Operators.PowerOf]: 4,
    [Operators.Multiply]: 3,
    [Operators.Divide]: 3,
    [Operators.Add]: 2,
    [Operators.Subtract]: 2,
  };

  constructor(private type: TokenType, private value: string) {}

  getTokenValue(): string {
    return this.value;
  }

  getTokenType(): TokenType {
    return this.type;
  }

  isTokenType(tokenType: TokenType): boolean {
    return this.type === tokenType;
  }

  isAddOrSubtractOperator(): boolean {
    return this.type === TokenType.Operator && (this.value === Operators.Add || this.value === Operators.Subtract);
  }

  /**
   * Returns true if the token can be added/subtracted from (example: 1 can be add/sutracted from, but you can't add/subtract from '(')
   */
  canBeAddedOrSubtractedFrom(): boolean {
    return this.type !== TokenType.Literal && this.type !== TokenType.Variable && this.type !== TokenType.ClosingParenthesis;
  }

  implicitMultiplicationWithToken(previousToken: Token): boolean {
    if (this.type === TokenType.Operator || this.type === TokenType.ClosingParenthesis || this.type === TokenType.ArgumentSeperator) {
      // These three types can never have implicit multiplication with the previously inserted token (i.e we don't want to tranlsate sin(4) into ['sin', '(', '4', '*', ')'])
      return false;
    } else if (this.isTokenType(previousToken.getTokenType())) {
      // If the token is the same as the previous it can't have implicit multiplication
      return false;
    }
    // Otherwise the previous token has to be a literal or a variable or the closing parenthesis for there to be implicit multiplication
    return (
      previousToken.isTokenType(TokenType.Literal) || previousToken.isTokenType(TokenType.Variable) || previousToken.isTokenType(TokenType.ClosingParenthesis)
    );
  }

  getAssociativity(): AssociativityType | undefined {
    return Token.associativity[this.value];
  }

  getPresedence(): number | undefined {
    return Token.presedence[this.value];
  }
}

import Token, { TokenType } from '../token';

interface TestEquation {
  eq: string;
  tokens: Token[];
  rpn: Token[];
  result: number;
}

export const equations: TestEquation[] = [
  {
    eq: '17+19',
    tokens: [new Token(TokenType.Literal, '17'), new Token(TokenType.Operator, '+'), new Token(TokenType.Literal, '19')],
    rpn: [new Token(TokenType.Literal, '17'), new Token(TokenType.Literal, '19'), new Token(TokenType.Operator, '+')],
    result: 36,
  },
  {
    eq: 'sin(5)',
    tokens: [
      new Token(TokenType.Function, 'sin'),
      new Token(TokenType.OpenParenthesis, '('),
      new Token(TokenType.Literal, '5'),
      new Token(TokenType.ClosingParenthesis, ')'),
    ],
    rpn: [new Token(TokenType.Literal, '5'), new Token(TokenType.Function, 'sin')],
    result: Math.sin(5),
  },
  {
    eq: '    3max(1,2) / 6',
    tokens: [
      new Token(TokenType.Literal, '3'),
      new Token(TokenType.Operator, '*'),
      new Token(TokenType.Function, 'max'),
      new Token(TokenType.OpenParenthesis, '('),
      new Token(TokenType.Literal, '1'),
      new Token(TokenType.ArgumentSeperator, ','),
      new Token(TokenType.Literal, '2'),
      new Token(TokenType.ClosingParenthesis, ')'),
      new Token(TokenType.Operator, '/'),
      new Token(TokenType.Literal, '6'),
    ],
    rpn: [
      new Token(TokenType.Literal, '3'),
      new Token(TokenType.Literal, '1'),
      new Token(TokenType.Literal, '2'),
      new Token(TokenType.Function, 'max'),
      new Token(TokenType.Operator, '*'),
      new Token(TokenType.Literal, '6'),
      new Token(TokenType.Operator, '/'),
    ],
    result: 1,
  },
];

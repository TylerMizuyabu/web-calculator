import { TestBed } from '@angular/core/testing';
import { TokenizerService } from './tokenizer.service';
import { TokenType } from './token';
import { equations } from './test/equations';

describe('TokenizerService', () => {
  let service: TokenizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tokenize', () => {
    it('should tokenize the equations appropriately', () => {
      for (let eq of equations) {
        const actual = service.tokenize(eq.eq);
        expect(actual.length).toEqual(eq.tokens.length);
        for (let i = 0; i < actual.length; i++) {
          expect(actual[i].equals(eq.tokens[i])).toBeTrue();
        }
      }
    });
  });
});

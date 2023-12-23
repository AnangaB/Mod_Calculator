/*import { evaluateInfixExpression} from './../evaluateInputLogic.ts';
describe('evaluateInfixExpression', () => { 

  it("Addition: 33+77 should equal 11", () =>{
    expect(evaluateInfixExpression("33+77",99n)).toBe("11");
  });
  
  it("More Complex Expression: (3 + 4 / 2 * (1 - 5)^2) should equal 11", () =>{
    expect(evaluateInfixExpression("(3 + 4 / 2 * (1 - 5)^2)",44n)).toBe("35");
  });
  
 });*/

/**
describe("evaluatePostFixExpression", () => {

    //testing if evaluatePostFixExpression is working correctly
    it('1,1,+ to equal 2', () => {
    expect(evaluatePostFixExpression("1,1,+")).toBe("2");
    });

    it('1,1,1,1,+,+,+ (1 +1 + 1 + 1)to equal 4', () => {
        expect(evaluatePostFixExpression("1,1,1,1,+,+,+")).toBe("4");
    });

    
    it(' 5 2 + 8 * 4 / (((5 + 2) * 8) / 4) to equal 14', () => {
        expect(evaluatePostFixExpression("5,2,+,8,*,4,/")).toBe("14");
    });

    it('3,4,2,*,1,5,-,2,^,/,+   (3 + 4 * 2 / (1 - 5)^2)   to equal 3.5', () => {
        expect(evaluatePostFixExpression("3,4,2,*,1,5,-,2,^,/,+")).toBe("3.5");
    });
    it(' empty input', () => {
        expect(evaluatePostFixExpression("")).toBe("ERROR");
    });
    it(' invalid prefix notation', () => {
        expect(evaluatePostFixExpression("1,1,1,+,+,+,+,+")).toBe("ERROR");
    });
    

});

describe("convertInfixToPostfix", () => {
    it("should return an error for empty input", () => {
      expect(convertInfixToPostfix("")).toBe("ERROR");
    });
  
    it("should convert a simple infix expression without parentheses", () => {
      expect(convertInfixToPostfix("2 + 3 * 4")).toBe("2,3,4,*,+");
    });
  
    it("should convert an infix expression with parentheses", () => {
      expect(convertInfixToPostfix("(5 + 3) * 2 - 4 / (1 + 1)")).toBe("5,3,+,2,*,4,1,1,+,-");
    });
  
    it("should handle operators with different precedence", () => {
      expect(convertInfixToPostfix("3 + 4 * 2 / (1 - 5)^2")).toBe("3,4,2,*,1,5,-,2,^,/,+");
    });
  
    it("should return an error for an expression with unbalanced parentheses", () => {
      expect(convertInfixToPostfix("(5 + 3 * 2 - 4 / (1 + 1)")).toBe("Error");
    });
  
    it("should return an error for an expression with invalid characters", () => {
      expect(convertInfixToPostfix("2 + A * 4")).toBe("ERROR");
    });
  });
**/
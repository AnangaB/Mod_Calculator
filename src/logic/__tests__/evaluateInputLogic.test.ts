import { evaluateInfixExpression} from './../CalculatorHandleButtonInputLogic.ts';
describe('evaluateInfixExpression', () => { 

  it("Simple Addition: 33+77 mod 99 should equal 11", () =>{
    expect(evaluateInfixExpression("33+77",99n)).toBe("11");
  });

  it("Simple Subtraction: 443-33 mod 54 should equal 32", () =>{
    expect(evaluateInfixExpression("443-33",54n)).toBe("32");
  });
  it("Simple Multiplication: 4243*99 mod 899 should equal 224", () =>{
    expect(evaluateInfixExpression("4243*99",899n)).toBe("224");
  });
  it("Simple Division I: 33/(9) mod 998 should equal Error", () =>{
    expect(evaluateInfixExpression("33/9",999n)).toBe("Error");
  });
  it("Simple Division II: 33/(7) mod 998 should equal 575", () =>{
    expect(evaluateInfixExpression("33/(7)",998n)).toBe("575");
  });
  it("Simple Exponent I: 2^(-1) mod 5 should equal 3", () =>{
    expect(evaluateInfixExpression("2^(-1)",5n)).toBe("3");
  });
  it("Simple Exponent II (0 has no inverse): 444^(-1) mod 444 should equal Error", () =>{
    expect(evaluateInfixExpression("444^(-1)",444n)).toBe("Error");
  });
  it("Exponent with simple expression in the power: 32432^(10*22*(-2)) mod 97 should equal Error", () =>{
    expect(evaluateInfixExpression("32432^(10*22*(-2))",97n)).toBe("22");
  });

  /*
  it("Complex Expression: ((32432^(10*22*(-2))+22*33^(-33)+(222*333^(222-22*336)))+343234*(2320)*(1323)) mod 97 should equal 89", () =>{
    expect(evaluateInfixExpression("((32432^(10*22*(-2))+22*33^(-33)+(222*333^(222-22*336)))+343234*(2320)*(1323))",97n)).toBe("89");
  // });*/
  
 });


 

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
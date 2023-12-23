import { Stack } from "stack-typescript";
import {square_and_multiply} from "./square_and_multiply.ts";
import {computeInverse} from "./gcdAlgorithms.ts";

type tokenType = "Operand" | "Operation" | "Undecided";

/**Calls upon convertInfixToPostfix and then evaluatePostFixExpression, to convert in-fix expression in param into post-fix and then evaluates the post fix.
 * 
 * @param exp a in-fix expression, which needs to be evaluated
 * @param n the modding value n
 * @returns a result to the given in-fix expression, could be a "ERROR" that it returns
 */
export function evaluateInfixExpression(exp: string, n: bigint){
  console.log("Intial: ", exp);
  let processedInfix = preprocessInfixExpression(exp,n);
  console.log("Proccessed: ", processedInfix);

  let postfix_exp = convertInfixToPostfix(processedInfix);
  

  return evaluatePostFixExpression(postfix_exp, n);
}

function preprocessInfixExpression(exp:string,n:bigint):string{

  const negativeIntegerRegex = /[^\^]\((-\d+)\)/g;
  //handle negative bracketed integers such as (-a), but none in the exponent
  let removedNegativeIntegers = exp.replace(negativeIntegerRegex, (_, capturedNumber) => "("+String(mod(BigInt(capturedNumber), n))+")");
  //handle multiplications of form (a)b, an d replace with a*b mod n
  //const bracketMultiplication = /(\d+)\((\d+)\)|(\))(\()|\((\d+)\)(\d+)/g;
  const bracketMultiplication = /(\d+)(\()|(\))(\()|(\))(\d+)/g;

  let addMultiplicationSign = removedNegativeIntegers.replace(bracketMultiplication, (_, ...groups) => {
    const firstOperand = groups[0] || groups[2] || groups[4];
    const secondOperand = groups[1] || groups[3] || groups[5];
    console.log( firstOperand + "*" + secondOperand);
    return firstOperand + "*" + secondOperand;
     });

    // substiute inverses
    let inverseRegex = /(\d+)\^\(\-(\d+)\)/g;
    let inverseSubstituted = addMultiplicationSign.replace(inverseRegex, (_, ...capturedNumbers) => {
      console.log("capturedNumbers[0] is ",capturedNumbers[0]," capturedNumbers[1] is ",capturedNumbers[1]);
      return ""+computeInverse(BigInt(capturedNumbers[0]),BigInt(capturedNumbers[1]),n) + "";
    });
    return inverseSubstituted;


//'\((\-\d+)\)'
}

/**Converts an Infix expression to post-fix
 * 
 * @param infixString a infix string
 * @returns a post-fix version of the input infix string
 */

function convertInfixToPostfix(infixString: string) {
  if (!infixString || infixString.length === 0) {
    return "ERROR";
  }
  console.log("convertInfixToPostfix: ",infixString );
  
  
  let result = "";
 
    let stack = new Stack<string>();
    let i = 0;
  
    while (i < infixString.length) {
      console.log("i: ",i, " result: ", result );

      let currentChar = infixString.charAt(i);
      let charType = getCharType(currentChar);
   
      if (charType === "Operand") {
        // Operand case: add it to the result
        result += currentChar;
        i++;
      } else if (charType === "Operation") {
        if(result[result.length -1] !== ","){
          result +=",";
        }

        // Operator case
        if (currentChar === "(") {
          stack.push(currentChar);
          i++;
        } else if (currentChar === ")") {
          // Right parenthesis case: pop operators until a "(" is encountered
          while (stack.top !== "(") {
            result += (stack.pop()) + ",";
          }
          // Discard the "("
          stack.pop();
          i++;
        } else {
          // Regular operator case
          while (
            stack.length > 0 &&
            getPrecidenceValueOfOperation(currentChar) <=
              getPrecidenceValueOfOperation(stack.top)
          ) {
            result  += (stack.pop())+",";
          }
          stack.push(currentChar);
          i++;
        }
      }
    }
  
    // Pop remaining operators from the stack and add them to the result
    while (stack.length > 0) {
        if(stack.top == '('){
            result = ("Error");
        }
        result  += ","+(stack.pop());
    }
    
    return result;
    //return evaluateExpression(result);
  }

  /**A helper function that returns the type of a given character input. 
   * The type is defined above as tokenType, and could be "Operand",'Operation" or "Undecided".
   * 
   * @param inputString a input character,
   * @returns the tokenType of the param char
   */
function getCharType(inputString: string): tokenType {
  if (inputString.length > 0) {
    let c = inputString.charAt(0);
    if (/[0-9]/.test(c)) {
      return "Operand";
    } else {
      return "Operation";
    }
  }
  return "Undecided";
}

/**A helper function, that ouputs the precidence value of an operation. This is neccesary for converting in-fix to post-fix notation.
 * 
 * @param operation an operation such as +,-,*, etc.
 * @returns an int representing the precidence value of an operation
 */
function getPrecidenceValueOfOperation(operation: string): number {
  operation = operation.charAt(0);

  if (["+", "-"].includes(operation)) {
    return 1;
  } else if (["*", "/"].includes(operation)) {
    return 2;
  } else if (["^"].includes(operation)) {
    return 3;
  }
  return -1;
}

/** Mods a given number, by given number n
 * 
 * @param value a number that needs to be modded
 * @param n the modding int value n
 * @returns the value mod n
 */
function mod(value: bigint, n: bigint): bigint {
  let result = value % n;
  if (result < 0n) {
    return result + n;
  }
  return result;
}

/**Evaluates a postfix expression, or returns Error
 * 
 * @param input a postfix expression
 * @param n the modding int value n
 * @returns the result of the postfix input
 */
function evaluatePostFixExpression(input : string, n: bigint){
  console.log("workign with n: ",n);
  if (!input || input.length === 0) {
    return "ERROR";
  }

  input = input.replace(/^,/g, "");
  input = input.replace(/,,/g, ",");

  console.log("PostFix Exp: ", input);

  let stack = new Stack<string>();

  let exp = input.split(",");

  //case when there are only two elements in exp, where top most is "-", and below is a number
  if(exp.length == 2 && exp[1] == "-" && !isNaN(parseInt(exp[0],10))){
    console.log("Special Case entered: ", `${exp[1]}${exp[0]}`)
    return String(mod(BigInt(`${exp[1]}${exp[0]}`),n));
  }



  for(let i = 0; i < exp.length;i++){
    if(getCharType(exp[i]) == "Operand"){
      stack.push(exp[i]);
    }
    else{
      let val1,val2;
      try {
        val1 = BigInt(stack.pop());
        val2 = BigInt(stack.pop());
    
        if (typeof val1 !== "bigint" || typeof val2 !== "bigint") {
            throw new Error("Invalid values in the stack");
        }
    
        // Continue with your calculations using val1 and val2
    } catch (error) {
        return "ERROR";
    }

      if( exp[i] == "*"){
        stack.push(String(mod(val2*val1,n)));
      }
      else if( exp[i] == "/"){
        stack.push(String(mod(val2/val1, n)));
      }
      else if( exp[i] == "+"){
        stack.push(String(mod(val2+val1,n)));
      }
      if( exp[i] == "-"){
        stack.push(String(mod(val2-val1,n)));
      }
      if( exp[i] == "^"){
        stack.push(String(square_and_multiply(val2,val1,n)));
        console.log("doing ", val2, " to the power of ", val1);
      }

    }
    
  }
  try{
    return String(mod(BigInt(stack.pop()),n));
  } catch{
    return "ERROR";
  }



}
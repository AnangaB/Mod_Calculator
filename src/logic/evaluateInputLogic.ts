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
  //reduce expressions in the exponents
  console.log("after adding multiplication signs between brackets: ", addMultiplicationSign);
  let regexExponent = /\d+\)\^\((.*)\)|\d+\^\((.*)\)/g;
  let reduceExponentExpression = addMultiplicationSign.replace(regexExponent,(_,...matches) => {
    if(matches[0]){
      return _.replace(matches[0],reduceBracketedExponentExpression(matches[0],phi(n)));
    }
    else{
      return _.replace(matches[1],reduceBracketedExponentExpression(matches[1],phi(n)));
    }
      
    });
  console.log("the reduceExponentExpression is ", reduceExponentExpression);
  
//  let reduceExponentExpression = reduceBracketedExponentExpression(addMultiplicationSign,n);

    // substiute inverses
    let inverseRegex = /\(?(\d+)\)?\^\(\-(\d+)\)/g;
    let inverseSubstituted = reduceExponentExpression.replace(inverseRegex, (_, ...capturedNumbers) => {
      console.log("capturedNumbers[0] is ",capturedNumbers[0]," capturedNumbers[1] is ",capturedNumbers[1]);
      return ""+computeInverse(BigInt(capturedNumbers[0]),BigInt(capturedNumbers[1]),n) + "";
    });
    return inverseSubstituted;

}

function reduceBracketedExponentExpression(exp:string,n:bigint):string{
  if(exp == "ERROR"){
    return "ERROR";
  }
  let regex = /\((.*)\)|\^\((.*)\)/g;
  console.log("going to test ", exp);
  
  if(regex.test(exp)){

    let match = exp.match(regex);
    console.log("match is ",match);
    exp = exp.replace(regex, (_,...matched) => {
      if(matched[0]){
        console.log("here at matched[0]")
        return reduceBracketedExponentExpression(matched[0],n);
      }
      else{
        console.log("here at matched[1]")

        return reduceBracketedExponentExpression(matched[1],phi(n));
      }
    });      
  }

    exp = convertInfixToPostfix(exp);
    exp = evaluatePostFixExpression(exp,n);
    console.log(exp)
    return exp;

}

function phi(n : bigint){
  let result = n;
  for(let i = 2n; i*i <= n; i++){
    if(n % i == 0n){
      while(n % i == 0n){
          n /= i;
      }
      result -= result / i;
    } 
  }
  if(n > 1){
    result -= result / n;
  }
  console.log("phi(" + n +") is "+ result);
  return result;  
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
      console.log(i, " ", infixString.charAt(i), " result:", result)

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
          while (stack.top !== "(" && stack.top) {
            result += (stack.pop()) + ",";
            console.log("result in while loop: ",result )
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
  if (!input || input.length === 0) {
    return "ERROR";
  }

  input = input.replace(/^,/g, "");
  input = input.replace(/,,/g, ",");

  if(input[input.length -1] == ","){
    input = input.slice(0,input.length -1)
  }
  console.log("PostFix Exp: ", input);

  let stack = new Stack<string>();

  let exp = input.split(",");

  //case when there are only two elements in exp, where top most is "-", and below is a number
  if(exp.length == 2 && exp[1] == "-" && !isNaN(parseInt(exp[0],10))){
    console.log("Special Case entered: ", `${exp[1]}${exp[0]}`)
    return String(mod(BigInt(`${exp[1]}${exp[0]}`),n));
  }

  let exp_string = ""
  for(let i = 0; i < exp.length;i++){
    exp_string += exp[i] +","
  }
  console.log("exp_string: ",exp_string)



  for(let i = 0; i < exp.length;i++){
    console.log("the remaining input is: ", input.slice(i,))
    console.log("currently on exp ", exp[i])
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

/*
function printStackValues<T>(stack: Stack<T>): void {
  console.log("Stack values:");
  
  // Create a temporary stack to preserve the original stack order
  const tempStack = new Stack<T>();

  // Pop elements from the original stack and print them
  while (!stack.top) {
    const value = stack.pop();
    if (value !== undefined) {
      console.log(value);
      tempStack.push(value); // Preserve the original order
    }
  }

  // Restore the original stack order
  while (!tempStack.top) {
    stack.push(tempStack.pop()!);
  }
}*/
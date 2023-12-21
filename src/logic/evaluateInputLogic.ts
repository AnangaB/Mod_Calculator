import { Stack } from "stack-typescript";

type tokenType = "Operand" | "Operation" | "Undecided";


export function evaluateInfixExpression(exp: string, n: number){
  console.log("Intial: ", exp);
  let postfix_exp = convertInfixToPostfix(exp);
  

  return evaluatePostFixExpression(postfix_exp, n);
}


export function convertInfixToPostfix(infixString: string) {
  if (!infixString || infixString.length === 0) {
    return "ERROR";
  }
  
  let result = "";

  
    // initialize the stack by pushing a "("
    let stack = new Stack<string>();
    let i = 0;
  
    while (i < infixString.length) {
      let currentChar = infixString.charAt(i);
      let charType = getCharType(currentChar);
  
      if (charType === "Operand") {
        // Operand case: add it to the result
        result += currentChar;
        i++;
      } else if (charType === "Operation") {
        result +=",";
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

// returns a tokenType string of a given character input
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

// returns the precedence of an operation
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

function mod(value:number, n:number){
  let result = (value % n);
  if(result < 0){
    return result + n;
  }
  return result;

}

export function evaluatePostFixExpression(input : string, n: number){
  console.log("workign with n: ",n);
  if (!input || input.length === 0) {
    return "ERROR";
  }

  input = input.replace(/^,|,,/g, "");
  console.log("PostFix Exp: ", input);

  let stack = new Stack<string>();

  let exp = input.split(",");

  //case when there are only two elements in exp, where top most is "-", and below is a number
  if(exp.length == 2 && exp[1] == "-" && !isNaN(parseInt(exp[0],10))){
    console.log("Special Case entered: ", `${exp[1]}${exp[0]}`)
    return String(mod(Number(`${exp[1]}${exp[0]}`),n));
  }



  for(let i = 0; i < exp.length;i++){
    if(getCharType(exp[i]) == "Operand"){
      stack.push(exp[i]);
    }
    else{
      let val1 = Number(stack.pop());
      let val2 = Number(stack.pop());

      if(isNaN(val1) || isNaN(val2)){
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
        stack.push(String(mod(Math.pow(val2,val1),n)));
      }

    }
    
  }

  return String(mod(Number(stack.pop()),n));



}
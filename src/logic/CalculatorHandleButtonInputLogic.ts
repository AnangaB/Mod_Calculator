import { evaluateTree,buildExpressionTree,mod } from './ExpressionEvaluationLogic';
import {ExpressionNode, OperationExpressionNode} from './ExpressionNode'; 

/**Function handles button presses, and calls up evaluateInfixExpression to evaluate expressions when neccesary
 * 
 * @param value the value of the button that has been clicked, could be a digit, operation or the equal sign
 * @param displayingItems the current string that is being displayed in the calculator
 * @param n the moding value
 * @returns a new string to be displayed in the calcuator, to replace the param displayingItems
 */
export function getNewDisplayingItems(value: string, displayingItems: string, n: bigint): string {
  //if value is a number or a bracket 
  if ((!isNaN(parseInt(value)) && isFinite(parseInt(value))) || (["(",")"].includes(value))) {
    if ((displayingItems === "0" || displayingItems === "Error") && value != ")") {
      return `${value}`;
    } 
    else if ((displayingItems === "0" || displayingItems === "Error") && value == ")") {

      return `${displayingItems}`;
    } 
    else {

      return `${displayingItems}${value}`;
    }
  } 
  //if value is a non-bracket operation 
  else if (["+", "-", "*", "/", "^"].includes(value)) {
    let lastCurrentChar = displayingItems.charAt(displayingItems.length - 1);
    

    if ((!["+","-","/","*","^"].includes(lastCurrentChar)) && ( displayingItems != "Error")) {
      return `${displayingItems}${value}`;
    }
    /*
    else if(value == "log"){
      if(displayingItems == "0" || displayingItems == "Error"){
        return `${value}${"("}`;
      }
      else{
        return `${displayingItems}${value}${"("}`;
      }
      
    }*/ 
  }else if (value == "C") {
    return "0";
  }
  else if (value == "=") {

    //special case, when only a digit is in input
  
    try {
      const displayingItemsAsBigInt = BigInt(displayingItems);
      if (typeof displayingItemsAsBigInt === "bigint") {
        return String(mod(displayingItemsAsBigInt, n));
      }
    } catch (error) {}
    

    if((typeof (n) === "bigint") &&
    n > 0n){
      return evaluateInfixExpression(displayingItems,n);
    } 
  }
  return `${displayingItems}`;
};


/**Evaluates a given infix expression, evaluates it by calling evaluateTree(tree) or returns "Error"
 * 
 * @param exp a in-fix expression, which needs to be evaluated
 * @param n the modding value n
 * @returns a result to the given in-fix expression, could be a "ERROR" that it returns
 */
export function evaluateInfixExpression(exp: string, n: bigint){

  let tree: ExpressionNode|OperationExpressionNode|null = buildExpressionTree(exp,n);

  if(!tree){
    return "Error";
  }
  return evaluateTree(tree);
}

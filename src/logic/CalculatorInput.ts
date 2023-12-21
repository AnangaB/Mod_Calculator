import { evaluateInfixExpression } from "./evaluateInputLogic";

/**Function handles button presses, and calls up evaluateInfixExpression to evaluate expressions when neccesary
 * 
 * @param value the value of the button that has been clicked, could be a digit, operation or the equal sign
 * @param displayingItems the current string that is being displayed in the calculator
 * @param n the moding value
 * @returns a new string to be displayed in the calcuator, to replace the param displayingItems
 */
export function getNewDisplayingItems(value: string, displayingItems: string, n: number): string {
  if (!isNaN(parseInt(value)) && isFinite(parseInt(value))) {
    if (displayingItems === "0") {
      return `${value}`;
    } else {
      return `${displayingItems}${value}`;
    }
  } else if (
    ["+", "-", "*", "/", "^"].includes(value)
  ) {
    let lastCurrentChar = displayingItems.charAt(displayingItems.length - 1);
    if (
      (!["+","-","/","*","^"].includes(lastCurrentChar))
    ) {
      return `${displayingItems}${value}`;
    }
  }
  else if(["(",")"].includes(value)){

    if (displayingItems === "0") {
      return `${value}`;
    } else {
      return `${displayingItems}${value}`;
    }

  } else if (value == "C") {
    return "0";
  }
  else if (value == "=") {
    if(!isNaN(n) &&
    n > 0 &&
    Number.isInteger(n)){
      return evaluateInfixExpression(displayingItems,n);
    }
    
  }
  return `${displayingItems}`;
};
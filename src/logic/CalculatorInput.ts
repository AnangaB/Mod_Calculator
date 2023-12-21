import { evaluateInfixExpression } from "./evaluateInputLogic";

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


export const evaluateExpression = (expresion: string) => {
  if (expresion == null) {
    return;
  }
  //convert to postfix

  for (let i = 0; i < expresion.length; i++) {}
};

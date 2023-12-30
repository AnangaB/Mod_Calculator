//import {getCharType,getPrecidenceValueOfOperation, mod, phi, preprocessInfixExpression} from "./evaluateInputLogic.ts";
import {ExpressionNode, OperationExpressionNode} from './ExpressionNode.ts';
import {computeInverse, phi,square_and_multiply} from "./NumberTheoryAlgorithms.ts";
import { Stack } from "stack-typescript";

/**A function that constructs a new node, the new node is either of class ExpressionNode or OperationExpressionNode, depending on whether the data to create
 * the node is a number or an operation
 * 
 * @param character the data portion of the node, can either be an operation or a number
 * @param n the value of mod n. If param character is an operation, then it is be operated mod n. Otherwise, n does not do anything if param character is an operand.
 * @returns a new constructed node of either type ExpressionNode or OperationExpressionNode
 */
 function newNode(character: string, n: bigint=1n)
 {
     let node;
     if(getCharType(character) == "Operand"){
        node = new ExpressionNode(character);
     } 
     else{
        node = new OperationExpressionNode(character,n );
     }
     return node;
 }

 /**Parses the input infix statement by user, and turns it into an arr, where each element of arr represents a single operand or operation.
  * 
  * @param expression an input given infix statement
  * @returns an array of strings, where each element of arr represents a single operand or operation.
  */
 function tokenizeInfix(expression :string):string[]{



    let expressionArr:string[] = ["("];

    if(expression == ""){
        return [];
    }

    for(let i = 0; i < expression.length; i++){
        
        if(getCharType(expression[i]) == "Operation"){
            expressionArr.push(expression[i]);
        }
        else{
            //in the preprocessing stage, any non negative integer a of form (-a) in expression string, was converted to _(-a)_ to make
            // it so -a becomes an array element together
            if(expression[i] == "_"){
                let capturegroup:string = "";
                i += 1;
                while(i < expression.length && expression[i] != "_"){
                    if(expression[i] != ")" && expression[i] != "(" )
                    capturegroup += expression[i];
                    i++;
                }
                expressionArr.push(capturegroup);

            }
            else if((getCharType(expressionArr[expressionArr.length - 1]) == "Operand" )) {
                expressionArr[expressionArr.length - 1] = "" + expressionArr[expressionArr.length - 1] + expression[i];
            }
            else{
                expressionArr.push(expression[i]);
            }
        }

    }
    expressionArr.push(")");


    return expressionArr;

 }


 /** Function to build Expression Tree out of a given user input infix statement. If the input is improper, it returns null
  * 
  * @param exp an user inputed infix statement
  * @param n the value of which the input exp is to be modded by
  * @returns a root node to the expression tree or null if the input is invalid
  */
 export function buildExpressionTree(exp :string, n:bigint):ExpressionNode|null
 {

     let nodeStack = new Stack<ExpressionNode>();

     let characterStack = new Stack<string>();

     let node, leftChild, rightChild;

     //preprocess exp before tokenizing
     exp = preprocessInfixExpression(exp)

     let expression = tokenizeInfix(exp);
     

     for (let i = 0; i < expression.length; i++)
     {
         if (expression[i] == '(')
         {
             characterStack.push(expression[i]);
         }

         // Push the operands in node stack
         else if (getCharType(expression[i]) == "Operand")
         {
            node = newNode(expression[i]);
            nodeStack.push(node);
         }
         //if non bracket operation
         else if (getPrecidenceValueOfOperation(expression[i]) > 0)
         {
             while (characterStack.length != 0 && 
                (characterStack.top != '(' && expression[i] != '^') && 
                (getPrecidenceValueOfOperation(characterStack.top) >= getPrecidenceValueOfOperation(expression[i])) || 
                (expression[i] == '^' && getPrecidenceValueOfOperation(characterStack.top) > getPrecidenceValueOfOperation(expression[i]) ))
             {                

                node = newNode(characterStack.pop(),n);
                                
                if(nodeStack.length > 1){               
                    rightChild = nodeStack.pop();

                    leftChild = nodeStack.pop();

                    // Update the tree
                 node.left = leftChild;
                 node.right = rightChild;

                 nodeStack.push(node);
                }
                else{
                    return null;
                }
             }

             characterStack.push(expression[i]);
         }
         else if (expression[i] == ')')
         {
             while (characterStack.length != 0 && 
             characterStack.top != '(')
             {
                node = newNode(characterStack.pop(),n);
                
                if(nodeStack.length > 1){               
                    rightChild = nodeStack.pop();

                    leftChild = nodeStack.pop();

                    // Update the tree
                 node.left = leftChild;
                 node.right = rightChild;

                 nodeStack.push(node);
                }
                else{
                    return null;
                }

                 
             }
             //pop the (
             characterStack.pop();
         }
     }
     node = nodeStack.pop();

     //if there are still expressions left in the stack, then the input expression was not valid
     if(nodeStack.length > 0){
        return null;
     }

     fixOperationsModValueInTree(node, n);

     return node;
 }



/**This modifies the n values of all the OperationExpressionNode in the expression tree. This is because when there is an expression in the exponent power, then
 * that expresseion has to be evaluated in phi(n).
 * 
 * @param root the root node of the expression tree
 * @param n the initial modding value for the expression denoted by the expression tree
 */
function fixOperationsModValueInTree(root:ExpressionNode|null, n:bigint){
    if(root != null){
        let rightn:bigint;

        if(root.data == "^" && root instanceof OperationExpressionNode){
            rightn = phi(n);
        }
        else{
            rightn = n;
        }

        if(root instanceof OperationExpressionNode){
            root.n = n;
        }

        fixOperationsModValueInTree(root.left,n);
        fixOperationsModValueInTree(root.right,rightn);

    }
 }


 /**Evaluates an expression tree, and outputs the result as a string or returns "Error" if the expression denoted by the expression tree is invalid.
  * A reason for error could be how the for expression of form a^(-b) mod n, there is no possible solution.
  * 
  * @param root the root node of the expression tree
  * @returns  Result of the expression tree as a string or returns "Error"
  */
 export function evaluateTree(root: ExpressionNode | null):string
 {
    if(root != null && root.left == null && root.right == null){
        return root.data;
    }
     if (root != null && root instanceof  OperationExpressionNode )
     {
        let a = evaluateTree(root.right);
        let b = evaluateTree(root.left);

        if(a == "Error" || b == "Error"){
            return "Error";
        }   
        
        return performOperation(BigInt(a),BigInt(b),root.n, root.data);       

     }
     return "Error";
 }

 //The following commented method can be used to print each of the nodes in the tree
/*
 function printBinaryTree(root: ExpressionNode | null): void {
    if (root) {
        printBinaryTree(root.right);
        let output = "Data: " + String(root.data);
        if(root instanceof OperationExpressionNode){
            output += " n:" + root.n; 
        }
        if(root.left){
            output+= " left child: " + root.left.data;
        }
        if(root.right){
            output+= " right child: " + root.right.data;
        }
        console.log(output);
        printBinaryTree(root.left);
    }
}*/

/**Helper function to evaluate operations between two numbers. The parameters below are being evalated as (b operation a) mod n
 * 
 * @param a an operand
 * @param b an operand
 * @param n the modding value
 * @param operation an operation to perform on a and b
 * @returns a string representing the result of the operation or outputs "Error" if evaluating the operation is not possible
 */
 export function performOperation(a:bigint, b:bigint, n:bigint, operation:string):string{
    if(operation != "^"){
       a = mod(a,n);

    }
    
    b = mod(b,n);
    if( operation == "*"){
        return String(mod(b*a,n));
      }
      else if( operation == "/"){
        if((a % n) == 0n){
            return "Error";
        }
        // get inverse of a
        let aInverse = computeInverse(a, n);
        if(aInverse == n){
                return "Error";
        }else{
            return (String(mod(b*aInverse, n)));            
        }
      }
      else if( operation == "+"){
        return (String(mod(b+a,n)));
      }
      else if( operation == "-"){
        return (String(mod(b-a,n)));
      }
      else if( operation == "^"){
        if(a < 0n){
            let bInverse = computeInverse(b, n);
            if(bInverse == n){
                return "Error";
            }
            else{
                //return (String(square_and_multiply(aInverse,(-1n)*b,n)));
                return (String(square_and_multiply(bInverse,(-1n)*a,n)));
            }
            
        }
        else if(a == 0n){
            return "1";

        }
        else{
            return (String(square_and_multiply(b,a,n)));

        }
      }

    return "Error";
 }

 /**Does a Preprocessing on the infix expression given by user. Currently only converts expressions of form (-a), with a marking of _ around it, for 
  * identification later during the process to tokenize the exp.
  * 
  * @param exp an infix expression
  * @returns modified exp, for ease later when it comes to tokenizing 
  */
 function preprocessInfixExpression(exp:string):string{
    // Convert all )( to )*( or )a to )*a or a( to a*(
    exp = exp.replace(/\)\(/g, ')*('); // Convert adjacent parentheses to multiplication
    exp = exp.replace(/(\d+)\(/g, '$1*('); // Convert digit followed by ( to digit*(
              
    //mark any parts that are of form (-a) where a is a positive integer
    let negativeBracketsRegex = /(\(\-\d+\))/g;
    exp = exp.replace(negativeBracketsRegex, (_,wholeMatch) => "_" + wholeMatch + "_");

  return exp;
}

    type tokenType = "Operand" | "Operation" | "Undecided";

  /**A helper function that returns the type of a given input string
   * The type is defined above as tokenType, and could be "Operand",'Operation" or "Undecided".
   * 
   * @param inputString a input character,
   * @returns the tokenType of the param char
   */
  export function getCharType(inputString: string): tokenType {
    if (inputString.length > 0) {
      if (/[0-9]/.test(inputString)) {
        return "Operand";
      } else if(["*","-","/","^","+","(",")"].includes(inputString)) {
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
  export function getPrecidenceValueOfOperation(operation: string): number {
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
export function mod(value: bigint, n: bigint): bigint {
    let result = value % n;
    if (result < 0n) {
      return result + n;
    }
    return result;
  }
  
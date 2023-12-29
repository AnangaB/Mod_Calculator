/** 
 * Defines a data structure representing a node in an expression tree.
 * Each node has a left child, a right child, and holds a data value which is either for operands or operations.
 * For operations, the child class OperationExpressionNode is used.
 */
export class ExpressionNode {
    left: ExpressionNode | null;
    right: ExpressionNode | null;
    data: string;
    
    /**
     * Constructs an ExpressionNode with the specified op data value.
     * Initializes left and right children to null.
     * @param op string data of an operand or operation node represents
     */
    constructor(op: string) {
        this.left = null;
        this.right = null;
        this.data = op;
    }

}

/**
 * Represents a specialized type of ExpressionNode for nodes with a operation value.
 * Extends the base class ExpressionNode.
 */

export class OperationExpressionNode extends ExpressionNode{

    /**
     * Constructs an OperationExpressionNode with the specified op data and a bigint value.
     * Calls the constructor of the class ExpressionNode with the given op parameter.
     * @param op string data representing an operation node
     * @param n bigint value associated with the operation
     */

    n : bigint;
    constructor(op: string, n : bigint){
        super(op)
        this.n = n;
    }

}

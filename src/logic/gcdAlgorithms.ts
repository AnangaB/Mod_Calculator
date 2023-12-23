import {square_and_multiply} from "./square_and_multiply.ts";
/**Computes the gcd of two numbers a and b, using extended Euclidian Algorithm
 * 
 * @param a a bigint number
 * @param b a bigint number
 * @returns gcd of a and b, then values x and y, s.t. gcd(a,b) = xa+yb
 */

function gcdExtended(a:bigint,b:bigint,x:bigint,y:bigint):[bigint,bigint,bigint]{
    if(a == 0n){
        x = 0n;
        y =1n;
        return [b,x,y];
    }
    let [gcd, x1, y1] = gcdExtended(b % a, a, x, y);

    x = y1 - (b/a) * x1; 
    y = x1; 

    return [gcd,x,y];


}



/**Computes the inverse of element a in mod n, if the inverse exists
 * 
 * @param a 
 * @param b
 * @param n 
 */
export function computeInverse(a:bigint,b:bigint,n:bigint):bigint{

    if(a == 1n || a == 0n){
        return a;
    }
    let [gcd,x] = gcdExtended(a,n,1n,0n).slice(0, 2);
    if(gcd != 1n){
        return n;
    }
    console.log("the x is ",x);

    let inverse = (x % n + n) % n; 
    console.log("the inverse of ",a," is ",inverse, " and now doing inverse ^ ", b);
    return square_and_multiply(inverse,b,n);


}
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
    let gcd = gcdExtended(b %a,a,x,y)[0];
    
    let x1 =x;
    let y1 =y;

    let temp = b/a;
    x = y1 - temp * x1; 
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

    let [gcd,x,y] = gcdExtended(a,n,1n,0n);
    if(gcd != 1n){
        return n+1n;
    }
    let inverse = (x % n + n) % n; 
    return square_and_multiply(inverse,b,n);


}
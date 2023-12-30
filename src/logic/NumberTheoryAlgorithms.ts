/**Computes the gcd of two numbers a and b, using extended Euclidian Algorithm
 * 
 * @param a a bigint number
 * @param b a bigint number
 * @returns gcd of a and b, then values x and y, s.t. gcd(a,b) = xa+yb
 */

function gcdExtended(a:bigint,b:bigint):[bigint,bigint]{
    let ri = 1n;
    let qi = 1n;

    let ri_2 = b;
    let ri_1 = a;

    let xi = 1n;

    let xi_1 = 1n;
    let xi_2 = 0n;


    while(ri != 0n){
        qi = ri_2/ri_1;       

        ri = ri_2 - qi*ri_1;

        xi = xi_2 - qi * xi_1;

        xi_2 = xi_1;
        xi_1 = xi

        ri_2 = ri_1;
        ri_1 = ri;
        
    }
    return [ri_2, xi_2];
}

/**Computes the inverse of element a in mod n. If the inverse exists, then will perform (a^-1)^b using the square_and_multiply function.
 * This method is used for expressions of form a^(-b), where b > 0.
 * 
 * @param a the base of exponent
 * @param b the absolute value of a the negative integer power
 * @param n the modding value n
 */

export function computeInverse(a:bigint,n:bigint):bigint{

    if(a == 1n){
        return a;
    }
    if(a == 0n){
      //error when computing the inverse of 0
      return n;
  }
    let [gcd,x] = gcdExtended(a,n);
    if(gcd != 1n){
        return n;
    }

    let inverse = x % n;
    if(inverse < 0n){
        inverse =(inverse + n) % n; 
    } 

    return inverse;
   //return square_and_multiply(inverse,b,n);


}

/**
 * Calculates the Euler's totient function (phi) for a given positive integer n.
 * This function counts the number of positive integers less than or equal to n that are relatively prime to n.
 * This is used for expressions in the power of exponents, as those expression are done in mod phi(n).
 * 
 * @param n A positive integer for which Euler's totient function is to be calculated.
 * @returns The output of the Euler's totient function for the given input n.
 */

export function phi(n : bigint){
    if(n == 1n){
      return 1n;
    }
  
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
    return result;  
  }

  /**Implementation of the square and multiply algorithm, which is 
 * an efficient way to compure powers of numbers in mod n.
 * 
 * @param a the base
 * @param b the exponent
 * @param n the modding value n
 * @returns a bigint that represents a^b mod n
 */
export function square_and_multiply(a: bigint, b: bigint, n: bigint): bigint {
  let z = 1n;
  let b_as_binary_string = b.toString(2);
  let length = b_as_binary_string.length;

  for (let i = 0; i < length; i++) {
      z = (z * z) % n;

      if (b_as_binary_string[i] == "1") {
          z = (z * a) % n;
      }
  }

  return z % n;
}

/**Implementation of the square and multiply algorithm, which is 
 * an efficient way to compure powers of numbers in mod n.
 * 
 * @param a the base
 * @param b the exponent
 * @param n the modding value n
 * @returns a bigint that represents a^b mod n
 */
export function square_and_multiply(a:bigint,b:bigint,n:bigint): bigint{
    let z = 1n;
    let b_as_binary_string =  b.toString(2);
    let length = b_as_binary_string.length;
    for(let i = length - 1; i >= 0;i--){
        z = (z ^ 2n) % n;
        if(b_as_binary_string[i] == "1"){
            z = (z*a) % n;
        }
    }
    return z;

}
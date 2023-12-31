# Mod Calculator

## Overview

A calculator allows you to perform addition, multiplication, subtraction, division, and exponentiation operations in modulo n of your choice. It is designed to handle large number computations efficiently by performing all individual operations in the specified modulo, and implementing different number theory algortihms.

## Features

- **Expression Computation:** Capable of computing complex expressions involving valid combinations of addition, multiplication, subtraction, division, brackets, and exponentiation in mod n (for n values inputed by user). The calculator converts infix statements in user input to an binary expression tree, for interpreting complex mathematical expressions with proper operator precedence and associativity.

- **Arbitrary Precision Arithmetic:** The calculator leverages JavaScript's bigint data type, enabling the handling of arbitrarily large numbers as input. This ensures accurate computations even for large numerical values. However, due to hardware and computational resources constraints, sufficiently large numbers might limit performance.

- **Efficient Number Theoretic Algorithms to boost performance:**
  - **Extended Euclidean Algorithm:** Facilitates the computation of inverses of numbers, essential for mod division or handling negative exponents.
  - **Square and Multiply Algorithm:** Enables the efficient calculation of large exponents of the form \(a^b \mod n\), where \(a\) is an integer, and \(b\) and \(n\) are non-negative integers.
  - **Euler Totient Function Algorithm:** Provides a method for computing the Euler Totient function or Phi function. This is particularly useful for expressions involving the power of exponents, which need to be done in mod Phi(n).

## Usage

This calculator can be accessed at https://anangab.github.io/Mod_Calculator/ or can be done locally as described below:

```bash
# Clone the repository to your local machine:
git clone https://github.com/AnangaB/Mod_Calculator

# Navigate to the project directory:
cd mod-calculator

# Install NPM packages:
npm install

# Run the dev server:
npm run dev

```

## Known Issue

The log button is currently not functional and will be added as a feature in a future update.

For sufficiently large values of n, the computations may experience delays or may not execute due to limitations in computational power.

## License

This project is licensed under the MIT License.

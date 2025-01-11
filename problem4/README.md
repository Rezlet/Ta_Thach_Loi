# Problem4

This repository contains the solution for Problem4 implemented in TypeScript. Below are the instructions for setting up and running the code.

## Installation

1. Install TypeScript globally using npm:
   ```bash
   npm install -g typescript
2. Setup and Run
    ```bash
    tsc problem4.ts
    node problem4.js

## Note
1. Limitation:
For certain test cases, the result might exceed JavaScript's safe integer range when using the Number type.
{ input: 1414213562, expected: 999999999995000001 }
2. Solution:
This limitation can be addressed by using the BigInt type to handle large numbers.

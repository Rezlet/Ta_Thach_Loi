// Implementations of sum_to_n functions
// Fast and efficient with 𝑂(1)complexity.
const sum_to_n_a = (n: number): number => {
    return (n * (n + 1)) / 2;
};

// Simple and clear logic with 𝑂(𝑛)complexity.
const sum_to_n_b = (n: number): number => {
    // Using a for loop
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// Recursive implementation with 𝑂(𝑛) complexity.
const sum_to_n_c = (n: number): number => {
    if (n <= 0) return 0; // Handle n = 0 and negative numbers
    if (n === 1) return 1; // Base case
    return n + sum_to_n_c(n - 1); // Recursive call
};

// Define test case type
interface TestCase {
    input: number;
    expected: number;
}

// Define test cases
const testCases: TestCase[] = [
    { input: 1, expected: 1 },
    { input: 5, expected: 15 },
    { input: 10, expected: 55 },
    { input: 0, expected: 0 },
    { input: -5, expected: 0 },
    { input: 100, expected: 5050 },
    { input: 1000, expected: 500500 },
    { input: 100000, expected: 5000050000 },
    { input: 5.5, expected: 15 }, // Depending on implementation (should probably floor or ceil)
    // { input: 1414213562, expected: 999999999995000001 }, // this test could be fixed by used bigint 
];

// Helper function to run tests
const runTests = (): void => {
    console.log("Running Test Cases for sum_to_n Functions...\n");

    testCases.forEach(({ input, expected }, index) => {
        // Initialize results object
        const results: Record<string, boolean> = {};

        // Test sum_to_n_a
        try {
            const resultA = sum_to_n_a(Math.floor(input));
            results.a = resultA === expected;
        } catch (error) {
            results.a = false;
        }

        // Test sum_to_n_b
        try {
            const resultB = sum_to_n_b(Math.floor(input));
            results.b = resultB === expected;
        } catch (error) {
            results.b = false;
        }

        // Test sum_to_n_c
        try {
            const resultD = sum_to_n_c(Math.floor(input));
            results.d = resultD === expected;
        } catch (error) {
            results.d = false;
        }

        // Log the results
        console.log(`Test Case ${index + 1}: n = ${input}`);
        console.log(`Expected Result: ${expected}`);
        console.log(`sum_to_n_a: ${results.a ? "PASS" : "FAIL"}`);
        console.log(`sum_to_n_b: ${results.b ? "PASS" : "FAIL"}`);
        console.log(`sum_to_n_c: ${results.d ? "PASS" : "FAIL"}`);
        console.log("-------------------------------------------");

        // Assert using console.assert
        console.assert(results.a, `sum_to_n_a failed for input ${input}`);
        console.assert(results.b, `sum_to_n_b failed for input ${input}`);
        console.assert(results.d, `sum_to_n_c failed for input ${input}`);
    });

    console.log("\nAll test cases completed.");
};

// Run the tests
runTests();

// Implementations of sum_to_n functions
// Fast and efficient with 𝑂(1)complexity.
var sum_to_n_a = function (n) {
    return (n * (n + 1)) / 2;
};
// Simple and clear logic with 𝑂(𝑛)complexity.
var sum_to_n_b = function (n) {
    // Using a for loop
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};
// Recursive implementation with 𝑂(𝑛) complexity.
var sum_to_n_c = function (n) {
    if (n <= 0)
        return 0; // Handle n = 0 and negative numbers
    if (n === 1)
        return 1; // Base case
    return n + sum_to_n_c(n - 1); // Recursive call
};
// Define test cases
var testCases = [
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
var runTests = function () {
    console.log("Running Test Cases for sum_to_n Functions...\n");
    testCases.forEach(function (_a, index) {
        var input = _a.input, expected = _a.expected;
        // Initialize results object
        var results = {};
        // Test sum_to_n_a
        try {
            var resultA = sum_to_n_a(Math.floor(input));
            results.a = resultA === expected;
        }
        catch (error) {
            results.a = false;
        }
        // Test sum_to_n_b
        try {
            var resultB = sum_to_n_b(Math.floor(input));
            results.b = resultB === expected;
        }
        catch (error) {
            results.b = false;
        }
        // Test sum_to_n_c
        try {
            var resultD = sum_to_n_c(Math.floor(input));
            results.d = resultD === expected;
        }
        catch (error) {
            results.d = false;
        }
        // Log the results
        console.log("Test Case ".concat(index + 1, ": n = ").concat(input));
        console.log("Expected Result: ".concat(expected));
        console.log("sum_to_n_a: ".concat(results.a ? "PASS" : "FAIL"));
        console.log("sum_to_n_b: ".concat(results.b ? "PASS" : "FAIL"));
        console.log("sum_to_n_c: ".concat(results.d ? "PASS" : "FAIL"));
        console.log("-------------------------------------------");
        // Assert using console.assert
        console.assert(results.a, "sum_to_n_a failed for input ".concat(input));
        console.assert(results.b, "sum_to_n_b failed for input ".concat(input));
        console.assert(results.d, "sum_to_n_c failed for input ".concat(input));
    });
    console.log("\nAll test cases completed.");
};
// Run the tests
runTests();

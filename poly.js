
const fs = require("fs");

// Function to parse and decode JSON input
function parseAndDecode(jsonPath) {
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const { n, k } = data.keys;
    const roots = [];

    for (const key in data) {
        if (key !== "keys") {
            const x = parseInt(key);
            const { base, value } = data[key];
            const y = parseInt(value, parseInt(base));
            roots.push({ x, y });
        }
    }
    return { roots, k };
}

// Function to find the constant term using Lagrange Interpolation
function lagrangeInterpolation(roots, k) {
    let constant = 0;

    for (let j = 0; j < k; j++) {
        let term = roots[j].y;

        for (let i = 0; i < k; i++) {
            if (i !== j) {
                term *= -roots[i].x / (roots[j].x - roots[i].x);
            }
        }

        constant += term;
    }

    return Math.round(constant); // Ensure the result is an integer
}

// Main function to solve for the constant term
function findConstantTerm(jsonPath) {
    const { roots, k } = parseAndDecode(jsonPath);
    return lagrangeInterpolation(roots, k);
}

// Test cases
const testCase1 = "testcase1.json";
const testCase2 = "testcase2.json";

const secret1 = findConstantTerm(testCase1);
const secret2 = findConstantTerm(testCase2);

console.log("Secret for Test Case 1:", secret1);
console.log("Secret for Test Case 2:", secret2);
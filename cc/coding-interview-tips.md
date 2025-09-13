# Coding Interview Tips & Strategies

## Before the Interview

### 1. Platform Preparation
- **Practice on the actual platform** (HackerRank, CodeSignal, etc.)
- **Set up your environment**: IDE shortcuts, debugger, test cases
- **Check internet connection**: Have backup (mobile hotspot)
- **Test audio/video**: If it's a live coding session

### 2. Technical Setup
```typescript
// Have these ready to copy-paste:

// Common imports
import { ListNode, TreeNode } from './types';

// Test runner template
function test() {
    console.log(functionName([1,2,3])); // Expected: [output]
    console.log(functionName([4,5,6])); // Expected: [output]
}

// Time/Space complexity comment template
// Time: O()
// Space: O()
```

### 3. Mental Preparation
- Get good sleep (8 hours)
- Light meal before interview
- Have water ready
- Do a warm-up problem
- Review your notes 30 min before

## During the Interview

### The UMPIRE Method

#### U - Understand
```typescript
// Ask clarifying questions:
// 1. Input constraints?
// 2. Expected output format?
// 3. Edge cases to consider?
// 4. Can input be modified?
// 5. Performance requirements?

// Example clarifications:
// "Can the array be empty?"
// "Are all numbers positive?"
// "Is the array sorted?"
// "Can there be duplicates?"
// "What should I return if no solution exists?"
```

#### M - Match
```typescript
// Identify the pattern:
// - Two pointers? (sorted array, palindrome)
// - Sliding window? (substring, subarray)
// - Hash map? (frequency, lookup)
// - Stack? (matching brackets, nearest element)
// - BFS/DFS? (tree, graph traversal)
// - Dynamic programming? (optimization, counting)
// - Binary search? (sorted, find target)
```

#### P - Plan
```typescript
// Write pseudocode first:
/*
1. Initialize variables
2. Iterate through array
3. Check condition
4. Update result
5. Return result

Example:
- Create hash map for lookups
- Iterate through array once
- For each element, check if complement exists
- If found, return indices
- If not found after loop, return empty array
*/
```

#### I - Implement
```typescript
// Start with the simplest approach that works
function solution(input: any): any {
    // Edge cases first
    if (!input || input.length === 0) {
        return [];
    }
    
    // Main logic
    // ...
    
    return result;
}
```

#### R - Review
```typescript
// Check for:
// 1. Off-by-one errors
// 2. Null/undefined handling
// 3. Integer overflow
// 4. Infinite loops
// 5. Return type matches expected
```

#### E - Evaluate
```typescript
// Analyze complexity:
// Time: O(n) - single pass through array
// Space: O(n) - hash map stores n elements

// Consider optimizations:
// "Can we reduce space complexity?"
// "Can we exit early in some cases?"
```

## Communication Tips

### 1. Think Out Loud
```typescript
// Good communication example:
"I'm thinking of using a two-pointer approach because the array is sorted.
I'll have one pointer at the start and one at the end.
If the sum is too large, I'll move the right pointer left.
If it's too small, I'll move the left pointer right."

// Bad communication:
*Silent typing for 5 minutes*
```

### 2. Explain Your Reasoning
```typescript
// Example:
"I'm choosing a hash map here because:
1. We need O(1) lookup time
2. We need to store key-value pairs
3. The order doesn't matter"
```

### 3. Handle Stuck Moments
```typescript
// When stuck, say:
"Let me think about this differently..."
"Can I start with a simpler version?"
"Let me trace through an example..."
"Would it help if I sorted the array first?"

// Don't say:
"I don't know"
"I give up"
"This is impossible"
```

## Common Mistakes to Avoid

### 1. Not Testing Edge Cases
```typescript
// Always test:
[] // Empty array
[1] // Single element
[1,1,1] // All same
[-1,-2,-3] // Negative numbers
[INT_MAX, INT_MIN] // Extreme values
null/undefined // Invalid input
```

### 2. Premature Optimization
```typescript
// Wrong approach:
"Let me implement the most optimal solution directly"

// Right approach:
"Let me get a working solution first, then optimize"

// Start simple:
function bruteForceSolution() {
    // O(n²) is fine initially
}

// Then optimize:
function optimizedSolution() {
    // Now make it O(n)
}
```

### 3. Not Managing Time
```typescript
// Time allocation for 45-min interview:
// 5 min - Understand problem
// 5 min - Discuss approach
// 25 min - Code solution
// 5 min - Test and debug
// 5 min - Discuss complexity and optimizations

// Set mental checkpoints:
// "At 15 minutes, I should have started coding"
// "At 30 minutes, I should have a working solution"
```

## Problem-Solving Strategies

### 1. Start with Examples
```typescript
// Work through examples manually:
Input: [2,7,11,15], target = 9
Step 1: Check 2, need 7 (9-2)
Step 2: Check 7, found! Return indices

// This helps identify the algorithm
```

### 2. Break Down Complex Problems
```typescript
// Divide into subproblems:
function complexProblem(input: any): any {
    // Step 1: Preprocess data
    const processed = preprocessData(input);
    
    // Step 2: Core algorithm
    const result = coreAlgorithm(processed);
    
    // Step 3: Format output
    return formatOutput(result);
}
```

### 3. Use Helper Functions
```typescript
// Makes code cleaner and easier to debug:
function mainSolution(grid: number[][]): number {
    let count = 0;
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (isValid(grid, i, j)) {
                count++;
                markVisited(grid, i, j);
            }
        }
    }
    
    return count;
}

function isValid(grid: number[][], row: number, col: number): boolean {
    // Validation logic
}

function markVisited(grid: number[][], row: number, col: number): void {
    // Marking logic
}
```

## Debugging Strategies

### 1. Print Debugging
```typescript
function debug(arr: number[], target: number): number[] {
    console.log('Input:', arr, 'Target:', target);
    
    for (let i = 0; i < arr.length; i++) {
        console.log(`Iteration ${i}: arr[${i}] = ${arr[i]}`);
        // Main logic
    }
    
    console.log('Output:', result);
    return result;
}
```

### 2. Test with Simple Cases
```typescript
// Start with simplest case:
test([1], 1); // Single element
test([1,2], 3); // Two elements
test([1,2,3], 6); // Three elements

// Then edge cases:
test([], 0); // Empty
test([-1,-2], -3); // Negatives
```

### 3. Trace Through Code
```typescript
// Manually trace execution:
/*
arr = [3,2,1], target = 5
i=0: 3, need 2, map={3:0}
i=1: 2, need 3, found at index 0! Return [0,1]
*/
```

## Optimization Techniques

### 1. Space-Time Tradeoffs
```typescript
// Time-optimized (uses more space):
function withHashMap(arr: number[]): number {
    const seen = new Map();
    for (const num of arr) {
        if (seen.has(num)) return num;
        seen.set(num, true);
    }
    return -1;
}
// Time: O(n), Space: O(n)

// Space-optimized (uses more time):
function withoutExtraSpace(arr: number[]): number {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) return arr[i];
        }
    }
    return -1;
}
// Time: O(n²), Space: O(1)
```

### 2. Early Termination
```typescript
function findTarget(arr: number[], target: number): boolean {
    for (const num of arr) {
        if (num === target) return true; // Exit early
        if (num > target) return false; // Can exit if sorted
    }
    return false;
}
```

### 3. Preprocessing
```typescript
function multipleQueries(arr: number[], queries: number[]): number[] {
    // Preprocess once
    arr.sort((a, b) => a - b); // O(n log n)
    
    // Answer multiple queries efficiently
    return queries.map(q => binarySearch(arr, q)); // O(m log n)
}
```

## Language-Specific Tips (TypeScript/JavaScript)

### 1. Useful Built-in Methods
```typescript
// Arrays
arr.sort((a, b) => a - b); // Numeric sort
arr.slice(start, end); // Copy portion
arr.splice(index, deleteCount, ...items); // Modify
arr.includes(element); // Check existence
arr.indexOf(element); // Find index
arr.filter(fn); // Filter elements
arr.map(fn); // Transform elements
arr.reduce(fn, initial); // Aggregate
arr.every(fn); // All match condition
arr.some(fn); // Any matches condition

// Strings
str.charAt(index); // Get character
str.charCodeAt(index); // Get char code
str.substring(start, end); // Extract portion
str.split(delimiter); // Convert to array
str.trim(); // Remove whitespace
str.toLowerCase(); // Case conversion
str.replace(search, replace); // Replace
str.padStart(length, pad); // Padding

// Numbers
Math.max(...arr); // Maximum
Math.min(...arr); // Minimum
Math.floor(n); // Round down
Math.ceil(n); // Round up
Math.abs(n); // Absolute value
Number.MAX_SAFE_INTEGER; // Constants
Number.MIN_SAFE_INTEGER;

// Objects/Maps/Sets
Object.keys(obj); // Get keys
Object.values(obj); // Get values
Object.entries(obj); // Get [key, value] pairs
new Map(); // Hash map
new Set(); // Hash set
```

### 2. Common Pitfalls
```typescript
// Sorting pitfall
[1, 10, 2].sort(); // ['1', '10', '2'] - Wrong!
[1, 10, 2].sort((a, b) => a - b); // [1, 2, 10] - Correct!

// Integer division
Math.floor(5 / 2); // 2 (not 2.5)

// Array initialization
new Array(3).fill([]); // Same array reference!
new Array(3).fill(0).map(() => []); // Different arrays

// String immutability
let str = "hello";
str[0] = 'H'; // Doesn't work!
str = 'H' + str.slice(1); // Works
```

## Post-Interview

### What to Do After
1. **Send thank you email** within 24 hours
2. **Note down questions** you struggled with
3. **Practice similar problems**
4. **Review optimal solutions**
5. **Update your notes** with new patterns

### Thank You Email Template
```
Subject: Thank You - [Your Name] - [Position]

Hi [Interviewer Name],

Thank you for taking the time to interview me today for the [Position] role.
I enjoyed our discussion about [specific topic discussed].

I'm very interested in the opportunity to [specific thing about the role].

Best regards,
[Your Name]
```

## Quick Reference Checklist

### Before Starting to Code
- [ ] Understood the problem completely
- [ ] Asked about edge cases
- [ ] Discussed approach with interviewer
- [ ] Confirmed input/output format
- [ ] Stated time/space complexity goals

### While Coding
- [ ] Handling edge cases first
- [ ] Using meaningful variable names
- [ ] Adding comments for complex logic
- [ ] Testing with examples as I go
- [ ] Communicating my thought process

### After Coding
- [ ] Tested with normal cases
- [ ] Tested with edge cases
- [ ] Stated time complexity
- [ ] Stated space complexity
- [ ] Discussed potential optimizations

## Final Tips

1. **Practice daily**: 1-2 problems per day for 30 days
2. **Time yourself**: Simulate real interview conditions
3. **Review solutions**: Learn multiple approaches
4. **Mock interviews**: Practice with friends or online platforms
5. **Stay calm**: Remember, it's a conversation, not a test
6. **Be honest**: If you've seen the problem, mention it
7. **Ask questions**: Shows engagement and thinking process
8. **Think iteratively**: Start simple, then optimize
9. **Code hygienically**: Clean, readable code matters
10. **Learn from failures**: Every interview is a learning opportunity

Remember: The interviewer wants you to succeed. They're evaluating your problem-solving process, not just the final answer.
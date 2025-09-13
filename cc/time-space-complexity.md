# Time & Space Complexity Guide

## Big O Notation Basics

### Common Time Complexities (Fastest to Slowest)
1. **O(1)** - Constant
2. **O(log n)** - Logarithmic
3. **O(n)** - Linear
4. **O(n log n)** - Linearithmic
5. **O(n²)** - Quadratic
6. **O(2ⁿ)** - Exponential
7. **O(n!)** - Factorial

### Quick Reference
```
n = 1000:
O(1)         = 1 operation
O(log n)     = ~10 operations
O(n)         = 1,000 operations
O(n log n)   = ~10,000 operations
O(n²)        = 1,000,000 operations
O(2ⁿ)        = 2^1000 operations (impossible)
```

## O(1) - Constant Time

### Examples
```typescript
// Array access
const element = arr[5];  // O(1)

// Hash map operations
map.set(key, value);     // O(1) average
map.get(key);           // O(1) average
map.has(key);           // O(1) average

// Math operations
const sum = a + b;       // O(1)
const product = a * b;   // O(1)

// Stack/Queue operations
stack.push(item);        // O(1)
stack.pop();            // O(1)
queue.enqueue(item);    // O(1) with proper implementation
```

### Space Complexity O(1)
```typescript
function swap(arr: number[], i: number, j: number): void {
    const temp = arr[i];  // O(1) space
    arr[i] = arr[j];
    arr[j] = temp;
}
```

## O(log n) - Logarithmic Time

### Examples
```typescript
// Binary search
function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {  // Halves search space each iteration
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}
// Time: O(log n), Space: O(1)

// Binary tree operations (balanced)
function findInBST(root: TreeNode | null, val: number): boolean {
    if (!root) return false;
    if (root.val === val) return true;
    if (val < root.val) return findInBST(root.left, val);
    return findInBST(root.right, val);
}
// Time: O(log n) for balanced tree, Space: O(log n) for recursion stack
```

### Why log n?
- Dividing by 2 repeatedly: n → n/2 → n/4 → ... → 1
- Number of steps = log₂(n)

## O(n) - Linear Time

### Examples
```typescript
// Array traversal
function findMax(arr: number[]): number {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {  // O(n)
        max = Math.max(max, arr[i]);
    }
    return max;
}
// Time: O(n), Space: O(1)

// Linear search
function linearSearch(arr: number[], target: number): number {
    for (let i = 0; i < arr.length; i++) {  // O(n)
        if (arr[i] === target) return i;
    }
    return -1;
}
// Time: O(n), Space: O(1)

// Building hash map
function buildFrequencyMap(arr: number[]): Map<number, number> {
    const freq = new Map();
    for (const num of arr) {  // O(n)
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    return freq;
}
// Time: O(n), Space: O(n)
```

## O(n log n) - Linearithmic Time

### Examples
```typescript
// Efficient sorting algorithms
arr.sort((a, b) => a - b);  // O(n log n) - typically uses QuickSort/MergeSort

// Merge sort
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));   // T(n/2)
    const right = mergeSort(arr.slice(mid));     // T(n/2)
    
    return merge(left, right);  // O(n)
}
// Time: O(n log n), Space: O(n)

// Heap operations
function heapSort(arr: number[]): void {
    buildHeap(arr);           // O(n)
    for (let i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        heapify(arr, 0, i);   // O(log n)
    }
}
// Time: O(n log n), Space: O(1)
```

### Why n log n?
- Divide and conquer: log n levels, n work per level
- n items × log n operations each

## O(n²) - Quadratic Time

### Examples
```typescript
// Nested loops
function findPairs(arr: number[]): number[][] {
    const pairs: number[][] = [];
    for (let i = 0; i < arr.length; i++) {        // O(n)
        for (let j = i + 1; j < arr.length; j++) { // O(n)
            pairs.push([arr[i], arr[j]]);
        }
    }
    return pairs;
}
// Time: O(n²), Space: O(n²)

// Bubble sort
function bubbleSort(arr: number[]): void {
    for (let i = 0; i < arr.length; i++) {        // O(n)
        for (let j = 0; j < arr.length - i - 1; j++) { // O(n)
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
}
// Time: O(n²), Space: O(1)

// Check if array has duplicates (naive)
function hasDuplicatesNaive(arr: number[]): boolean {
    for (let i = 0; i < arr.length; i++) {        // O(n)
        for (let j = i + 1; j < arr.length; j++) { // O(n)
            if (arr[i] === arr[j]) return true;
        }
    }
    return false;
}
// Time: O(n²), Space: O(1)
```

## O(2ⁿ) - Exponential Time

### Examples
```typescript
// Fibonacci (naive recursion)
function fib(n: number): number {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);  // 2 recursive calls
}
// Time: O(2ⁿ), Space: O(n) for call stack

// Generate all subsets
function subsets(nums: number[]): number[][] {
    const result: number[][] = [];
    
    function backtrack(start: number, current: number[]) {
        result.push([...current]);
        
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}
// Time: O(2ⁿ), Space: O(n) for recursion depth
```

## O(n!) - Factorial Time

### Examples
```typescript
// Generate all permutations
function permute(nums: number[]): number[][] {
    const result: number[][] = [];
    
    function backtrack(current: number[]) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        
        for (const num of nums) {
            if (current.includes(num)) continue;
            current.push(num);
            backtrack(current);
            current.pop();
        }
    }
    
    backtrack([]);
    return result;
}
// Time: O(n! × n), Space: O(n) for recursion depth

// Traveling salesman (brute force)
// N-Queens problem (naive)
```

## Space Complexity Patterns

### O(1) - Constant Space
```typescript
// In-place algorithms
function reverseArray(arr: number[]): void {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        swap(arr, left, right);
        left++;
        right--;
    }
}
```

### O(n) - Linear Space
```typescript
// Creating new arrays/data structures
function duplicateArray(arr: number[]): number[] {
    return [...arr];  // O(n) space
}

// Hash maps
const map = new Map();
for (const item of arr) {
    map.set(item, true);  // O(n) space worst case
}

// Recursion call stack
function factorial(n: number): number {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // O(n) stack space
}
```

### O(n²) - Quadratic Space
```typescript
// 2D arrays
function createMatrix(n: number): number[][] {
    const matrix: number[][] = [];
    for (let i = 0; i < n; i++) {
        matrix.push(new Array(n).fill(0));  // O(n²) space
    }
    return matrix;
}

// Dynamic programming tables
function longestCommonSubsequence(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;
    const dp: number[][] = Array(m + 1).fill(0)
        .map(() => Array(n + 1).fill(0));  // O(m × n) space
    
    // ... algorithm
    return dp[m][n];
}
```

## Common Data Structure Operations

### Arrays
| Operation | Time | Space |
|-----------|------|-------|
| Access | O(1) | - |
| Search | O(n) | - |
| Insert (end) | O(1) amortized | - |
| Insert (beginning) | O(n) | - |
| Delete (end) | O(1) | - |
| Delete (beginning) | O(n) | - |

### Linked Lists
| Operation | Time | Space |
|-----------|------|-------|
| Access | O(n) | - |
| Search | O(n) | - |
| Insert (head) | O(1) | - |
| Insert (tail) | O(n) or O(1) with tail pointer | - |
| Delete (head) | O(1) | - |
| Delete (middle) | O(n) | - |

### Hash Tables
| Operation | Average | Worst | Space |
|-----------|---------|-------|-------|
| Insert | O(1) | O(n) | O(n) |
| Delete | O(1) | O(n) | O(n) |
| Search | O(1) | O(n) | O(n) |

### Binary Search Trees
| Operation | Average | Worst (unbalanced) | Space |
|-----------|---------|-------------------|-------|
| Insert | O(log n) | O(n) | O(1) |
| Delete | O(log n) | O(n) | O(1) |
| Search | O(log n) | O(n) | O(1) |

### Heaps
| Operation | Time | Space |
|-----------|------|-------|
| Insert | O(log n) | O(1) |
| Extract Min/Max | O(log n) | O(1) |
| Peek Min/Max | O(1) | - |
| Build Heap | O(n) | O(n) |

## Algorithm Complexity Cheat Sheet

### Sorting Algorithms
| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|---------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Counting Sort | O(n + k) | O(n + k) | O(n + k) | O(k) | Yes |

### Search Algorithms
| Algorithm | Time | Space | Requirement |
|-----------|------|-------|-------------|
| Linear Search | O(n) | O(1) | None |
| Binary Search | O(log n) | O(1) | Sorted array |
| DFS | O(V + E) | O(V) | Graph |
| BFS | O(V + E) | O(V) | Graph |

## Optimization Techniques

### 1. Use Better Data Structures
```typescript
// Instead of O(n) search in array
const arr = [1, 2, 3, 4, 5];
const found = arr.includes(3);  // O(n)

// Use Set for O(1) lookup
const set = new Set([1, 2, 3, 4, 5]);
const found = set.has(3);  // O(1)
```

### 2. Avoid Nested Loops When Possible
```typescript
// O(n²) - finding two sum
function twoSumNaive(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) return [i, j];
        }
    }
    return [];
}

// O(n) - using hash map
function twoSumOptimal(nums: number[], target: number): number[] {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}
```

### 3. Use Memoization for Overlapping Subproblems
```typescript
// O(2ⁿ) - naive fibonacci
function fibNaive(n: number): number {
    if (n <= 1) return n;
    return fibNaive(n - 1) + fibNaive(n - 2);
}

// O(n) - with memoization
function fibMemo(n: number, memo = new Map()): number {
    if (n <= 1) return n;
    if (memo.has(n)) return memo.get(n);
    
    const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    memo.set(n, result);
    return result;
}
```

### 4. Early Termination
```typescript
// Check if array is sorted
function isSorted(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) return false;  // Early exit
    }
    return true;
}
```

## Interview Tips

1. **Always discuss complexity**: State time and space complexity for your solution
2. **Consider trade-offs**: Sometimes using more space can improve time complexity
3. **Think about worst case**: Always consider what input would cause worst-case behavior
4. **Optimize incrementally**: Start with brute force, then optimize
5. **Common improvements**:
   - Can sorting help? (O(n log n) might be better than O(n²))
   - Can a hash map help? (Trade space for time)
   - Can memoization help? (For recursive problems)
   - Can binary search help? (For sorted data)
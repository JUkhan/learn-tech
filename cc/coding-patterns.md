# Common Coding Patterns & Techniques

## 1. Two Pointers

### When to Use
- Sorted arrays/linked lists
- Finding pairs with specific sum
- Palindrome problems
- Removing duplicates

### Patterns

#### Opposite Direction
```typescript
function twoSum(nums: number[], target: number): number[] {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const sum = nums[left] + nums[right];
        
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [];
}

// Container with most water
function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, width * minHeight);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}
```

**How Opposite Direction Works:**
- Start with pointers at opposite ends of the array
- Move pointers towards each other based on condition
- For sorted arrays: if sum too small, move left pointer right; if too large, move right pointer left
- For container problem: always move the pointer with smaller height (potential for finding taller line)

#### Same Direction (Fast & Slow)
```typescript
// Remove duplicates from sorted array
function removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    let slow = 0;
    
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    
    return slow + 1;
}

// Move zeroes
function moveZeroes(nums: number[]): void {
    let nonZeroPos = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            [nums[nonZeroPos], nums[i]] = [nums[i], nums[nonZeroPos]];
            nonZeroPos++;
        }
    }
}
```

**How Same Direction Works:**
- Slow pointer maintains the "processed" portion of array
- Fast pointer explores ahead to find elements
- For duplicates: slow points to last unique element, fast finds next unique
- For moving zeros: nonZeroPos tracks where next non-zero should go

## 2. Sliding Window

### When to Use
- Contiguous subarrays/substrings
- Finding longest/shortest substring with condition
- Maximum/minimum sum of k-size subarray

### Fixed Window
```typescript
function maxSumSubarray(arr: number[], k: number): number {
    let maxSum = 0;
    let windowSum = 0;
    
    // Build first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}
```

**How Fixed Window Works:**
- Window size stays constant (k elements)
- Build initial window by summing first k elements
- Slide by removing leftmost element and adding new rightmost
- Track maximum/minimum as window slides
- Efficient: O(n) instead of O(n*k) for recalculating each window

### Variable Window
```typescript
// Longest substring without repeating characters
function lengthOfLongestSubstring(s: string): number {
    const charSet = new Set<string>();
    let maxLength = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Minimum window substring
function minWindow(s: string, t: string): string {
    const need = new Map<string, number>();
    const window = new Map<string, number>();
    
    for (const char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let left = 0;
    let minLen = Infinity;
    let minStart = 0;
    let valid = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        if (need.has(char)) {
            window.set(char, (window.get(char) || 0) + 1);
            if (window.get(char) === need.get(char)) {
                valid++;
            }
        }
        
        while (valid === need.size) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            
            const leftChar = s[left];
            left++;
            
            if (need.has(leftChar)) {
                if (window.get(leftChar) === need.get(leftChar)) {
                    valid--;
                }
                window.set(leftChar, window.get(leftChar)! - 1);
            }
        }
    }
    
    return minLen === Infinity ? "" : s.substr(minStart, minLen);
}
```

**How Variable Window Works:**
- Window size changes based on conditions
- Expand window by moving right pointer
- Contract window by moving left pointer when condition violated
- For longest substring: shrink when duplicate found
- For minimum window: shrink when all required chars included
- Track best result as window changes

## 3. Fast & Slow Pointers

### When to Use
- Cycle detection in linked list
- Finding middle element
- Palindrome in linked list

```typescript
// Detect cycle
function hasCycle(head: ListNode | null): boolean {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
        
        if (slow === fast) return true;
    }
    
    return false;
}

// Find cycle start
function detectCycle(head: ListNode | null): ListNode | null {
    let slow = head;
    let fast = head;
    
    // Find meeting point
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            // Find cycle start
            slow = head;
            while (slow !== fast) {
                slow = slow!.next;
                fast = fast!.next;
            }
            return slow;
        }
    }
    
    return null;
}

// Happy number
function isHappy(n: number): boolean {
    const getNext = (num: number): number => {
        let sum = 0;
        while (num > 0) {
            const digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    };
    
    let slow = n;
    let fast = getNext(n);
    
    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }
    
    return fast === 1;
}
```

**How Fast & Slow Pointers Work:**
- Floyd's Cycle Detection (Tortoise and Hare)
- Slow moves 1 step, fast moves 2 steps
- If cycle exists, they will meet (fast catches up to slow)
- To find cycle start: reset one pointer to head, move both 1 step at a time
- For finding middle: when fast reaches end, slow is at middle
- Works because fast covers 2x distance of slow

## 4. Merge Intervals

### When to Use
- Overlapping intervals
- Calendar problems
- Meeting rooms

```typescript
// Merge overlapping intervals
function merge(intervals: number[][]): number[][] {
    if (intervals.length <= 1) return intervals;
    
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    const merged: number[][] = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const last = merged[merged.length - 1];
        const current = intervals[i];
        
        if (current[0] <= last[1]) {
            // Overlapping, merge
            last[1] = Math.max(last[1], current[1]);
        } else {
            // Non-overlapping, add new
            merged.push(current);
        }
    }
    
    return merged;
}

// Insert interval
function insert(intervals: number[][], newInterval: number[]): number[][] {
    const result: number[][] = [];
    let i = 0;
    
    // Add all intervals before newInterval
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }
    
    // Merge overlapping intervals
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);
    
    // Add remaining intervals
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }
    
    return result;
}
```

**How Merge Intervals Works:**
- Sort intervals by start time first
- Compare each interval with the last merged interval
- If overlapping (current.start <= last.end), extend the end time
- If not overlapping, add as new interval
- For insertion: find position, merge all overlapping, add rest
- Key insight: after sorting, only need to check with last merged interval

## 5. Cyclic Sort

### When to Use
- Array contains numbers in range [1, n]
- Finding missing/duplicate numbers

```typescript
// Cyclic sort
function cyclicSort(nums: number[]): void {
    let i = 0;
    while (i < nums.length) {
        const correctPos = nums[i] - 1;
        if (nums[i] !== nums[correctPos]) {
            // Swap to correct position
            [nums[i], nums[correctPos]] = [nums[correctPos], nums[i]];
        } else {
            i++;
        }
    }
}

// Find missing number
function missingNumber(nums: number[]): number {
    let i = 0;
    while (i < nums.length) {
        const correctPos = nums[i];
        if (correctPos < nums.length && nums[i] !== nums[correctPos]) {
            [nums[i], nums[correctPos]] = [nums[correctPos], nums[i]];
        } else {
            i++;
        }
    }
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i) return i;
    }
    
    return nums.length;
}

// Find all duplicates
function findDuplicates(nums: number[]): number[] {
    const duplicates: number[] = [];
    
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1;
        if (nums[index] < 0) {
            duplicates.push(index + 1);
        } else {
            nums[index] = -nums[index];
        }
    }
    
    return duplicates;
}
```

**How Cyclic Sort Works:**
- Place each number at its correct index (number n goes to index n-1)
- Keep swapping until current position has correct number
- After sorting, missing/duplicate numbers are easy to find
- For duplicates: use array values as indices, mark visited by negating
- If already negative, it's a duplicate
- O(n) time because each element is moved at most once

## 6. Tree BFS

### When to Use
- Level order traversal
- Finding minimum depth
- Zigzag traversal

```typescript
// Level order traversal
function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}

// Zigzag level order
function zigzagLevelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    let leftToRight = true;
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            
            if (leftToRight) {
                currentLevel.push(node.val);
            } else {
                currentLevel.unshift(node.val);
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
        leftToRight = !leftToRight;
    }
    
    return result;
}

// Right side view
function rightSideView(root: TreeNode | null): number[] {
    if (!root) return [];
    
    const result: number[] = [];
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            
            // Add rightmost element of each level
            if (i === levelSize - 1) {
                result.push(node.val);
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
}
```

**How Tree BFS Works:**
- Use queue to process nodes level by level
- Process all nodes at current level before moving to next
- Track level size to know when level ends
- For zigzag: alternate between push (left-to-right) and unshift (right-to-left)
- For right view: only take last node of each level
- Key: process exactly levelSize nodes per iteration

## 7. Tree DFS

### When to Use
- Path problems
- Subtree problems
- Tree construction

```typescript
// Path sum
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (!root) return false;
    
    if (!root.left && !root.right) {
        return root.val === targetSum;
    }
    
    const remainingSum = targetSum - root.val;
    return hasPathSum(root.left, remainingSum) || 
           hasPathSum(root.right, remainingSum);
}

// All paths from root to leaf
function binaryTreePaths(root: TreeNode | null): string[] {
    const result: string[] = [];
    
    function dfs(node: TreeNode | null, path: string) {
        if (!node) return;
        
        path += node.val;
        
        if (!node.left && !node.right) {
            result.push(path);
        } else {
            path += "->";
            dfs(node.left, path);
            dfs(node.right, path);
        }
    }
    
    dfs(root, "");
    return result;
}

// Maximum path sum
function maxPathSum(root: TreeNode | null): number {
    let maxSum = -Infinity;
    
    function maxGain(node: TreeNode | null): number {
        if (!node) return 0;
        
        // Get max sum going through left and right child
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);
        
        // Max path through current node
        const currentMax = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, currentMax);
        
        // Return max gain if we continue path through current node
        return node.val + Math.max(leftGain, rightGain);
    }
    
    maxGain(root);
    return maxSum;
}
```

**How Tree DFS Works:**
- Recursively explore depth-first (go deep before wide)
- For path sum: subtract current value, check if leaf matches remaining
- For all paths: build path string as we traverse, save when reaching leaf
- For max path sum: consider path through node vs path continuing up
- Key insight: what to return vs what to track globally
- Return value often differs from what we're looking for

## 8. Backtracking

### When to Use
- Generate all combinations/permutations
- Subset problems
- N-Queens, Sudoku

```typescript
// Subsets
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

// Permutations
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

// Combination sum
function combinationSum(candidates: number[], target: number): number[][] {
    const result: number[][] = [];
    
    function backtrack(remain: number, combo: number[], start: number) {
        if (remain === 0) {
            result.push([...combo]);
            return;
        }
        
        if (remain < 0) return;
        
        for (let i = start; i < candidates.length; i++) {
            combo.push(candidates[i]);
            backtrack(remain - candidates[i], combo, i);
            combo.pop();
        }
    }
    
    backtrack(target, [], 0);
    return result;
}

// Letter combinations of phone number
function letterCombinations(digits: string): string[] {
    if (!digits) return [];
    
    const phone: { [key: string]: string } = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    const result: string[] = [];
    
    function backtrack(index: number, current: string) {
        if (index === digits.length) {
            result.push(current);
            return;
        }
        
        const letters = phone[digits[index]];
        for (const letter of letters) {
            backtrack(index + 1, current + letter);
        }
    }
    
    backtrack(0, "");
    return result;
}
```

**How Backtracking Works:**
- Explore all possible solutions by building incrementally
- Make a choice, explore, then undo (backtrack) to try other choices
- For subsets: include/exclude each element
- For permutations: try each unused element at current position
- For combinations: avoid duplicates by tracking start index
- Key pattern: push → recurse → pop (undo)
- Always copy when adding to result (arrays are references)

## 9. Dynamic Programming

### When to Use
- Optimization problems (min/max)
- Count number of ways
- Decision making with states

### Top-Down (Memoization)
```typescript
// Fibonacci with memoization
function fib(n: number): number {
    const memo = new Map<number, number>();
    
    function helper(n: number): number {
        if (n <= 1) return n;
        
        if (memo.has(n)) return memo.get(n)!;
        
        const result = helper(n - 1) + helper(n - 2);
        memo.set(n, result);
        return result;
    }
    
    return helper(n);
}

// House robber
function rob(nums: number[]): number {
    const memo = new Map<number, number>();
    
    function helper(i: number): number {
        if (i >= nums.length) return 0;
        
        if (memo.has(i)) return memo.get(i)!;
        
        // Rob current house or skip it
        const result = Math.max(
            nums[i] + helper(i + 2),  // Rob current
            helper(i + 1)              // Skip current
        );
        
        memo.set(i, result);
        return result;
    }
    
    return helper(0);
}
```

**How Top-Down DP (Memoization) Works:**
- Start with recursive solution
- Store results of subproblems in memo/cache
- Check cache before computing
- Converts exponential time to polynomial
- Natural for problems defined recursively
- Trade space for time

### Bottom-Up (Tabulation)
```typescript
// Climbing stairs
function climbStairs(n: number): number {
    if (n <= 2) return n;
    
    const dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Coin change
function coinChange(coins: number[], amount: number): number {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Longest increasing subsequence
function lengthOfLIS(nums: number[]): number {
    const dp = new Array(nums.length).fill(1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}
```

**How Bottom-Up DP (Tabulation) Works:**
- Build solution from smallest subproblems up
- Create table/array to store results
- Fill table iteratively using recurrence relation
- For stairs: dp[i] = ways to reach step i
- For coins: dp[i] = min coins for amount i
- For LIS: dp[i] = longest subsequence ending at index i
- Often more space-efficient than recursion (no call stack)

## 10. Binary Search

### When to Use
- Sorted array
- Finding specific value
- Finding boundary/rotation point

```typescript
// Classic binary search
function binarySearch(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Find first/last occurrence
function searchRange(nums: number[], target: number): number[] {
    function findBound(isFirst: boolean): number {
        let left = 0;
        let right = nums.length - 1;
        let bound = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (nums[mid] === target) {
                bound = mid;
                if (isFirst) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return bound;
    }
    
    return [findBound(true), findBound(false)];
}

// Search in rotated array
function searchRotated(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) return mid;
        
        // Check which half is sorted
        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

// Find peak element
function findPeakElement(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] < nums[mid + 1]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}
```

**How Binary Search Works:**
- Eliminate half of search space each iteration
- Compare middle element with target
- For first/last occurrence: continue searching after finding target
- For rotated array: identify which half is sorted, then check if target is in that range
- For peak: move towards the higher neighbor (guaranteed to find peak)
- Key: maintain invariant that answer is in [left, right]

## 11. Bit Manipulation

### When to Use
- Count bits
- Power of 2
- XOR problems

```typescript
// Count set bits
function hammingWeight(n: number): number {
    let count = 0;
    while (n !== 0) {
        count++;
        n &= n - 1; // Remove rightmost set bit
    }
    return count;
}

// Is power of two
function isPowerOfTwo(n: number): boolean {
    return n > 0 && (n & (n - 1)) === 0;
}

// Single number (all appear twice except one)
function singleNumber(nums: number[]): number {
    let result = 0;
    for (const num of nums) {
        result ^= num;
    }
    return result;
}

// Missing number using XOR
function missingNumberXOR(nums: number[]): number {
    let xor = nums.length;
    for (let i = 0; i < nums.length; i++) {
        xor ^= i ^ nums[i];
    }
    return xor;
}

// Reverse bits
function reverseBits(n: number): number {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    return result >>> 0; // Convert to unsigned
}
```

**How Bit Manipulation Works:**
- `n & (n-1)`: Removes rightmost set bit (Brian Kernighan's algorithm)
- Power of 2: Has exactly one bit set, so n & (n-1) = 0
- XOR properties: a^a=0, a^0=a, commutative (order doesn't matter)
- For single number: all pairs cancel out, leaving unique number
- For missing: XOR all indices with all values, pairs cancel
- Bit shifting: << (left shift), >> (right shift), | (OR), & (AND)

## 12. Greedy

### When to Use
- Local optimal choice leads to global optimal
- Activity selection
- Huffman coding

```typescript
// Jump game
function canJump(nums: number[]): boolean {
    let maxReach = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) return true;
    }
    
    return true;
}

// Best time to buy and sell stock
function maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}

// Gas station
function canCompleteCircuit(gas: number[], cost: number[]): number {
    let totalGas = 0;
    let totalCost = 0;
    let currentGas = 0;
    let startIndex = 0;
    
    for (let i = 0; i < gas.length; i++) {
        totalGas += gas[i];
        totalCost += cost[i];
        currentGas += gas[i] - cost[i];
        
        if (currentGas < 0) {
            startIndex = i + 1;
            currentGas = 0;
        }
    }
    
    return totalGas >= totalCost ? startIndex : -1;
}
```

**How Greedy Algorithms Work:**
- Make locally optimal choice at each step
- Hope it leads to globally optimal solution
- Jump game: track farthest reachable position
- Stock profit: always buy at lowest seen price
- Gas station: if can't reach from A to B, can't start anywhere between A and B
- Key: prove greedy choice property and optimal substructure
- Often simpler than DP but requires proof of correctness
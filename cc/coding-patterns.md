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
```
This is a clean implementation of the two-pointer technique for removing duplicates from a sorted array in-place. Here's how it works:

**Algorithm Overview:**
- Uses two pointers: `slow` (tracks position for next unique element) and `fast` (scans through the array)
- When a new unique element is found, it's moved to the `slow` position
- Returns the length of the array with unique elements

**Step-by-step breakdown:**
1. Handle edge case: empty array returns 0
2. Initialize `slow` at index 0 (first element is always unique)
3. `fast` pointer starts at index 1, comparing each element with `nums[slow]`
4. When `nums[fast] !== nums[slow]`, increment `slow` and copy the unique element
5. Return `slow + 1` (length of unique elements)

**Example walkthrough:**
```
Input: [1, 1, 2, 2, 3]
Step 1: slow=0, fast=1 → nums[1]=1 === nums[0]=1, continue
Step 2: slow=0, fast=2 → nums[2]=2 !== nums[0]=1, slow=1, nums[1]=2
Step 3: slow=1, fast=3 → nums[3]=2 === nums[1]=2, continue  
Step 4: slow=1, fast=4 → nums[4]=3 !== nums[1]=2, slow=2, nums[2]=3
Result: [1, 2, 3, 2, 3], return 3
```

**Time Complexity:** O(n) - single pass through array
**Space Complexity:** O(1) - only uses two pointers

The code is efficient and follows the typical constraints for this problem (modifying the array in-place and returning the new length).

```typescript
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
This is an elegant solution for moving all zeros to the end of an array while maintaining the relative order of non-zero elements. Here's the breakdown:

**Algorithm Overview:**
- Uses a single pointer `nonZeroPos` to track where the next non-zero element should be placed
- Swaps non-zero elements to the front positions
- Zeros naturally end up at the end through the swapping process

**Step-by-step breakdown:**
1. `nonZeroPos` starts at 0 (position for next non-zero element)
2. Iterate through array with `i`
3. When `nums[i]` is non-zero, swap it with element at `nonZeroPos`
4. Increment `nonZeroPos` to prepare for next non-zero element

**Example walkthrough:**
```
Input: [0, 1, 0, 3, 12]
Step 1: i=0, nums[0]=0, skip (no swap)
Step 2: i=1, nums[1]=1 ≠ 0, swap nums[0]↔nums[1] → [1, 0, 0, 3, 12], nonZeroPos=1
Step 3: i=2, nums[2]=0, skip
Step 4: i=3, nums[3]=3 ≠ 0, swap nums[1]↔nums[3] → [1, 3, 0, 0, 12], nonZeroPos=2  
Step 5: i=4, nums[4]=12 ≠ 0, swap nums[2]↔nums[4] → [1, 3, 12, 0, 0], nonZeroPos=3
Result: [1, 3, 12, 0, 0]
```

**Key Insights:**
- The swap operation is safe even when `i === nonZeroPos` (swapping element with itself)
- Maintains relative order of non-zero elements
- No extra space needed beyond the swap variables

**Time Complexity:** O(n) - single pass
**Space Complexity:** O(1) - in-place modification

This is more efficient than approaches that might require multiple passes or additional arrays. The destructuring assignment syntax `[nums[nonZeroPos], nums[i]] = [nums[i], nums[nonZeroPos]]` makes the swap very readable.

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
```
This is an excellent implementation of the sliding window technique for finding the longest substring without repeating characters. Here's the detailed breakdown:

**Algorithm Overview:**
- Uses a sliding window with `left` and `right` pointers
- `Set` tracks characters in the current window
- Expands window by moving `right`, shrinks by moving `left` when duplicates are found

**Step-by-step breakdown:**
1. Initialize empty `Set`, `maxLength = 0`, and `left = 0`
2. Expand window by incrementing `right`
3. If `s[right]` already exists in the window, shrink from left until duplicate is removed
4. Add `s[right]` to the set and update `maxLength`
5. Continue until `right` reaches the end

**Example walkthrough:**
```
Input: "abcabcbb"
right=0: 'a' → set={a}, window="a", maxLength=1
right=1: 'b' → set={a,b}, window="ab", maxLength=2  
right=2: 'c' → set={a,b,c}, window="abc", maxLength=3
right=3: 'a' found! Shrink window:
  - Remove s[0]='a', left=1, set={b,c}
  - Add 'a' → set={b,c,a}, window="bca", maxLength=3
right=4: 'b' found! Shrink window:
  - Remove s[1]='b', left=2, set={c,a}  
  - Add 'b' → set={c,a,b}, window="cab", maxLength=3
...and so on
Result: 3
```

**Key Features:**
- **Efficient duplicate handling:** The `while` loop ensures all duplicates are removed before adding the new character
- **Optimal window management:** Never revisits characters unnecessarily
- **Clean state tracking:** Set operations are O(1) for add/delete/has

**Time Complexity:** O(n) - each character is visited at most twice (once by `right`, once by `left`)
**Space Complexity:** O(min(m,n)) where m is charset size and n is string length

**Alternative approaches comparison:**
- **Brute force:** O(n³) - check all substrings
- **Optimized sliding window with map:** Similar O(n) but tracks indices instead of just presence

This solution strikes the perfect balance between clarity and efficiency. The Set-based approach is particularly intuitive for understanding the sliding window concept.

```typescript
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
This is a sophisticated implementation of the sliding window technique for the "Minimum Window Substring" problem. It's one of the more complex sliding window problems, and your solution handles it excellently. Here's the breakdown:

**Algorithm Overview:**
- Uses two hash maps: `need` (target character counts) and `window` (current window character counts)
- `valid` counter tracks how many character requirements are fully satisfied
- Expands window with `right`, contracts with `left` when all requirements are met

**Step-by-step breakdown:**
1. **Setup:** Build `need` map from target string `t`
2. **Expand:** Move `right` pointer, add characters to `window`
3. **Validate:** When `window[char] === need[char]`, increment `valid`
4. **Contract:** When `valid === need.size` (all requirements met), try to shrink window
5. **Update:** Track minimum valid window found

**Example walkthrough:**
```
Input: s="ADOBECODEBANC", t="ABC"
need = {A:1, B:1, C:1}

right=0: 'A' → window={A:1}, valid=1
right=1: 'D' → not needed, continue
right=2: 'O' → not needed, continue  
right=3: 'B' → window={A:1,B:1}, valid=2
right=4: 'E' → not needed, continue
right=5: 'C' → window={A:1,B:1,C:1}, valid=3

valid === need.size(3)! Contract window:
- Current window: "ADOBEC" (length 6)
- Try shrinking from left...
- Remove 'A': valid=2, window invalid, stop contracting

Continue expanding until finding "BANC" (length 4)
Result: "BANC"
```

**Key Implementation Details:**

**Smart validation tracking:**
```typescript
if (window.get(char) === need.get(char)) {
    valid++;  // This character requirement is now fully satisfied
}
```

**Careful contraction logic:**
```typescript
if (window.get(leftChar) === need.get(leftChar)) {
    valid--;  // About to break this character requirement
}
window.set(leftChar, window.get(leftChar)! - 1);
```

**Edge cases handled:**
- Empty result when no valid window exists
- Characters in `s` that aren't in `t` are ignored
- Duplicate characters in `t` are properly counted

**Time Complexity:** O(|s| + |t|) - each character in `s` is visited at most twice

**Space Complexity:** O(|s| + |t|) - for the hash maps

**Common pitfalls this solution avoids:**
- **Order of operations:** Checks `valid` before decrementing character count during contraction
- **Duplicate handling:** Properly manages character frequencies rather than just presence
- **Edge case:** Returns empty string when no valid window exists

This is a textbook-perfect implementation of one of the most challenging sliding window problems. The use of the `valid` counter is particularly elegant, avoiding the need to check all character counts in each iteration.

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
```
This is a well-implemented solution for detecting the start of a cycle in a linked list using Floyd's Cycle Detection Algorithm (also known as the "tortoise and hare" algorithm). Let me break down how it works:

## Algorithm Steps:

1. **Phase 1 - Detect if cycle exists:**
   - Use two pointers: `slow` (moves 1 step) and `fast` (moves 2 steps)
   - If there's a cycle, they'll eventually meet inside the cycle
   - If no cycle, `fast` will reach the end (null)

2. **Phase 2 - Find cycle start:**
   - Reset `slow` to head, keep `fast` at meeting point
   - Move both pointers one step at a time
   - They'll meet at the cycle's starting node

## Why this works mathematically:

When the pointers first meet:
- Let's say the cycle start is distance `a` from head
- The meeting point is distance `b` from cycle start
- The cycle length is `c`

At the meeting point:
- `slow` has traveled: `a + b`
- `fast` has traveled: `a + b + nc` (where n is number of complete cycles)

Since `fast` travels twice as fast: `2(a + b) = a + b + nc`
This simplifies to: `a + b = nc`, so `a = nc - b`

This means the distance from head to cycle start (`a`) equals the distance from meeting point to cycle start (`c - b`), which is why moving both pointers one step at a time from their respective positions makes them meet at the cycle start.

## Time & Space Complexity:
- **Time:** O(n) - each node visited at most 3 times
- **Space:** O(1) - only using two pointers

The code handles edge cases well (empty list, single node) and uses TypeScript's non-null assertion operator (`!`) appropriately since we know the pointers won't be null in those contexts.
```typescript
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
This is an excellent solution for the "Happy Number" problem that cleverly applies Floyd's Cycle Detection Algorithm! It's a creative approach that treats the problem as cycle detection in a sequence.

## How it works:

**Happy Number Definition:** A number is happy if repeatedly replacing it with the sum of squares of its digits eventually leads to 1.

**Key Insight:** If a number isn't happy, the sequence will eventually enter a cycle (it can't grow indefinitely since the sum of squares of digits has an upper bound).

## Algorithm Breakdown:

1. **`getNext` function:** Calculates sum of squares of digits
   - Extract each digit using `num % 10`
   - Square it and add to sum
   - Remove digit using `Math.floor(num / 10)`

2. **Cycle Detection:** Uses tortoise and hare approach
   - `slow`: moves one step (applies `getNext` once)
   - `fast`: moves two steps (applies `getNext` twice)
   - If there's a cycle, they'll meet
   - If the number is happy, `fast` will reach 1

3. **Result:** Return `true` if we reach 1, `false` if we detect a cycle

## Example Walkthrough:
```
n = 19
19 → 1² + 9² = 82
82 → 8² + 2² = 68
68 → 6² + 8² = 100
100 → 1² + 0² + 0² = 1 ✓ (Happy!)

n = 2
2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4... (Cycle!)
```

## Complexity:
- **Time:** O(log n) - the number of digits in n determines the sequence length before cycling
- **Space:** O(1) - only using two variables

This is more elegant than the alternative approach of using a HashSet to track seen numbers, as it achieves the same result with constant space complexity. Great application of the two-pointer technique to a non-obvious problem!

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

```
This is a clean and efficient solution for merging overlapping intervals! The algorithm follows the optimal approach for this classic problem.

## Algorithm Breakdown:

1. **Edge case handling:** Return early if 0 or 1 intervals
2. **Sort intervals:** By start time to process them in order
3. **Iterate and merge:** Compare each interval with the last merged one

## Key Logic:

**Overlap condition:** `current[0] <= last[1]`
- Current interval starts before or at the end of the last merged interval

**Merge operation:** `last[1] = Math.max(last[1], current[1])`
- Extend the end time to the maximum of both intervals

## Example Walkthrough:
```typescript
Input: [[1,3],[2,6],[8,10],[15,18]]

After sorting: [[1,3],[2,6],[8,10],[15,18]]
merged = [[1,3]]

i=1: [2,6] vs [1,3] → 2 ≤ 3 → merge → [[1,6]]
i=2: [8,10] vs [1,6] → 8 > 6 → add → [[1,6],[8,10]]
i=3: [15,18] vs [8,10] → 15 > 10 → add → [[1,6],[8,10],[15,18]]
```

## Edge Cases Handled Well:
- Empty array: `[]` → `[]`
- Single interval: `[[1,4]]` → `[[1,4]]`
- All overlapping: `[[1,4],[2,3]]` → `[[1,4]]`
- Touching intervals: `[[1,4],[4,5]]` → `[[1,5]]` ✓

## Complexity:
- **Time:** O(n log n) due to sorting
- **Space:** O(1) if we don't count the output array (modifies in-place via sorting)

## Alternative Considerations:
The solution correctly handles the case where intervals are contained within others (like `[2,3]` within `[1,4]`) by using `Math.max()` for the end time. This is more robust than simply extending to `current[1]`.

Great implementation of a fundamental interval processing algorithm!

```typescript
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
This is a clean and efficient implementation of the "Insert Interval" algorithm! Let me break down how it works:

**Algorithm Overview:**
The function inserts a new interval into a sorted list of non-overlapping intervals and merges any overlapping intervals.

**Step-by-step breakdown:**

1. **Add non-overlapping intervals before the new interval**
   ```typescript
   while (i < intervals.length && intervals[i][1] < newInterval[0])
   ```
   This adds all intervals that end before the new interval starts (no overlap possible).

2. **Merge overlapping intervals**
   ```typescript
   while (i < intervals.length && intervals[i][0] <= newInterval[1])
   ```
   For any interval that starts before or at the end of the new interval, merge them by:
   - Taking the minimum start: `Math.min(newInterval[0], intervals[i][0])`
   - Taking the maximum end: `Math.max(newInterval[1], intervals[i][1])`

3. **Add the merged interval**
   Push the final merged interval to the result.

4. **Add remaining intervals**
   Add any intervals that come after the merged interval.

**Time Complexity:** O(n) - single pass through the intervals
**Space Complexity:** O(n) - for the result array

**Example:**
```typescript
insert([[1,3],[6,9]], [2,5]) 
// Returns [[1,5],[6,9]]
// [2,5] overlaps with [1,3] → merge to [1,5]
```

The implementation handles edge cases well and maintains the sorted order of intervals. Nice work!

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
```
This is a great implementation of the cyclic sort algorithm! It's particularly useful for problems involving arrays with numbers in a specific range.

**Algorithm Overview:**
Cyclic sort places each number at its "correct" index position. For numbers 1 to n, number `x` should be at index `x-1`.

**Step-by-step breakdown:**

1. **Calculate correct position**
   ```typescript
   const correctPos = nums[i] - 1;
   ```
   For a number `nums[i]`, its correct position is `nums[i] - 1` (since arrays are 0-indexed).

2. **Check if number is in correct position**
   ```typescript
   if (nums[i] !== nums[correctPos])
   ```
   If the current number doesn't match what should be at its correct position, swap them.

3. **Swap or advance**
   - **Swap**: Place the number in its correct position
   - **Advance**: If already correct, move to next index

**Key Insight:** We only increment `i` when the current position has the correct number. This ensures every number eventually reaches its correct position.

**Time Complexity:** O(n) - each number is moved at most once
**Space Complexity:** O(1) - in-place sorting

**Example:**
```typescript
let arr = [3, 1, 5, 4, 2];
cyclicSort(arr);
console.log(arr); // [1, 2, 3, 4, 5]

// Step by step:
// [3,1,5,4,2] → swap 3 with nums[2]=5 → [5,1,3,4,2]
// [5,1,3,4,2] → swap 5 with nums[4]=2 → [2,1,3,4,5]
// [2,1,3,4,5] → swap 2 with nums[1]=1 → [1,2,3,4,5]
```

**Common Use Cases:**
- Finding missing numbers in 1 to n range
- Finding duplicate numbers
- Finding the smallest missing positive number

Excellent implementation for this specialized but powerful sorting technique! 

```typescript
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
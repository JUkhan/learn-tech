# Coding Practice Problems with Solutions

## Easy Problems

### 1. Two Sum
**Problem:** Given an array of integers and a target sum, return indices of two numbers that add up to target.

```typescript
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    
    return [];
}

// Time: O(n), Space: O(n)
// Example: twoSum([2,7,11,15], 9) => [0,1]
```

**How it works:**
- Uses a hash map to store each number and its index as we iterate
- For each number, calculates what value we need (complement = target - current)
- Checks if that complement exists in our map (meaning we found a pair)
- If found, returns the stored index and current index
- If not found, stores current number and index for future lookups

### 2. Valid Palindrome
**Problem:** Determine if a string is a palindrome, considering only alphanumeric characters.

```typescript
function isPalindrome(s: string): boolean {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    }
    
    return true;
}

// Time: O(n), Space: O(n)
// Example: isPalindrome("A man, a plan, a canal: Panama") => true
```

**How it works:**
- First cleans the string: converts to lowercase and removes non-alphanumeric characters
- Uses two pointers: one at start (left) and one at end (right)
- Compares characters at both pointers moving inward
- If any mismatch found, returns false
- If all characters match (pointers meet), returns true

### 3. Best Time to Buy and Sell Stock
**Problem:** Find maximum profit from buying and selling stock once.

```typescript
function maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}

// Time: O(n), Space: O(1)
// Example: maxProfit([7,1,5,3,6,4]) => 5
```

**How it works:**
- Tracks the minimum price seen so far (best day to buy)
- For each price, calculates profit if we sell today (current price - min price)
- Keeps track of maximum profit seen
- Single pass through array, always buying at lowest point before current day

### 4. Valid Parentheses
**Problem:** Determine if string has valid bracket pairs.

```typescript
function isValid(s: string): boolean {
    const stack: string[] = [];
    const pairs: { [key: string]: string } = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (const char of s) {
        if (char in pairs) {
            if (stack.pop() !== pairs[char]) return false;
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}

// Time: O(n), Space: O(n)
// Example: isValid("()[]{}") => true
```

**How it works:**
- Uses a stack to track opening brackets
- When we see an opening bracket ('(', '{', '['), push to stack
- When we see a closing bracket, pop from stack and check if it matches
- If mismatch or stack empty when closing bracket found, invalid
- Valid if stack is empty at the end (all brackets matched)

### 5. Merge Two Sorted Lists
**Problem:** Merge two sorted linked lists into one sorted list.

```typescript
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    current.next = l1 || l2;
    return dummy.next;
}

// Time: O(n + m), Space: O(1)
```

**How it works:**
- Creates dummy node to simplify edge cases
- Compares values at heads of both lists
- Links the smaller value to result and advances that list's pointer
- Continues until one list is exhausted
- Attaches remaining list (if any) to result

### 6. Maximum Subarray
**Problem:** Find contiguous subarray with largest sum (Kadane's Algorithm).

```typescript
function maxSubArray(nums: number[]): number {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Time: O(n), Space: O(1)
// Example: maxSubArray([-2,1,-3,4,-1,2,1,-5,4]) => 6
```

**How it works:**
- `maxEndingHere`: Maximum sum of subarray ending at current position
- At each position, decides: start new subarray here OR extend previous subarray
- If previous sum is negative, better to start fresh
- `maxSoFar`: Tracks the best subarray sum seen anywhere

### 7. Climbing Stairs
**Problem:** Count ways to climb n stairs (1 or 2 steps at a time).

```typescript
function climbStairs(n: number): number {
    if (n <= 2) return n;
    
    let prev2 = 1;
    let prev1 = 2;
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Time: O(n), Space: O(1)
// Example: climbStairs(3) => 3
```

**How it works:**
- Dynamic programming: ways to reach step n = ways to reach (n-1) + ways to reach (n-2)
- Because we can take 1 or 2 steps
- Like Fibonacci sequence
- Uses only two variables instead of array to save space

## Medium Problems

### 8. Longest Substring Without Repeating Characters
**Problem:** Find length of longest substring without repeating characters.

```typescript
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

// Time: O(n), Space: O(min(n, m)) where m is charset size
// Example: lengthOfLongestSubstring("abcabcbb") => 3
```

**How it works:**
- Sliding window with two pointers (left and right)
- Set tracks characters in current window
- Expand window by moving right pointer
- If duplicate found, shrink window from left until duplicate removed
- Track maximum window size seen

### 9. 3Sum
**Problem:** Find all unique triplets that sum to zero.

```typescript
function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const result: number[][] = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}

// Time: O(n²), Space: O(1)
// Example: threeSum([-1,0,1,2,-1,-4]) => [[-1,-1,2],[-1,0,1]]
```

**How it works:**
- Sort array first to use two-pointer technique
- Fix one number, then find two others that sum to its negative
- Use two pointers for the remaining two numbers
- Skip duplicates to avoid duplicate triplets
- If sum too small, move left pointer right; if too large, move right pointer left

### 10. Container With Most Water
**Problem:** Find two lines that form container with most water.

```typescript
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

// Time: O(n), Space: O(1)
// Example: maxArea([1,8,6,2,5,4,8,3,7]) => 49
```

**How it works:**
- Two pointers start at ends (maximum width)
- Water volume = width × minimum height of two lines
- Move pointer with shorter height inward (might find taller line)
- Moving taller line inward only decreases width without potential height gain

### 11. Product of Array Except Self
**Problem:** Return array where each element is product of all other elements.

```typescript
function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const result = new Array(n).fill(1);
    
    // Left products
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Right products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
}

// Time: O(n), Space: O(1) excluding output
// Example: productExceptSelf([1,2,3,4]) => [24,12,8,6]
```

**How it works:**
- Two passes through array
- First pass: calculate product of all elements to the left
- Second pass: multiply by product of all elements to the right
- Avoids division (handles zeros correctly)
- Uses result array to store left products, then modifies in-place

### 12. Search in Rotated Sorted Array
**Problem:** Search target in rotated sorted array.

```typescript
function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) return mid;
        
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

// Time: O(log n), Space: O(1)
// Example: search([4,5,6,7,0,1,2], 0) => 4
```

**How it works:**
- Modified binary search
- At least one half is always sorted in rotated array
- Identify which half is sorted by comparing with endpoints
- If target in sorted half's range, search there; otherwise search other half

### 13. Coin Change
**Problem:** Find minimum coins needed to make amount.

```typescript
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

// Time: O(amount × coins), Space: O(amount)
// Example: coinChange([1,2,5], 11) => 3
```

**How it works:**
- Dynamic programming: build up solutions for all amounts from 0 to target
- `dp[i]` = minimum coins needed for amount i
- For each amount, try using each coin
- If we use a coin, we need 1 + minimum coins for (amount - coin value)
- Take minimum across all coin choices

### 14. Number of Islands
**Problem:** Count number of islands in 2D grid.

```typescript
function numIslands(grid: string[][]): number {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;
    
    function dfs(r: number, c: number) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            return;
        }
        
        grid[r][c] = '0';
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                islands++;
                dfs(r, c);
            }
        }
    }
    
    return islands;
}

// Time: O(m × n), Space: O(m × n) for recursion
```

**How it works:**
- Iterate through grid
- When we find '1' (land), increment island count
- Use DFS to mark all connected land as visited (change to '0')
- DFS explores all 4 directions (up, down, left, right)
- Each DFS call group represents one island

### 15. Validate Binary Search Tree
**Problem:** Check if binary tree is valid BST.

```typescript
function isValidBST(root: TreeNode | null): boolean {
    function validate(node: TreeNode | null, min: number, max: number): boolean {
        if (!node) return true;
        
        if (node.val <= min || node.val >= max) return false;
        
        return validate(node.left, min, node.val) && 
               validate(node.right, node.val, max);
    }
    
    return validate(root, -Infinity, Infinity);
}

// Time: O(n), Space: O(n) for recursion
```

**How it works:**
- Recursively validate with min/max bounds
- Root can be any value (min = -∞, max = +∞)
- Left subtree: all values must be less than parent
- Right subtree: all values must be greater than parent
- Pass bounds down: left child's max becomes parent value, right child's min becomes parent value

## Hard Problems

### 16. Median of Two Sorted Arrays
**Problem:** Find median of two sorted arrays.

```typescript
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
        
        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === m ? Infinity : nums1[partitionX];
        
        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === n ? Infinity : nums2[partitionY];
        
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
    
    throw new Error("Input arrays are not sorted");
}

// Time: O(log min(m, n)), Space: O(1)
```

**How it works:**
- Binary search on smaller array to find partition point
- Partition divides combined arrays into equal halves
- Ensures max of left half ≤ min of right half
- Median is max(left) for odd total, average of max(left) and min(right) for even

### 17. Merge K Sorted Lists
**Problem:** Merge k sorted linked lists.

```typescript
function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
    if (lists.length === 0) return null;
    
    function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
        const dummy = new ListNode(0);
        let current = dummy;
        
        while (l1 && l2) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        current.next = l1 || l2;
        return dummy.next;
    }
    
    while (lists.length > 1) {
        const mergedLists: (ListNode | null)[] = [];
        
        for (let i = 0; i < lists.length; i += 2) {
            const l1 = lists[i];
            const l2 = i + 1 < lists.length ? lists[i + 1] : null;
            mergedLists.push(mergeTwoLists(l1, l2));
        }
        
        lists = mergedLists;
    }
    
    return lists[0];
}

// Time: O(N log k) where N is total nodes, k is number of lists
// Space: O(1)
```

**How it works:**
- Divide and conquer approach
- Merge lists in pairs repeatedly
- Each round halves the number of lists
- Like merge sort's merge step but for multiple lists

### 18. Trapping Rain Water
**Problem:** Calculate water trapped after rain.

```typescript
function trap(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}

// Time: O(n), Space: O(1)
// Example: trap([0,1,0,2,1,0,1,3,2,1,2,1]) => 6
```

**How it works:**
- Two pointers from both ends
- Track maximum height seen from each side
- Water at position = max height from that side - current height
- Move pointer with smaller height (guaranteed water level)

### 19. Word Ladder
**Problem:** Find shortest transformation sequence from beginWord to endWord.

```typescript
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue: [string, number][] = [[beginWord, 1]];
    const visited = new Set<string>([beginWord]);
    
    while (queue.length > 0) {
        const [word, level] = queue.shift()!;
        
        if (word === endWord) return level;
        
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) { // 'a' to 'z'
                const newChar = String.fromCharCode(c);
                if (newChar === word[i]) continue;
                
                const newWord = word.slice(0, i) + newChar + word.slice(i + 1);
                
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, level + 1]);
                }
            }
        }
    }
    
    return 0;
}

// Time: O(M² × N) where M is word length, N is total words
// Space: O(M × N)
```

**How it works:**
- BFS to find shortest path
- Each level represents one transformation
- Try changing each character to every letter
- Only explore valid words not yet visited

### 20. Serialize and Deserialize Binary Tree
**Problem:** Serialize tree to string and deserialize back.

```typescript
class Codec {
    serialize(root: TreeNode | null): string {
        const result: string[] = [];
        
        function preorder(node: TreeNode | null) {
            if (!node) {
                result.push('null');
                return;
            }
            result.push(node.val.toString());
            preorder(node.left);
            preorder(node.right);
        }
        
        preorder(root);
        return result.join(',');
    }
    
    deserialize(data: string): TreeNode | null {
        const values = data.split(',');
        let index = 0;
        
        function buildTree(): TreeNode | null {
            const val = values[index++];
            if (val === 'null') return null;
            
            const node = new TreeNode(parseInt(val));
            node.left = buildTree();
            node.right = buildTree();
            return node;
        }
        
        return buildTree();
    }
}

// Time: O(n), Space: O(n)
```

**How it works:**
- Serialize: Preorder traversal, use "null" for empty nodes
- Deserialize: Reconstruct following same preorder pattern
- Index tracks position in serialized string
- Recursively build left then right subtree

## Tips for Solving Problems

### 1. Understand the Problem
- Read carefully and ask clarifying questions
- Identify input/output format
- Consider edge cases

### 2. Think of Examples
- Start with simple examples
- Consider edge cases (empty, single element, duplicates)
- Validate understanding

### 3. Identify Pattern
- Two pointers? Sliding window? Tree traversal?
- Can sorting help?
- Is it a graph problem?

### 4. Start with Brute Force
- Get a working solution first
- Analyze time/space complexity
- Then optimize

### 5. Optimize
- Can you trade space for time?
- Can you reduce nested loops?
- Can you use better data structures?

### 6. Code
- Write clean, readable code
- Use meaningful variable names
- Add comments for complex logic

### 7. Test
- Test with examples
- Check edge cases
- Verify complexity analysis
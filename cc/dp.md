Here are 6 classic LeetCode dynamic programming problems in JavaScript! Each includes:

## Problems Covered:

1. **Climbing Stairs (#70)** - Easy
   - Classic intro DP problem, similar to Fibonacci
   - Pattern: Each state depends on previous 1-2 states

2. **House Robber (#198)** - Medium  
   - Decision-making DP: rob or skip each house
   - Pattern: Max of two choices at each step

3. **Coin Change (#322)** - Medium
   - Unbounded knapsack variant
   - Pattern: Try all coins for each amount

4. **Longest Increasing Subsequence (#300)** - Medium
   - Compare current element with all previous
   - Pattern: 2D iteration, O(n²) solution

5. **Maximum Subarray (#53)** - Medium
   - Kadane's Algorithm
   - Pattern: Extend or restart at each position

6. **Unique Paths (#62)** - Medium
   - 2D grid DP
   - Pattern: Sum of paths from adjacent cells

## Common DP Patterns:

- **State definition**: What does `dp[i]` represent?
- **Base cases**: Initialize smallest subproblems
- **Transition**: How to compute `dp[i]` from previous states
- **Answer**: Usually `dp[n]` or `max(dp)`

Each problem includes both standard and space-optimized versions where applicable!

Here are 5 more classic LeetCode DP problems! These cover more advanced patterns:

## New Problems:

**7. Longest Common Subsequence (#1143)** - Medium
- Classic 2D DP problem
- Pattern: Compare characters, either match or skip one

**8. Edit Distance (#72)** - Medium
- Famous algorithm (Levenshtein distance)
- Pattern: 2D DP with 3 operations (insert/delete/replace)

**9. Word Break (#139)** - Medium
- String segmentation problem
- Pattern: Check all possible splits at each position

**10. Partition Equal Subset Sum (#416)** - Medium
- 0/1 Knapsack variant
- Pattern: Subset sum with backwards iteration

**11. Decode Ways (#91)** - Medium
- String decoding with constraints
- Pattern: Similar to climbing stairs but with validation

## Key DP Patterns in These Problems:

- **2D DP**: LCS and Edit Distance (comparing two sequences)
- **Subset/Knapsack**: Partition Equal Subset Sum
- **String segmentation**: Word Break
- **Constrained counting**: Decode Ways

These problems are frequently asked in interviews and demonstrate important DP techniques like 2D tables, subset problems, and string manipulation!
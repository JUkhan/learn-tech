// ============================================================================
// 1. CLIMBING STAIRS (LeetCode #70) - Easy
// ============================================================================
// Problem: Count ways to climb n stairs, taking 1 or 2 steps at a time

const climbStairs = (n) => {
  // Base cases
  if (n <= 2) return n;

  // dp[i] = number of ways to reach step i
  const dp = new Array(n + 1);
  dp[1] = 1; // 1 way to reach step 1
  dp[2] = 2; // 2 ways to reach step 2 (1+1 or 2)

  // Build up from step 3 to n
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};

// Space optimized version
const climbStairsOptimized = (n) => {
  if (n <= 2) return n;

  let prev2 = 1,
    prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
};

// ============================================================================
// 2. HOUSE ROBBER (LeetCode #198) - Medium
// ============================================================================
// Problem: Rob houses to maximize money, can't rob adjacent houses

const rob = (nums) => {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  // dp[i] = max money robbing up to house i
  const dp = new Array(nums.length);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    // Either rob current house + dp[i-2], or skip it and take dp[i-1]
    dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
  }

  return dp[nums.length - 1];
};

// Space optimized
const robOptimized = (nums) => {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    const current = Math.max(nums[i] + prev2, prev1);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
};

// ============================================================================
// 3. COIN CHANGE (LeetCode #322) - Medium
// ============================================================================
// Problem: Find minimum coins needed to make amount

const coinChange = (coins, amount) => {
  // dp[i] = minimum coins needed to make amount i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 0 coins needed for amount 0

  // For each amount from 1 to target
  for (let i = 1; i <= amount; i++) {
    // Try each coin
    for (const coin of coins) {
      if (coin <= i) {
        // Take coin and add 1 to the solution for (i - coin)
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
};

// ============================================================================
// 4. LONGEST INCREASING SUBSEQUENCE (LeetCode #300) - Medium
// ============================================================================
// Problem: Find length of longest strictly increasing subsequence

const lengthOfLIS = (nums) => {
  if (nums.length === 0) return 0;

  // dp[i] = length of LIS ending at index i
  const dp = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
};

// ============================================================================
// 5. MAXIMUM SUBARRAY (LeetCode #53) - Medium (Kadane's Algorithm)
// ============================================================================
// Problem: Find contiguous subarray with largest sum

const maxSubArray = (nums) => {
  // dp[i] = maximum sum ending at index i
  const dp = new Array(nums.length);
  dp[0] = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend previous subarray or start new one
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    maxSum = Math.max(maxSum, dp[i]);
  }

  return maxSum;
};

// Space optimized
const maxSubArrayOptimized = (nums) => {
  let currentMax = nums[0];
  let globalMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    globalMax = Math.max(globalMax, currentMax);
  }

  return globalMax;
};

// ============================================================================
// 6. UNIQUE PATHS (LeetCode #62) - Medium
// ============================================================================
// Problem: Count paths from top-left to bottom-right in m×n grid

const uniquePaths = (m, n) => {
  // dp[i][j] = number of ways to reach cell (i, j)
  const dp = Array.from({ length: m }, () => new Array(n).fill(1));

  // First row and column all have 1 way (already filled)

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // Can only come from top or left
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
};

// ============================================================================
// TEST CASES
// ============================================================================

console.log('1. CLIMBING STAIRS');
console.log('climbStairs(5) =', climbStairs(5)); // 8
console.log('');

console.log('2. HOUSE ROBBER');
console.log('rob([2,7,9,3,1]) =', rob([2, 7, 9, 3, 1])); // 12
console.log('');

console.log('3. COIN CHANGE');
console.log('coinChange([1,2,5], 11) =', coinChange([1, 2, 5], 11)); // 3
console.log('coinChange([2], 3) =', coinChange([2], 3)); // -1
console.log('');

console.log('4. LONGEST INCREASING SUBSEQUENCE');
console.log(
  'lengthOfLIS([10,9,2,5,3,7,101,18]) =',
  lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])
); // 4
console.log('');

console.log('5. MAXIMUM SUBARRAY');
console.log(
  'maxSubArray([-2,1,-3,4,-1,2,1,-5,4]) =',
  maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])
); // 6
console.log('');

console.log('6. UNIQUE PATHS');
console.log('uniquePaths(3, 7) =', uniquePaths(3, 7)); // 28

// ============================================================================
// 7. LONGEST COMMON SUBSEQUENCE (LeetCode #1143) - Medium
// ============================================================================
// Problem: Find length of longest subsequence common to both strings

const longestCommonSubsequence = (text1, text2) => {
  const m = text1.length;
  const n = text2.length;

  // dp[i][j] = LCS length of text1[0...i-1] and text2[0...j-1]
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // Characters match, extend LCS by 1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // Take max of excluding either character
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
};

// ============================================================================
// 8. EDIT DISTANCE (LeetCode #72) - Medium
// ============================================================================
// Problem: Min operations (insert, delete, replace) to convert word1 to word2

const minDistance = (word1, word2) => {
  const m = word1.length;
  const n = word2.length;

  // dp[i][j] = min operations to convert word1[0...i-1] to word2[0...j-1]
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // Base cases: converting empty string
  for (let i = 0; i <= m; i++) dp[i][0] = i; // delete all
  for (let j = 0; j <= n; j++) dp[0][j] = j; // insert all

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        // Characters match, no operation needed
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // Take min of: replace, delete, insert
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // replace
          dp[i - 1][j] + 1, // delete from word1
          dp[i][j - 1] + 1 // insert into word1
        );
      }
    }
  }

  return dp[m][n];
};

// ============================================================================
// 9. WORD BREAK (LeetCode #139) - Medium
// ============================================================================
// Problem: Check if string can be segmented into words from dictionary

const wordBreak = (s, wordDict) => {
  const wordSet = new Set(wordDict);
  const n = s.length;

  // dp[i] = true if s[0...i-1] can be segmented
  const dp = new Array(n + 1).fill(false);
  dp[0] = true; // empty string

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      // If s[0...j-1] can be segmented AND s[j...i-1] is a word
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break; // found one valid segmentation
      }
    }
  }

  return dp[n];
};

// ============================================================================
// 10. PARTITION EQUAL SUBSET SUM (LeetCode #416) - Medium
// ============================================================================
// Problem: Check if array can be partitioned into two equal sum subsets

const canPartition = (nums) => {
  const total = nums.reduce((a, b) => a + b, 0);

  // If odd sum, can't partition equally
  if (total % 2 !== 0) return false;

  const target = total / 2;

  // dp[i] = true if sum i is achievable
  const dp = new Array(target + 1).fill(false);
  dp[0] = true; // sum 0 is always achievable

  for (const num of nums) {
    // Traverse backwards to avoid using same element twice
    for (let i = target; i >= num; i--) {
      dp[i] = dp[i] || dp[i - num];
    }
  }

  return dp[target];
};

// ============================================================================
// 11. DECODE WAYS (LeetCode #91) - Medium
// ============================================================================
// Problem: Count ways to decode string where 'A'=1, 'B'=2, ..., 'Z'=26

const numDecodings = (s) => {
  if (s[0] === '0') return 0;

  const n = s.length;
  // dp[i] = number of ways to decode s[0...i-1]
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1; // empty string
  dp[1] = 1; // first character (already checked not '0')

  for (let i = 2; i <= n; i++) {
    const oneDigit = parseInt(s.substring(i - 1, i));
    const twoDigits = parseInt(s.substring(i - 2, i));

    // Single digit decode (1-9)
    if (oneDigit >= 1 && oneDigit <= 9) {
      dp[i] += dp[i - 1];
    }

    // Two digit decode (10-26)
    if (twoDigits >= 10 && twoDigits <= 26) {
      dp[i] += dp[i - 2];
    }
  }

  return dp[n];
};

// Space optimized
const numDecodingsOptimized = (s) => {
  if (s[0] === '0') return 0;

  let prev2 = 1; // dp[i-2]
  let prev1 = 1; // dp[i-1]

  for (let i = 2; i <= s.length; i++) {
    let current = 0;
    const oneDigit = parseInt(s.substring(i - 1, i));
    const twoDigits = parseInt(s.substring(i - 2, i));

    if (oneDigit >= 1 && oneDigit <= 9) {
      current += prev1;
    }

    if (twoDigits >= 10 && twoDigits <= 26) {
      current += prev2;
    }

    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
};

// ============================================================================
// TEST CASES
// ============================================================================

console.log('7. LONGEST COMMON SUBSEQUENCE');
console.log(
  "longestCommonSubsequence('abcde', 'ace') =",
  longestCommonSubsequence('abcde', 'ace')
); // 3 (ace)
console.log('');

console.log('8. EDIT DISTANCE');
console.log("minDistance('horse', 'ros') =", minDistance('horse', 'ros')); // 3
console.log('');

console.log('9. WORD BREAK');
console.log(
  "wordBreak('leetcode', ['leet','code']) =",
  wordBreak('leetcode', ['leet', 'code'])
); // true
console.log(
  "wordBreak('applepenapple', ['apple','pen']) =",
  wordBreak('applepenapple', ['apple', 'pen'])
); // true
console.log('');

console.log('10. PARTITION EQUAL SUBSET SUM');
console.log('canPartition([1,5,11,5]) =', canPartition([1, 5, 11, 5])); // true
console.log('canPartition([1,2,3,5]) =', canPartition([1, 2, 3, 5])); // false
console.log('');

console.log('11. DECODE WAYS');
console.log("numDecodings('12') =", numDecodings('12')); // 2
console.log("numDecodings('226') =", numDecodings('226')); // 3
console.log("numDecodings('06') =", numDecodings('06')); // 0

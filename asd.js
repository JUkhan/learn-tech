function cleanGisUrl(originalUrl) {
  try {
    const url = new URL(originalUrl);
    const params = new URLSearchParams(url.search);

    // Get the CQL filter and decode it for readability
    const cqlFilter = params.get('cql_filter');
    if (cqlFilter) {
      console.log('Decoded CQL Filter:', decodeURIComponent(cqlFilter));
    }

    return {
      cleanUrl: url.toString(),
      decodedParams: Object.fromEntries(params.entries()),
    };
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}

function template(str, data) {
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => data[key] || '');
}

const templateStr = 'Hello {{name}}, you have {{count}} messages.';
const result = template(templateStr, { name: 'Bob', count: 5 });
// "Hello Bob, you have 5 messages."
function calculate(options) {
  const res = options.reduce((acc, val) => {
    len = acc.length;
    if (val === '+') {
      acc.push(acc[len - 2] + acc[len - 1]);
    } else if (val === 'D') {
      acc.push(acc[len - 1] * 2);
    } else if (val === 'C') {
      acc.pop();
    } else {
      acc.push(Number(val));
    }
    return acc;
  }, []);
  return res.reduce((acc, val) => acc + val, 0);
}

function lengthOfLongestSubstring(s) {
  if (!s) return -1;
  const lookup = new Set();
  let left = 0,
    maxLength = -Infinity;
  for (let i = 0; i < s.length; i++) {
    while (lookup.has(s[i])) {
      lookup.delete(s[i]);
      left++;
    }
    lookup.add(s[i]);
    maxLength = Math.max(maxLength, i - left + 1);
  }
  return maxLength;
}
console.log(lengthOfLongestSubstring('abca')); // => 3

function search(nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.ceil((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      //left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      //right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}
console.log(search([4, 5, 6, 7, 0, 1, 2, 10, 11, 12, 13], 2));

function trap(arr) {
  if (arr.length < 3) return 0;
  let water = 0,
    stack = [];
  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
      const bottom = stack.pop();
      if (stack.length === 0) break;
      const left = stack[stack.length - 1];
      const width = i - left - 1;
      const minHeight = Math.min(arr[left], arr[i]) - arr[bottom];
      water += minHeight * width;
    }
    stack.push(i);
  }
  return water;
}

const arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(trap(arr));

function maxSlidingWindow(nums, k) {
  const result = [],
    deque = [];
  for (let i = 0; i < nums.length; i++) {
    // Remove smaller elements from back
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    deque.push(i);

    // Remove indices outside window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }

    // Add maximum to result when window is complete
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

const nums = [1, 3, -1, -3, 5, 3, 6, 7],
  k = 3;
console.log(maxSlidingWindow(nums, k));

//n*n
function sumOfSubArray(arr) {
  let sum = 0,
    min = Infinity;
  for (let i = 0; i < arr.length; i++) {
    min = arr[i];
    sum += arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      min = Math.min(min, arr[j]);
      sum += min;
    }
  }
  return sum;
}
function sumOfSubarray2(arr) {
  let sum = 0,
    stack = [],
    len = arr.length,
    den = 1e9 + 7;
  for (let i = 0; i < len; i++) {
    while (stack.length > 0 && arr[i] < stack[stack.length - 1][1]) {
      const [idx, val] = stack.pop();
      const left =
        stack.length > 0 ? idx - stack[stack.length - 1][0] : idx + 1;
      const right = i - idx;
      sum = (sum + val * left * right) % den;
    }
    stack.push([i, arr[i]]);
  }
  for (let i = 0; i < stack.length; i++) {
    const [idx, val] = stack[i];
    const left = i > 0 ? idx - stack[i - 1][0] : idx + 1;
    const right = len - idx;
    sum = (sum + val * left * right) % den;
  }
  return sum;
}
//console.log('res:', sumOfSubArray([3, 1, 2, 4]));
console.log('res:', sumOfSubarray2([3, 1, 2, 4]));
function minimumSizeSubArrAySum(nums, target) {
  let minLength = Infinity,
    left = 0,
    sum = 0;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return minLength;
}
console.log(minimumSizeSubArrAySum([2, 3, 1, 2, 4, 3], 7));

function coinChange(coins, amount) {
  let result = [],
    min = Infinity;
  function backtrack(remain, start, coinCount) {
    if (remain === 0) {
      //result.push(comb.slice(', '));
      min = Math.min(min, coinCount);
      return;
    }
    if (remain < 0) return;
    for (let idx = start; idx < coins.length; idx++) {
      //comb.push(coins[idx]);
      backtrack(remain - coins[idx], start, coinCount + 1);
      //comb.pop();
    }
  }
  backtrack(amount, 0, 0);
  return min;
}

console.log(coinChange([1, 2, 5], 11)); //3

function maxSubArray(nums) {
  if (nums.length === 0) return 0;
  let maxSum = nums[0],
    sum = nums[0],
    l = 0;
  for (let r = 1; r < nums.length; r++) {
    if (sum + nums[r] > 0) {
      sum += nums[r];
      maxSum = Math.max(maxSum, sum);
    } else {
      maxSum = Math.max(maxSum, nums[r]);
      sum = nums[r];
      l++;
    }
  }
  return maxSum;
}

//Output: 6
//Explanation: The subarray [4,-1,2,1] has the largest sum 6.
console.log(maxSubArray([-1, 1, 2, 1]));

// var url = `https://gis.lged.gov.bd:8004/api/GeoServerCaching?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=hq&STYLES=hq&cql_filter=(type%20IN%20(30%2C40%2C50))%20AND%20(upazila_id%20in%20(36101%2C36102%2C36103%2C36104%2C36105%2C36106))&time_=1759932940286&env=showlabel_hq%3Atrue&CRS=EPSG%3A800001&WIDTH=616&HEIGHT=830&BBOX=2720439.000073681%2C605463.4124369397%2C2814503.9999263226%2C732206.8375630641`;
// url = `http://localhost:8111/api/GeoServerCaching?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=hq&STYLES=hq&CRS=EPSG%3A800001&time_=1759935391661&cql_filter=%28type+IN+%2830%2C40%2C50%29%29+AND+%28upazila_id+in+%2836101%2C36102%2C36103%2C36104%2C36105%2C36106%29%29&env=showlabel_hq%3Atrue&WIDTH=256&HEIGHT=256&BBOX=2736436.359349575%2C664563.1158420406%2C2775528.307340283%2C703655.0638327489`;
// console.log(cleanGisUrl(url));
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
  console.log('====================================');
  console.log(dp);
  console.log('====================================');
  return dp[m - 1][n - 1];
};

console.log(uniquePaths(3, 7)); // Output: 28

function largestRectangleArea(heights) {
  let maxArea = 0,
    stack = [];
  heights.push(0); // Sentinel to pop all at the end
  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // Output: 10

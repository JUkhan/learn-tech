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

var url = `https://gis.lged.gov.bd:8004/api/GeoServerCaching?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=hq&STYLES=hq&cql_filter=(type%20IN%20(30%2C40%2C50))%20AND%20(upazila_id%20in%20(36101%2C36102%2C36103%2C36104%2C36105%2C36106))&time_=1759932940286&env=showlabel_hq%3Atrue&CRS=EPSG%3A800001&WIDTH=616&HEIGHT=830&BBOX=2720439.000073681%2C605463.4124369397%2C2814503.9999263226%2C732206.8375630641`;
url = `http://localhost:8111/api/GeoServerCaching?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&FORMAT=image%2Fpng&STYLES=&TRANSPARENT=true&LAYERS=lged%3Alged_road_paved_density&WIDTH=320&HEIGHT=320&BBOX=10018754.17139462%2C2504688.542848654%2C10331840.239250703%2C2817774.610704736&CRS=EPSG%3A3857&FORMAT_OPTIONS=dpi%3A113`;
console.log(cleanGisUrl(url));
url = `http://localhost:8111/api/GeoServerCaching?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=lged%3Aup_boundary&STYLES=proposedprojectboundary&env=fillColor%3A89b5f0&cql_filter=thanaid%20in%20(%2748001%27%2C%2748002%27%2C%2748003%27%2C%2748004%27%2C%2748005%27%2C%2748006%27%2C%2748007%27%2C%2748008%27%2C%2748009%27%2C%2748010%27%2C%2748011%27%2C%2748012%27%2C%2748013%27%2C%2748014%27%2C%2748015%27%2C%2748016%27%2C%2748017%27%2C%2748101%27%2C%2748102%27%2C%2748103%27%2C%2748104%27%2C%2748105%27%2C%2748106%27%2C%2748107%27%2C%2748108%27%2C%2748109%27%2C%2748201%27%2C%2748202%27%2C%2748203%27%2C%2748204%27%2C%2748205%27%2C%2748206%27%2C%2748207%27%2C%2748208%27%2C%2748401%27%2C%2748402%27%2C%2748403%27%2C%2748404%27%2C%2748405%27%2C%2748406%27%2C%2748407%27%2C%2748408%27%2C%2748409%27%2C%2748501%27%2C%2748502%27%2C%2748503%27%2C%2748504%27%2C%2748505%27%2C%2748601%27%2C%2748602%27%2C%2748603%27%2C%2748604%27%2C%2748605%27%2C%2748606%27%2C%2748801%27%2C%2748802%27%2C%2748803%27%2C%2748804%27%2C%2748805%27%2C%2748806%27%2C%2748807%27%2C%2748808%27%2C%2748809%27%2C%2748810%27%2C%2748811%27%2C%2748812%27%2C%2748813%27%2C%2748814%27%2C%2748815%27%2C%2749001%27%2C%2749002%27%2C%2749003%27%2C%2749004%27%2C%2749005%27%2C%2749006%27%2C%2749007%27%2C%2749008%27%2C%2749201%27%2C%2749202%27%2C%2749203%27%2C%2749204%27%2C%2749205%27%2C%2749206%27%2C%2749207%27%2C%2749208%27%2C%2749209%27%2C%2749210%27%2C%2749501%27%2C%2749502%27%2C%2749503%27%2C%2749504%27%2C%2749505%27%2C%2749506%27%2C%2749507%27%2C%2749508%27%2C%2749509%27%2C%2749701%27%2C%2749702%27%2C%2749703%27%2C%2749704%27%2C%2749705%27%2C%2749706%27%2C%2749707%27%2C%2754001%27%2C%2754002%27%2C%2754003%27%2C%2754004%27%2C%2754005%27%2C%2754006%27%2C%2754007%27%2C%2754008%27%2C%2754009%27%2C%2754010%27%2C%2754101%27%2C%2754102%27%2C%2754103%27%2C%2754104%27%2C%2754201%27%2C%2754202%27%2C%2754203%27%2C%2754204%27%2C%2754205%27%2C%2754206%27%2C%2754207%27%2C%2754301%27%2C%2754302%27%2C%2754303%27%2C%2754304%27%2C%2754305%27%2C%2754306%27%2C%2754307%27%2C%2754601%27%2C%2754602%27%2C%2754603%27%2C%2754604%27%2C%2754605%27%2C%2754606%27%2C%2754607%27%2C%2754608%27%2C%2754701%27%2C%2754702%27%2C%2754703%27%2C%2754704%27%2C%2754705%27%2C%2754706%27)&t=721&WIDTH=256&HEIGHT=256&CRS=EPSG%3A800001&BBOX=5003769.342810653%2C-5003769.342810653%2C10007538.685621306%2C0`;
console.log(cleanGisUrl(url));
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
  heights.push(0); // Append a sentinel value to pop all remaining bars
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

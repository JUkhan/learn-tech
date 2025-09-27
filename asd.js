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

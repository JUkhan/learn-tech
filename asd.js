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

class ListNode {
  constructor(value = 0, next = null) {
    this.value = value;
    this.next = next;
  }
}

function printList(head) {
  let current = head;
  const values = [];
  while (current) {
    values.push(current.value);
    current = current.next;
  }
  console.log(values.join(' -> '));
}

function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    let nextTemp = current.next;
    //current.next = prev;
    //prev = current;
    [current.next, prev, current] = [prev, current, nextTemp];
    //current = nextTemp;
  }
  return prev;
}

function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  while (l1 && l2) {
    if (l1.value <= l2.value) {
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

const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
node1.next = node2;
node2.next = node3;

printList(node1); // Output: 1 -> 2 -> 3
let reversedHead = reverseList(node1);
printList(reversedHead); // Output: 3 -> 2 -> 1
reversedHead.next.next = node2; // Create a cycle for testing
console.log('Has Cycle:', hasCycle(reversedHead)); // Output: Has Cycle: true

function digitSum(n) {
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }

  return sum;
}
console.log(digitSum(12345)); // Output: 15

function mergeIntervals(intervals) {
  if ([0, 1].includes(intervals.length)) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];
    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }
  return merged;
}

const intervals = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];
console.log(mergeIntervals(intervals)); // Output: [[1,6],[8,10],[15,18]]

# Data Structures & Algorithms Reference

## Arrays

### Common Operations
```typescript
// Initialize
const arr: number[] = [1, 2, 3, 4, 5];

// Access - O(1)
const element = arr[0];

// Search - O(n)
const index = arr.indexOf(3);
const found = arr.find(x => x > 3);

// Insert/Delete at end - O(1)
arr.push(6);
arr.pop();

// Insert/Delete at beginning - O(n)
arr.unshift(0);
arr.shift();

// Slice (creates new array) - O(n)
const subArray = arr.slice(1, 3);

// Common array methods
arr.map(x => x * 2);
arr.filter(x => x > 2);
arr.reduce((sum, x) => sum + x, 0);
arr.sort((a, b) => a - b);
```

### Two Pointers Pattern
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

// Two pointers from both ends
function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    
    return true;
}

// Sliding window
function maxSubArraySum(arr: number[], k: number): number {
    let maxSum = 0;
    let windowSum = 0;
    
    // First window
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

## Strings

### Common Operations
```typescript
const str = "hello world";

// Access - O(1)
const char = str[0];
const charCode = str.charCodeAt(0);

// Search - O(n)
const index = str.indexOf("world");
const includes = str.includes("world");

// Manipulation (creates new string)
const upper = str.toUpperCase();
const replaced = str.replace("world", "there");
const substr = str.substring(0, 5);
const parts = str.split(" ");

// Check patterns
const isAlphanumeric = (c: string) => /[a-zA-Z0-9]/.test(c);
const isLetter = (c: string) => /[a-zA-Z]/.test(c);
const isDigit = (c: string) => /[0-9]/.test(c);
```

### String Manipulation
```typescript
// Reverse string
function reverseString(s: string): string {
    return s.split('').reverse().join('');
}

// Check anagram
function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    
    const count = new Map<string, number>();
    
    for (const char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }
    
    for (const char of t) {
        const cnt = count.get(char) || 0;
        if (cnt === 0) return false;
        count.set(char, cnt - 1);
    }
    
    return true;
}

// Longest substring without repeating characters
function lengthOfLongestSubstring(s: string): number {
    const seen = new Set<string>();
    let maxLength = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
```

## Hash Maps / Sets

### HashMap (Map in JavaScript/TypeScript)
```typescript
const map = new Map<string, number>();

// Operations - O(1) average
map.set("key", 1);
map.get("key");
map.has("key");
map.delete("key");
map.clear();
map.size;

// Iteration
for (const [key, value] of map) {
    console.log(key, value);
}

// Frequency counter pattern
function frequencyCounter(arr: number[]): Map<number, number> {
    const freq = new Map<number, number>();
    for (const num of arr) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    return freq;
}
```

### HashSet (Set in JavaScript/TypeScript)
```typescript
const set = new Set<number>();

// Operations - O(1) average
set.add(1);
set.has(1);
set.delete(1);
set.clear();
set.size;

// Find duplicates
function hasDuplicates(arr: number[]): boolean {
    const seen = new Set<number>();
    for (const num of arr) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
}
```

## Linked Lists

### Implementation
```typescript
class ListNode {
    val: number;
    next: ListNode | null = null;
    
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

// Common operations
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let current = head;
    
    while (current !== null) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}

```
This is a clean implementation of reversing a singly linked list! Let me break down how it works:

**Algorithm Overview:**
The function uses the iterative three-pointer approach to reverse the links between nodes.

**Step-by-step execution:**
1. Initialize `prev` to `null` (will become the new tail)
2. Set `current` to the head of the original list
3. For each node:
   - Store the next node before we lose the reference
   - Reverse the current node's pointer to point to the previous node
   - Move `prev` and `current` one step forward
4. Return `prev` (which becomes the new head)

**Example walkthrough:**
```
Original: 1 -> 2 -> 3 -> null

Step 1: prev=null, current=1, next=2
        null <- 1    2 -> 3 -> null

Step 2: prev=1, current=2, next=3  
        null <- 1 <- 2    3 -> null

Step 3: prev=2, current=3, next=null
        null <- 1 <- 2 <- 3    null

Result: 3 -> 2 -> 1 -> null
```

**Time/Space Complexity:**
- Time: O(n) - visits each node once
- Space: O(1) - only uses a constant amount of extra space

The implementation handles edge cases well (empty list or single node) and is very efficient. This is the standard iterative approach that's preferred over recursion for this problem since it avoids potential stack overflow issues with very long lists.

```typescript

// Detect cycle (Floyd's algorithm)
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

// Find middle
function findMiddle(head: ListNode | null): ListNode | null {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    return slow;
}

// Merge two sorted lists
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
```

## Stacks

### Implementation
```typescript
class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    size(): number {
        return this.items.length;
    }
}

// Valid parentheses
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

// Min stack
class MinStack {
    private stack: number[] = [];
    private minStack: number[] = [];
    
    push(val: number): void {
        this.stack.push(val);
        const min = this.minStack.length === 0 
            ? val 
            : Math.min(val, this.getMin());
        this.minStack.push(min);
    }
    
    pop(): void {
        this.stack.pop();
        this.minStack.pop();
    }
    
    top(): number {
        return this.stack[this.stack.length - 1];
    }
    
    getMin(): number {
        return this.minStack[this.minStack.length - 1];
    }
}
```

## Queues

### Implementation
```typescript
class Queue<T> {
    private items: T[] = [];
    
    enqueue(item: T): void {
        this.items.push(item);
    }
    
    dequeue(): T | undefined {
        return this.items.shift();
    }
    
    front(): T | undefined {
        return this.items[0];
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    size(): number {
        return this.items.length;
    }
}

// Implement queue using stacks
class MyQueue {
    private stack1: number[] = [];
    private stack2: number[] = [];
    
    push(x: number): void {
        this.stack1.push(x);
    }
    
    pop(): number {
        this.peek();
        return this.stack2.pop()!;
    }
    
    peek(): number {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop()!);
            }
        }
        return this.stack2[this.stack2.length - 1];
    }
    
    empty(): boolean {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}
```

## Trees

### Binary Tree
```typescript
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

// Traversals
function inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    
    function inorder(node: TreeNode | null) {
        if (!node) return;
        inorder(node.left);
        result.push(node.val);
        inorder(node.right);
    }
    
    inorder(root);
    return result;
}

function preorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    
    function preorder(node: TreeNode | null) {
        if (!node) return;
        result.push(node.val);
        preorder(node.left);
        preorder(node.right);
    }
    
    preorder(root);
    return result;
}

function postorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    
    function postorder(node: TreeNode | null) {
        if (!node) return;
        postorder(node.left);
        postorder(node.right);
        result.push(node.val);
    }
    
    postorder(root);
    return result;
}

// Level order traversal (BFS)
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

// Maximum depth
function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// Is balanced
function isBalanced(root: TreeNode | null): boolean {
    function checkHeight(node: TreeNode | null): number {
        if (!node) return 0;
        
        const leftHeight = checkHeight(node.left);
        if (leftHeight === -1) return -1;
        
        const rightHeight = checkHeight(node.right);
        if (rightHeight === -1) return -1;
        
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
        
        return Math.max(leftHeight, rightHeight) + 1;
    }
    
    return checkHeight(root) !== -1;
}

// Lowest common ancestor
function lowestCommonAncestor(
    root: TreeNode | null, 
    p: TreeNode, 
    q: TreeNode
): TreeNode | null {
    if (!root || root === p || root === q) return root;
    
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    if (left && right) return root;
    return left || right;
}
```

### Binary Search Tree
```typescript
// Validate BST
function isValidBST(root: TreeNode | null): boolean {
    function validate(
        node: TreeNode | null, 
        min: number, 
        max: number
    ): boolean {
        if (!node) return true;
        
        if (node.val <= min || node.val >= max) return false;
        
        return validate(node.left, min, node.val) && 
               validate(node.right, node.val, max);
    }
    
    return validate(root, -Infinity, Infinity);
}

// Insert into BST
function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
    if (!root) return new TreeNode(val);
    
    if (val < root.val) {
        root.left = insertIntoBST(root.left, val);
    } else {
        root.right = insertIntoBST(root.right, val);
    }
    
    return root;
}

// Search in BST
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    if (!root || root.val === val) return root;
    
    if (val < root.val) {
        return searchBST(root.left, val);
    } else {
        return searchBST(root.right, val);
    }
}
```

## Graphs

### Representations
```typescript
// Adjacency list
type Graph = Map<number, number[]>;

const graph: Graph = new Map([
    [0, [1, 2]],
    [1, [0, 3]],
    [2, [0, 3]],
    [3, [1, 2]]
]);

// Adjacency matrix
const matrix: number[][] = [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
];
```

### DFS (Depth-First Search)
```typescript
function dfs(graph: Graph, start: number): number[] {
    const visited = new Set<number>();
    const result: number[] = [];
    
    function dfsHelper(node: number) {
        visited.add(node);
        result.push(node);
        
        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                dfsHelper(neighbor);
            }
        }
    }
    
    dfsHelper(start);
    return result;
}

// Iterative DFS
function dfsIterative(graph: Graph, start: number): number[] {
    const visited = new Set<number>();
    const stack = [start];
    const result: number[] = [];
    
    while (stack.length > 0) {
        const node = stack.pop()!;
        
        if (visited.has(node)) continue;
        
        visited.add(node);
        result.push(node);
        
        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }
        }
    }
    
    return result;
}
```

### BFS (Breadth-First Search)
```typescript
function bfs(graph: Graph, start: number): number[] {
    const visited = new Set<number>();
    const queue = [start];
    const result: number[] = [];
    
    visited.add(start);
    
    while (queue.length > 0) {
        const node = queue.shift()!;
        result.push(node);
        
        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}

// Shortest path (unweighted)
function shortestPath(graph: Graph, start: number, end: number): number {
    const visited = new Set<number>();
    const queue: [number, number][] = [[start, 0]];
    
    visited.add(start);
    
    while (queue.length > 0) {
        const [node, distance] = queue.shift()!;
        
        if (node === end) return distance;
        
        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, distance + 1]);
            }
        }
    }
    
    return -1; // Path not found
}
```

### Common Graph Problems
```typescript
// Number of islands
function numIslands(grid: string[][]): number {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;
    
    function dfs(r: number, c: number) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            return;
        }
        
        grid[r][c] = '0'; // Mark as visited
        
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

// Clone graph
class GraphNode {
    val: number;
    neighbors: GraphNode[];
    
    constructor(val?: number, neighbors?: GraphNode[]) {
        this.val = val === undefined ? 0 : val;
        this.neighbors = neighbors === undefined ? [] : neighbors;
    }
}

function cloneGraph(node: GraphNode | null): GraphNode | null {
    if (!node) return null;
    
    const visited = new Map<GraphNode, GraphNode>();
    
    function dfs(node: GraphNode): GraphNode {
        if (visited.has(node)) {
            return visited.get(node)!;
        }
        
        const clone = new GraphNode(node.val);
        visited.set(node, clone);
        
        for (const neighbor of node.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }
        
        return clone;
    }
    
    return dfs(node);
}
```

## Heaps / Priority Queues

### Min Heap Implementation
```typescript
class MinHeap {
    private heap: number[] = [];
    
    private parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }
    
    private left(i: number): number {
        return 2 * i + 1;
    }
    
    private right(i: number): number {
        return 2 * i + 2;
    }
    
    private swap(i: number, j: number) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    
    push(val: number): void {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    private bubbleUp(i: number) {
        while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }
    
    pop(): number | undefined {
        if (this.heap.length === 0) return undefined;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown(0);
        return min;
    }
    
    private bubbleDown(i: number) {
        while (true) {
            let smallest = i;
            const l = this.left(i);
            const r = this.right(i);
            
            if (l < this.heap.length && this.heap[l] < this.heap[smallest]) {
                smallest = l;
            }
            if (r < this.heap.length && this.heap[r] < this.heap[smallest]) {
                smallest = r;
            }
            
            if (smallest === i) break;
            
            this.swap(i, smallest);
            i = smallest;
        }
    }
    
    peek(): number | undefined {
        return this.heap[0];
    }
    
    size(): number {
        return this.heap.length;
    }
}

// K largest elements
function findKthLargest(nums: number[], k: number): number {
    const minHeap = new MinHeap();
    
    for (const num of nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    
    return minHeap.peek()!;
}
```

## Trie (Prefix Tree)

```typescript
class TrieNode {
    children: Map<string, TrieNode> = new Map();
    isEndOfWord: boolean = false;
}

class Trie {
    private root = new TrieNode();
    
    insert(word: string): void {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;
        }
        node.isEndOfWord = true;
    }
    
    search(word: string): boolean {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char)!;
        }
        return node.isEndOfWord;
    }
    
    startsWith(prefix: string): boolean {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char)!;
        }
        return true;
    }
}
```
# JavaScript Quiz Preparation Guide

## 1. Core JavaScript Concepts

### Variables & Data Types
```javascript
// Variable declarations
let changeable = "can be reassigned";
const constant = "cannot be reassigned";
var oldWay = "function-scoped (avoid)";

// Primitive types
let str = "string";
let num = 42;
let bool = true;
let undef = undefined;
let nul = null;
let sym = Symbol("id");
let bigInt = 9007199254740991n;

// Type checking
typeof "text" // "string"
typeof 42 // "number"
typeof true // "boolean"
typeof undefined // "undefined"
typeof null // "object" (famous quirk!)
typeof {} // "object"
typeof [] // "object"
Array.isArray([]) // true (proper array check)
```

### Arrays
```javascript
// Array methods (memorize these!)
const arr = [1, 2, 3, 4, 5];

arr.map(x => x * 2)        // [2, 4, 6, 8, 10] - transform each
arr.filter(x => x > 2)     // [3, 4, 5] - keep matching
arr.reduce((acc, x) => acc + x, 0) // 15 - accumulate
arr.find(x => x > 3)       // 4 - first match
arr.findIndex(x => x > 3)  // 3 - index of first match
arr.some(x => x > 4)       // true - at least one matches
arr.every(x => x > 0)      // true - all match
arr.includes(3)            // true - contains value
arr.indexOf(3)             // 2 - index of value
arr.slice(1, 3)            // [2, 3] - extract portion (immutable)
arr.splice(1, 2)           // [2, 3] - remove/modify (mutates!)

// Spread operator
const arr2 = [...arr, 6, 7]; // [1, 2, 3, 4, 5, 6, 7]
const [first, ...rest] = arr; // first=1, rest=[2,3,4,5]
```

### Objects
```javascript
// Object manipulation
const obj = { a: 1, b: 2 };

// Accessing properties
obj.a         // 1 - dot notation
obj['a']      // 1 - bracket notation
obj?.c?.d     // undefined - optional chaining

// Destructuring
const { a, b } = obj;        // a=1, b=2
const { a: renamed } = obj;  // renamed=1

// Spread
const obj2 = { ...obj, c: 3 }; // { a: 1, b: 2, c: 3 }

// Object methods
Object.keys(obj)    // ['a', 'b']
Object.values(obj)  // [1, 2]
Object.entries(obj) // [['a', 1], ['b', 2]]
Object.assign({}, obj, {c: 3}) // merge objects
```

### Functions
```javascript
// Function declarations
function regular(a, b) { return a + b; }

// Arrow functions
const arrow = (a, b) => a + b;
const implicit = x => x * 2;  // implicit return
const explicit = x => { return x * 2; }; // explicit return

// Default parameters
const greet = (name = "World") => `Hello ${name}`;

// Rest parameters
const sum = (...args) => args.reduce((a, b) => a + b, 0);

// Higher-order functions
const multiply = (x) => (y) => x * y;
const double = multiply(2);
double(5); // 10
```

## 2. Advanced Concepts

### Closures
```javascript
function outer(x) {
  return function inner(y) {
    return x + y; // inner has access to x
  };
}
const add5 = outer(5);
add5(3); // 8
```

### this Keyword
```javascript
// Regular function: 'this' depends on how it's called
const obj = {
  value: 42,
  getValue: function() { return this.value; }
};
obj.getValue(); // 42

// Arrow function: 'this' is lexically bound
const obj2 = {
  value: 42,
  getValue: () => this.value // 'this' from surrounding scope
};

// Binding methods
func.call(thisArg, arg1, arg2);   // call with this
func.apply(thisArg, [arg1, arg2]); // call with array
const bound = func.bind(thisArg);  // create bound function
```

### Promises & Async/Await
```javascript
// Promise creation
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 1000);
});

// Promise chaining
promise
  .then(result => result + "!")
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("cleanup"));

// Async/Await
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Promise methods
Promise.all([p1, p2, p3])     // all must succeed
Promise.race([p1, p2, p3])    // first to settle
Promise.allSettled([p1, p2])  // wait for all to settle
```

### Prototypes & Classes
```javascript
// ES6 Classes
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
  
  static info() {
    return "Animals are living creatures";
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    return `${this.name} barks`;
  }
}

const dog = new Dog("Max", "Golden");
dog.speak(); // "Max barks"
Dog.info(); // Static method
```

## 3. Common Gotchas & Tricks

### Type Coercion
```javascript
// Equality
1 == "1"   // true (loose equality, coercion)
1 === "1"  // false (strict equality, no coercion)

// Truthy/Falsy values
// Falsy: false, 0, "", null, undefined, NaN
// Everything else is truthy

// Common coercions
+"42"      // 42 (string to number)
!!value    // converts to boolean
"" + 42    // "42" (number to string)
```

### Hoisting
```javascript
// Variables declared with var are hoisted
console.log(x); // undefined (not error!)
var x = 5;

// Functions are fully hoisted
sayHi(); // works!
function sayHi() { console.log("Hi"); }

// let/const are in "temporal dead zone"
console.log(y); // ReferenceError
let y = 5;
```

### Event Loop
```javascript
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
// Output: 1, 4, 3, 2
// Sync first, then microtasks (promises), then macrotasks (setTimeout)
```

## 4. Modern JavaScript Features

### Destructuring
```javascript
// Array destructuring
const [a, b, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring with renaming and defaults
const { name: userName = "Anonymous", age } = user;

// Nested destructuring
const { address: { city } } = user;
```

### Template Literals
```javascript
const name = "Alice";
const greeting = `Hello, ${name}!
This is line 2.`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => 
    acc + str + (values[i] ? `<mark>${values[i]}</mark>` : ''), '');
}
const result = highlight`Hello ${name}!`;
```

### Optional Chaining & Nullish Coalescing
```javascript
// Optional chaining
const city = user?.address?.city; // undefined if any part is null/undefined

// Nullish coalescing
const value = input ?? defaultValue; // only if null/undefined (not 0 or "")
```

## 5. Quick Memory Tricks

### Array Method Returns
- **Mutate original**: push, pop, shift, unshift, splice, reverse, sort
- **Return new array**: map, filter, slice, concat, spread
- **Return single value**: reduce, find, some, every, includes

### Falsy Values (memorize!)
```javascript
false, 0, -0, 0n, "", null, undefined, NaN
```

### Order of Operations
1. Synchronous code
2. Microtasks (Promises, queueMicrotask)
3. Macrotasks (setTimeout, setInterval)

### Common Interview Patterns
```javascript
// Remove duplicates from array
const unique = [...new Set(array)];

// Flatten array
const flat = arr.flat(Infinity);

// Deep clone object (simple version)
const clone = JSON.parse(JSON.stringify(obj));

// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Check if object is empty
Object.keys(obj).length === 0

// Group array by property
const grouped = arr.reduce((acc, item) => {
  (acc[item.category] = acc[item.category] || []).push(item);
  return acc;
}, {});
```

## Last-Minute Checklist
- [ ] Know the difference between var/let/const
- [ ] Understand == vs ===
- [ ] Remember array methods (map, filter, reduce)
- [ ] Know 'this' binding rules
- [ ] Understand closures
- [ ] Promise vs async/await syntax
- [ ] Falsy values list
- [ ] Spread operator uses
- [ ] Arrow function differences
- [ ] Event loop order
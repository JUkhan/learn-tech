// JavaScript Practice Questions for Turing Quiz

// Question 1: What will be the output?
console.log("Q1:");
console.log(typeof typeof 1);
// Answer: "string" (typeof 1 is "number", typeof "number" is "string")

// Question 2: What will be logged?
console.log("\nQ2:");
const arr = [1, 2, 3];
arr[10] = 11;
console.log(arr.length);
// Answer: 11 (sparse array, length is highest index + 1)

// Question 3: What's the output?
console.log("\nQ3:");
let a = 3;
let b = new Number(3);
let c = 3;
console.log(a == b);
console.log(a === b);
console.log(b === c);
// Answer: true, false, false (b is an object, not primitive)

// Question 4: What will this return?
console.log("\nQ4:");
function foo() {
  return {
    bar: "hello"
  };
}
console.log(foo());

function foo2() {
  return
  {
    bar: "hello"
  };
}
console.log(foo2());
// Answer: {bar: "hello"}, undefined (automatic semicolon insertion!)

// Question 5: Closure question
console.log("\nQ5:");
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log("var:", i);
  }, 100);
}
// Answer: 3, 3, 3 (var is function-scoped)

for (let j = 0; j < 3; j++) {
  setTimeout(function() {
    console.log("let:", j);
  }, 200);
}
// Answer: 0, 1, 2 (let is block-scoped)

// Question 6: Array methods
console.log("\nQ6:");
const numbers = [1, 2, 3, 4, 5];
const result = numbers
  .filter(n => n > 2)
  .map(n => n * 2)
  .reduce((acc, n) => acc + n, 0);
console.log(result);
// Answer: 24 (filters to [3,4,5], maps to [6,8,10], sums to 24)

// Question 7: Object property access
console.log("\nQ7:");
const obj = {
  '1': 'a',
  1: 'b',
  [1]: 'c'
};
console.log(obj['1']);
console.log(obj[1]);
console.log(Object.keys(obj).length);
// Answer: 'c', 'c', 1 (all keys are the same, last one wins)

// Question 8: this binding
console.log("\nQ8:");
const object = {
  message: 'Hello',
  getMessage() {
    const message = 'Hi';
    return this.message;
  }
};
console.log(object.getMessage());
// Answer: 'Hello' (this refers to object)

// Question 9: Promise execution order
console.log("\nQ9:");
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Answer: 1, 4, 3, 2 (sync, sync, microtask, macrotask)

// Question 10: Spread operator
console.log("\nQ10:");
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined);
// Answer: [1, 2, 3, 4, 5, 6]

// Question 11: Destructuring with defaults
console.log("\nQ11:");
const { x = 5, y = 10 } = { x: null, y: undefined };
console.log(x, y);
// Answer: null, 10 (default only used for undefined, not null)

// Question 12: NaN comparison
console.log("\nQ12:");
console.log(NaN === NaN);
console.log(Number.isNaN(NaN));
console.log(isNaN("hello"));
// Answer: false, true, true (NaN is not equal to itself)

// Question 13: Hoisting
console.log("\nQ13:");
console.log(myFunc());
console.log(myVar);

function myFunc() {
  return "function hoisted";
}

var myVar = "variable hoisted";
// Answer: "function hoisted", undefined (functions fully hoisted, var declarations hoisted but not initialization)

// Question 14: Array vs Object
console.log("\nQ14:");
console.log(typeof []);
console.log(Array.isArray([]));
console.log([] instanceof Array);
// Answer: "object", true, true

// Question 15: Coercion
console.log("\nQ15:");
console.log(1 + "2" + 3);
console.log(1 + 2 + "3");
console.log("1" - 1);
console.log("1" + 1);
// Answer: "123", "33", 0, "11"

// Question 16: Rest parameters
console.log("\nQ16:");
function sum(a, b, ...rest) {
  return a + b + rest.reduce((acc, val) => acc + val, 0);
}
console.log(sum(1, 2, 3, 4, 5));
// Answer: 15

// Question 17: Object.freeze
console.log("\nQ17:");
const frozen = Object.freeze({ a: 1, b: { c: 2 } });
frozen.a = 10;
frozen.b.c = 20;
console.log(frozen.a, frozen.b.c);
// Answer: 1, 20 (shallow freeze only)

// Question 18: Set operations
console.log("\nQ18:");
const set = new Set([1, 2, 3, 3, 4]);
console.log(set.size);
console.log([...set]);
// Answer: 4, [1, 2, 3, 4] (Sets contain unique values)

// Question 19: Async/await
console.log("\nQ19:");
async function getData() {
  return await Promise.resolve('data');
}
getData().then(console.log);
// Answer: 'data'

// Question 20: Method chaining
console.log("\nQ20:");
const chain = {
  value: 1,
  add(n) {
    this.value += n;
    return this;
  },
  multiply(n) {
    this.value *= n;
    return this;
  }
};
const result2 = chain.add(2).multiply(3).value;
console.log(result2);
// Answer: 9 ((1 + 2) * 3)

// TRICKY QUESTIONS

// Question 21: What's logged?
console.log("\nQ21:");
(function() {
  var a = b = 3;
})();
console.log(typeof a !== 'undefined');
console.log(typeof b !== 'undefined');
// Answer: false, true (b becomes global, a is local)

// Question 22: Event delegation
console.log("\nQ22:");
const nums = [1, 2, 3];
nums[10] = 11;
console.log(nums.filter(() => true).length);
// Answer: 4 (filter skips empty slots)

// Question 23: Constructor functions
console.log("\nQ23:");
function Person(name) {
  this.name = name;
}
const person1 = new Person('John');
const person2 = Person('Jane');
console.log(person1.name);
console.log(typeof person2);
// Answer: 'John', 'undefined' (without new, this is global/undefined)

// Question 24: Immediately Invoked Function Expression (IIFE)
console.log("\nQ24:");
const result3 = (function(x) {
  return function(y) {
    return x + y;
  };
})(10)(20);
console.log(result3);
// Answer: 30

// Question 25: Object.create
console.log("\nQ25:");
const proto = { greeting: 'hello' };
const obj2 = Object.create(proto);
console.log(obj2.greeting);
console.log(obj2.hasOwnProperty('greeting'));
// Answer: 'hello', false (greeting is in prototype, not own property)
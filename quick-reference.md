# JavaScript Quick Reference - 30 Second Review Before Quiz

## MUST KNOW - Instant Recall

### 1. Falsy Values (memorize!)
```javascript
false, 0, -0, 0n, "", null, undefined, NaN
```

### 2. typeof Results
```javascript
typeof undefined    // "undefined"
typeof null        // "object" ⚠️
typeof true        // "boolean"  
typeof 42          // "number"
typeof "str"       // "string"
typeof {}          // "object"
typeof []          // "object" ⚠️
typeof function(){} // "function"
```

### 3. Array Methods Quick Reference
**Mutating** (changes original):
- `push()`, `pop()`, `shift()`, `unshift()`
- `splice()`, `reverse()`, `sort()`

**Non-mutating** (returns new):
- `map()`, `filter()`, `reduce()`
- `slice()`, `concat()`, `spread [...arr]`

### 4. == vs === 
- `==` : loose (with coercion)
- `===` : strict (no coercion)
```javascript
"1" == 1   // true
"1" === 1  // false
```

### 5. Variable Scoping
- `var` : function-scoped, hoisted
- `let` : block-scoped, temporal dead zone
- `const` : block-scoped, cannot reassign

### 6. this Binding Rules (in order)
1. `new` binding
2. Explicit binding (`call`, `apply`, `bind`)
3. Implicit binding (object method)
4. Default binding (global/undefined)

### 7. Arrow vs Regular Functions
```javascript
// Arrow: no own 'this', can't be constructor
const arrow = () => {};

// Regular: has own 'this', can be constructor  
function regular() {}
```

### 8. Event Loop Order
1. **Sync code** (immediate)
2. **Microtasks** (Promise.then, async/await)
3. **Macrotasks** (setTimeout, setInterval)

### 9. Coercion Tricks
```javascript
+"42"     // 42 (to number)
!!"text"  // true (to boolean)
"" + 42   // "42" (to string)
```

### 10. Common Gotchas
```javascript
NaN === NaN           // false ⚠️
typeof NaN            // "number" ⚠️
0.1 + 0.2 === 0.3    // false ⚠️
[] + []              // ""
[] + {}              // "[object Object]"
{} + []              // 0
```

## Speed Solutions - Copy & Paste Ready

### Remove Duplicates
```javascript
[...new Set(array)]
```

### Check Empty Object
```javascript
Object.keys(obj).length === 0
```

### Deep Clone (simple)
```javascript
JSON.parse(JSON.stringify(obj))
```

### Flatten Array
```javascript
arr.flat(Infinity)
```

### Get Random Item
```javascript
arr[Math.floor(Math.random() * arr.length)]
```

### Swap Variables
```javascript
[a, b] = [b, a]
```

### Default Parameters
```javascript
function fn(x = defaultValue) {}
```

### Optional Chaining
```javascript
obj?.prop?.nested // safe access
```

### Nullish Coalescing
```javascript
value ?? default // only null/undefined
```

## Last 30 Seconds Before Quiz

1. **Falsy**: `false, 0, "", null, undefined, NaN`
2. **typeof null** = `"object"`
3. **NaN === NaN** = `false`
4. **Array.isArray([])** = `true`
5. **Promises before setTimeout**
6. **let/const** are block-scoped
7. **Arrow functions** don't have `this`
8. **Spread** `...` for arrays/objects
9. **map/filter/reduce** don't mutate
10. **=== is safer than ==**

## Common Interview Patterns

### Closure Counter
```javascript
function counter() {
  let count = 0;
  return () => ++count;
}
```

### Debounce
```javascript
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
```

### Promise.all Implementation
```javascript
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;
    promises.forEach((promise, index) => {
      promise.then(value => {
        results[index] = value;
        if (++completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}
```

### Curry Function
```javascript
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}
```

## Emergency Reminders

- **Read questions carefully** - they often test edge cases
- **Watch for semicolon insertion** after `return`
- **Check if asking for output vs return value**
- **Consider hoisting** for var and function declarations
- **Remember sparse arrays** have gaps
- **Test with edge cases**: empty arrays, null, undefined
- **Time complexity**: map/filter/reduce are O(n)

Good luck! You've got this! 🚀
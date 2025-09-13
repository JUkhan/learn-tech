# TypeScript Interview Questions & Answers

## Basic Level Questions

### 1. What is TypeScript and why use it?
**Answer:** TypeScript is a statically-typed superset of JavaScript that compiles to plain JavaScript. Benefits include:
- Type safety catches errors at compile-time
- Better IDE support with IntelliSense
- Enhanced code readability and maintainability
- Support for latest ECMAScript features
- Better refactoring capabilities

### 2. What are the primitive types in TypeScript?
**Answer:**
- `boolean`: true/false values
- `number`: all numbers (integer and floating-point)
- `string`: text data
- `null`: intentional absence of value
- `undefined`: uninitialized variable
- `symbol`: unique identifiers
- `bigint`: large integers

### 3. What's the difference between `interface` and `type`?
**Answer:**
- **Interface**: Can be extended/implemented, supports declaration merging, better for object shapes
- **Type**: Can represent primitives, unions, tuples, can use computed properties, more flexible
```typescript
// Interface - can be extended
interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

// Type - can create unions
type Status = "pending" | "approved" | "rejected";
```

### 4. What is the difference between `any` and `unknown`?
**Answer:**
- `any`: Disables type checking, can be assigned to anything
- `unknown`: Type-safe, requires type checking before use
```typescript
let anyVar: any = 10;
anyVar.foo.bar; // No error

let unknownVar: unknown = 10;
// unknownVar.foo; // Error - must type check first
if (typeof unknownVar === 'number') {
    console.log(unknownVar + 5); // OK after type check
}
```

### 5. What are optional properties and parameters?
**Answer:** Use `?` to mark properties/parameters as optional:
```typescript
interface User {
    name: string;
    age?: number; // Optional property
}

function greet(name: string, title?: string) { // Optional parameter
    return title ? `${title} ${name}` : name;
}
```

## Intermediate Level Questions

### 6. Explain Union and Intersection types
**Answer:**
- **Union (`|`)**: Value can be one of several types
- **Intersection (`&`)**: Combines multiple types
```typescript
// Union
type Result = string | number;
let value: Result = "success"; // OK
value = 200; // OK

// Intersection
type Employee = Person & { employeeId: number };
// Has all properties from Person plus employeeId
```

### 7. What are Type Guards?
**Answer:** Runtime checks that narrow types within conditional blocks:
```typescript
// typeof guard
function processValue(value: string | number) {
    if (typeof value === "string") {
        return value.toUpperCase(); // value is string here
    }
    return value.toFixed(2); // value is number here
}

// instanceof guard
if (error instanceof Error) {
    console.log(error.message);
}

// Custom type guard
function isString(value: any): value is string {
    return typeof value === "string";
}
```

### 8. What is a Generic and why use it?
**Answer:** Generics provide reusable components that work with multiple types:
```typescript
function identity<T>(arg: T): T {
    return arg;
}

class Box<T> {
    constructor(private value: T) {}
    getValue(): T { return this.value; }
}

const stringBox = new Box<string>("hello");
const numberBox = new Box<number>(42);
```

### 9. Explain `readonly` modifier
**Answer:** Prevents properties from being changed after initialization:
```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 5; // Error

// For arrays
const arr: readonly number[] = [1, 2, 3];
// arr.push(4); // Error
```

### 10. What are Enums and their types?
**Answer:** Enums define named constants:
```typescript
// Numeric enum
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

// String enum
enum Status {
    Pending = "PENDING",
    Approved = "APPROVED",
    Rejected = "REJECTED"
}

// Const enum (inlined at compile time)
const enum Size {
    Small = 1,
    Medium = 2,
    Large = 3
}
```

## Advanced Level Questions

### 11. What are Conditional Types?
**Answer:** Types that select one of two possible types based on a condition:
```typescript
type IsString<T> = T extends string ? true : false;

type Result1 = IsString<"hello">; // true
type Result2 = IsString<42>; // false

// Extract return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

### 12. Explain Mapped Types
**Answer:** Create new types by transforming properties of existing types:
```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};
```

### 13. What are Utility Types? Name some important ones.
**Answer:** Built-in types that provide common type transformations:
- `Partial<T>`: Makes all properties optional
- `Required<T>`: Makes all properties required
- `Readonly<T>`: Makes all properties readonly
- `Pick<T, K>`: Creates type with subset of properties
- `Omit<T, K>`: Creates type excluding specific properties
- `Record<K, T>`: Creates object type with keys K and values T
- `ReturnType<T>`: Extracts return type of function
- `Parameters<T>`: Extracts parameter types of function

### 14. What is Declaration Merging?
**Answer:** TypeScript merges multiple declarations with the same name:
```typescript
interface User {
    name: string;
}

interface User {
    age: number; // Merged with above
}

// Result: User has both name and age
const user: User = {
    name: "John",
    age: 30
};
```

### 15. Explain the `infer` keyword
**Answer:** Used in conditional types to infer types within the condition:
```typescript
type ArrayElementType<T> = T extends (infer E)[] ? E : never;
type Elem = ArrayElementType<string[]>; // string

type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type Result = UnpackPromise<Promise<string>>; // string
```

### 16. What are Discriminated Unions?
**Answer:** Pattern using literal types as discriminators:
```typescript
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    size: number;
}

type Shape = Circle | Square;

function area(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.size ** 2;
    }
}
```

### 17. What is the `never` type?
**Answer:** Represents values that never occur:
```typescript
// Function that never returns
function throwError(message: string): never {
    throw new Error(message);
}

// Exhaustive checking
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

type Shape = Circle | Square;
function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle": return Math.PI * shape.radius ** 2;
        case "square": return shape.size ** 2;
        default: return assertNever(shape); // Error if not exhaustive
    }
}
```

### 18. What are Template Literal Types?
**Answer:** Types using template literal strings:
```typescript
type EventName = "click" | "focus";
type EventHandler = `on${Capitalize<EventName>}`; // "onClick" | "onFocus"

type PropKey<T extends string> = `get${Capitalize<T>}` | `set${Capitalize<T>}`;
type PersonProps = PropKey<"name" | "age">; 
// "getName" | "setName" | "getAge" | "setAge"
```

### 19. Explain Variance in TypeScript
**Answer:**
- **Covariance**: Preserves type ordering (A ≤ B means F<A> ≤ F<B>)
- **Contravariance**: Reverses type ordering (A ≤ B means F<B> ≤ F<A>)
- **Invariance**: No relationship
```typescript
// Function parameters are contravariant
type Handler<T> = (arg: T) => void;
let animalHandler: Handler<Animal>;
let dogHandler: Handler<Dog>;
animalHandler = dogHandler; // Error - contravariant

// Return types are covariant
type Producer<T> = () => T;
let animalProducer: Producer<Animal>;
let dogProducer: Producer<Dog>;
animalProducer = dogProducer; // OK - covariant
```

### 20. What is Type Narrowing?
**Answer:** Process of refining types to more specific types:
```typescript
function example(x: string | number | null) {
    if (x === null) {
        // x is null here
        return;
    }
    
    if (typeof x === "string") {
        // x is string here
        console.log(x.toUpperCase());
    } else {
        // x is number here
        console.log(x.toFixed(2));
    }
}
```

## Practical Scenario Questions

### 21. How would you type a function that accepts any number of arguments?
**Answer:**
```typescript
// Rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0);
}

// Variable arguments with different types
function log(message: string, ...data: any[]): void {
    console.log(message, ...data);
}
```

### 22. How do you handle null/undefined in TypeScript?
**Answer:**
```typescript
// With strictNullChecks enabled
let value: string | null = null;

// Optional chaining
const length = value?.length;

// Nullish coalescing
const defaultValue = value ?? "default";

// Non-null assertion (use carefully)
const definitelyValue = value!;

// Type guards
if (value !== null) {
    console.log(value.length); // OK
}
```

### 23. How would you type an async function?
**Answer:**
```typescript
// Async function returning Promise
async function fetchUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}

// Generic async function
async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json();
}

// Type for async function
type AsyncFunction<T> = () => Promise<T>;
```

### 24. How do you work with third-party libraries without types?
**Answer:**
```typescript
// 1. Check for @types package
// npm install --save-dev @types/library-name

// 2. Create declaration file (library.d.ts)
declare module 'library-name' {
    export function someFunction(param: string): number;
}

// 3. Use any as last resort
const library: any = require('library-name');
```

### 25. What's the difference between `type` assertion and type casting?
**Answer:** TypeScript uses type assertions, not casting (no runtime effect):
```typescript
// Type assertion - compile-time only
let value: any = "hello";
let length1 = (value as string).length;
let length2 = (<string>value).length; // Alternative syntax

// This doesn't change the runtime type
let num: any = "123";
let result = (num as number) + 10; // Runtime error!

// Proper type conversion
let properNum = parseInt(num); // Actual conversion
```

## Common Mistakes & Best Practices

### 26. What are common TypeScript mistakes to avoid?
**Answer:**
1. **Overusing `any`**: Defeats purpose of TypeScript
2. **Not using strict mode**: Enable all strict checks
3. **Ignoring compiler errors**: They prevent runtime errors
4. **Not using readonly**: Make immutable when possible
5. **Using type assertions instead of type guards**

### 27. TypeScript configuration best practices?
**Answer:**
```json
{
  "compilerOptions": {
    "strict": true,              // Enable all strict checks
    "noImplicitAny": true,       // Error on `any` type
    "strictNullChecks": true,    // Null/undefined checking
    "noUnusedLocals": true,      // Error on unused variables
    "noUnusedParameters": true,  // Error on unused parameters
    "noImplicitReturns": true,   // All paths must return
    "esModuleInterop": true,     // Better CommonJS interop
    "skipLibCheck": true,        // Skip .d.ts file checking
    "forceConsistentCasingInFileNames": true
  }
}
```

### 28. How do you debug TypeScript types?
**Answer:**
```typescript
// Use IDE hover information
// Use TypeScript playground
// Use type aliases for complex types
type Debug = SomeComplexType; // Hover to see expanded type

// Use conditional types for debugging
type IsString<T> = T extends string ? "YES" : "NO";
type Test = IsString<"hello">; // Hover shows "YES"

// Extract type from value
const config = { api: "url", timeout: 5000 };
type Config = typeof config;
```

### 29. Performance tips for TypeScript?
**Answer:**
1. Use `skipLibCheck: true` for faster builds
2. Use project references for large codebases
3. Prefer interfaces over type aliases for objects
4. Use const assertions for literal types
5. Avoid complex conditional types in hot paths
6. Use incremental compilation

### 30. How to migrate JavaScript to TypeScript?
**Answer:**
1. Rename `.js` to `.ts` files gradually
2. Start with `allowJs: true` and loose settings
3. Add types incrementally (start with `any`)
4. Enable strict checks gradually
5. Use JSDoc comments for gradual typing
6. Focus on critical paths first
7. Add types for third-party libraries
8. Use automated tools like `ts-migrate`
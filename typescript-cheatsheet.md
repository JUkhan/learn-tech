# TypeScript Quick Reference Cheat Sheet

## Types at a Glance

```typescript
// Primitives
let bool: boolean = true;
let num: number = 42;
let str: string = "hello";
let n: null = null;
let u: undefined = undefined;
let sym: symbol = Symbol();
let big: bigint = 100n;

// Arrays
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];

// Tuple
let tuple: [string, number] = ["hello", 10];

// Object
let obj: { name: string; age: number } = { name: "John", age: 30 };

// Function
let fn: (x: number) => string = (x) => x.toString();

// Any vs Unknown
let a: any = 42;        // No type checking
let u: unknown = 42;    // Safe, requires type check

// Void & Never
function log(): void { console.log("log"); }     // No return
function fail(): never { throw new Error(); }    // Never returns
```

## Type Operations

```typescript
// Union
type StringOrNumber = string | number;

// Intersection  
type Combined = TypeA & TypeB;

// Type Assertion
let value = someValue as string;
let value2 = <string>someValue;

// Type Guard
if (typeof x === "string") { }
if (x instanceof Date) { }
if ("property" in object) { }

// Literal Types
type Direction = "up" | "down" | "left" | "right";
type One = 1;
```

## Interfaces vs Types

```typescript
// Interface - for objects, can extend
interface User {
    name: string;
    age?: number;           // Optional
    readonly id: number;    // Readonly
    [key: string]: any;     // Index signature
}

// Type - more flexible
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (data: string) => void;
```

## Functions

```typescript
// Function declaration
function add(x: number, y: number): number {
    return x + y;
}

// Optional & Default params
function greet(name: string, title?: string): string { }
function greet2(name: string, title = "Mr."): string { }

// Rest params
function sum(...nums: number[]): number { }

// Overloading
function process(x: string): string;
function process(x: number): number;
function process(x: string | number): string | number { }

// Arrow function
const multiply = (x: number, y: number): number => x * y;
```

## Classes

```typescript
class Animal {
    public name: string;        // Public by default
    private age: number;        // Private to class
    protected type: string;     // Accessible in subclasses
    readonly id: number;        // Immutable
    static species = "Animal";  // Static property

    constructor(name: string) {
        this.name = name;
    }

    move(): void { }
}

class Dog extends Animal {
    bark(): void { }
}

abstract class Base {
    abstract doSomething(): void;
}
```

## Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
    return arg;
}

// Generic interface
interface Box<T> {
    value: T;
}

// Generic class
class GenericClass<T> {
    value: T;
}

// Generic constraints
function getLength<T extends { length: number }>(arg: T): number {
    return arg.length;
}

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}
```

## Utility Types

```typescript
// Partial - all props optional
type Partial<T> = { [P in keyof T]?: T[P] };

// Required - all props required
type Required<T> = { [P in keyof T]-?: T[P] };

// Readonly - all props readonly
type Readonly<T> = { readonly [P in keyof T]: T[P] };

// Pick - select properties
type Pick<T, K> = { [P in K]: T[P] };

// Omit - exclude properties
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

// Record - object with keys K and values T
type Record<K, T> = { [P in K]: T };

// Exclude - exclude from union
type Exclude<T, U> = T extends U ? never : T;

// Extract - extract from union
type Extract<T, U> = T extends U ? T : never;

// NonNullable - remove null/undefined
type NonNullable<T> = T extends null | undefined ? never : T;

// ReturnType - function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// Parameters - function parameters
type Parameters<T> = T extends (...args: infer P) => any ? P : never;
```

## Advanced Types

### Conditional Types
```typescript
type IsString<T> = T extends string ? true : false;
type TypeName<T> = 
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    "object";
```

### Mapped Types
```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};
```

### Template Literal Types
```typescript
type Greeting = `Hello ${string}`;
type EventName = `on${Capitalize<string>}`;
```

### Discriminated Unions
```typescript
type Result = 
    | { success: true; data: string }
    | { success: false; error: Error };

function handle(result: Result) {
    if (result.success) {
        console.log(result.data);  // string
    } else {
        console.log(result.error); // Error
    }
}
```

## Type Narrowing Techniques

```typescript
// typeof
if (typeof value === "string") { }

// instanceof
if (error instanceof Error) { }

// in operator
if ("swim" in animal) { }

// Truthiness
if (value) { }

// Equality
if (value === null) { }

// Custom type guard
function isString(x: any): x is string {
    return typeof x === "string";
}
```

## Enums

```typescript
// Numeric enum
enum Direction {
    Up,      // 0
    Down,    // 1
    Left,    // 2
    Right    // 3
}

// String enum
enum Status {
    Pending = "PENDING",
    Approved = "APPROVED"
}

// Const enum (inlined)
const enum Size {
    Small = 1,
    Large = 2
}
```

## Module System

```typescript
// Export
export class MyClass { }
export type MyType = string;
export interface MyInterface { }
export default function() { }

// Import
import { MyClass } from "./module";
import MyDefault from "./module";
import * as Module from "./module";
import type { MyType } from "./module";

// Re-export
export { MyClass } from "./module";
export * from "./module";
```

## Declaration Files

```typescript
// Ambient declarations
declare let myLib: any;
declare function myFunction(a: string): number;
declare namespace MyNamespace {
    function myMethod(): void;
}

// Module declarations
declare module "my-module" {
    export function doSomething(): void;
}

// Global augmentation
declare global {
    interface Window {
        myProperty: any;
    }
}
```

## tsconfig.json Essential Options

```json
{
  "compilerOptions": {
    "target": "ES2020",           // ECMAScript target
    "module": "commonjs",         // Module system
    "lib": ["ES2020"],           // Library files
    "strict": true,              // All strict checks
    "esModuleInterop": true,     // CommonJS interop
    "skipLibCheck": true,        // Skip .d.ts checking
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,   // Import JSON
    "declaration": true,         // Generate .d.ts
    "outDir": "./dist",         // Output directory
    "rootDir": "./src",         // Root directory
    "strictNullChecks": true,   // Null checking
    "noImplicitAny": true,      // No implicit any
    "noUnusedLocals": true,     // No unused vars
    "noUnusedParameters": true  // No unused params
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Common Patterns

### Singleton
```typescript
class Singleton {
    private static instance: Singleton;
    private constructor() { }
    static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
```

### Factory
```typescript
interface Product {
    name: string;
}

class ProductFactory {
    static create<T extends Product>(type: new () => T): T {
        return new type();
    }
}
```

### Builder
```typescript
class Builder {
    private value = "";
    add(text: string): this {
        this.value += text;
        return this;
    }
    build(): string {
        return this.value;
    }
}
```

## Quick Tips

1. **Enable strict mode**: Always use `"strict": true`
2. **Avoid any**: Use `unknown` for truly unknown types
3. **Use const assertions**: `as const` for literal types
4. **Prefer interfaces**: For object types (better performance)
5. **Use readonly**: For immutable properties
6. **Type imports**: Use `import type` when importing only types
7. **Non-null assertion**: Use `!` sparingly (value!)
8. **Optional chaining**: Use `?.` for safe access
9. **Nullish coalescing**: Use `??` instead of `||` for defaults
10. **Exhaustive checks**: Use `never` for complete switch cases
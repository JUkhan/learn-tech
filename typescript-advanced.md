# TypeScript Advanced Concepts

## 1. Generics

### Basic Generics
```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");
let output2 = identity("myString"); // Type inference

// Generic interfaces
interface GenericIdentityFn<T> {
    (arg: T): T;
}

// Generic classes
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;
```

### Generic Constraints
```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// Using type parameters in generic constraints
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // OK
// getProperty(x, "m"); // Error
```

## 2. Utility Types

### Partial<T>
```typescript
interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}
```

### Required<T>
```typescript
interface Props {
    a?: number;
    b?: string;
}

const obj: Required<Props> = { a: 5, b: "hello" };
```

### Readonly<T>
```typescript
interface Todo {
    title: string;
}

const todo: Readonly<Todo> = {
    title: "Delete inactive users",
};

// todo.title = "Hello"; // Error
```

### Record<K, T>
```typescript
type PageInfo = {
    title: string;
};

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
    home: { title: "Home" },
    about: { title: "About" },
    contact: { title: "Contact" },
};
```

### Pick<T, K>
```typescript
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;
```

### Omit<T, K>
```typescript
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;
```

### Exclude<T, U> and Extract<T, U>
```typescript
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
```

### NonNullable<T>
```typescript
type T0 = NonNullable<string | number | undefined>; // string | number
```

### ReturnType<T>
```typescript
function f() {
    return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>; // { x: number, y: number }
```

### Parameters<T>
```typescript
function f(a: string, b: number) {}
type P = Parameters<typeof f>; // [string, number]
```

## 3. Conditional Types

```typescript
type IsString<T> = T extends string ? true : false;
type A = IsString<string>; // true
type B = IsString<number>; // false

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;
type StrArray = ToArray<string | number>; // string[] | number[]

// Infer keyword
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// Conditional type with multiple conditions
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";
```

## 4. Mapped Types

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

// Remove readonly
type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

// Remove optional
type Required<T> = {
    [P in keyof T]-?: T[P];
};

// Key remapping (TypeScript 4.1+)
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

interface Person {
    name: string;
    age: number;
}

type LazyPerson = Getters<Person>;
// { getName: () => string; getAge: () => number; }
```

## 5. Template Literal Types

```typescript
type World = "world";
type Greeting = `hello ${World}`; // "hello world"

// With unions
type Color = "red" | "blue";
type Quantity = "one" | "two";
type SeussFish = `${Quantity | Color} fish`;
// "one fish" | "two fish" | "red fish" | "blue fish"

// Uppercase/Lowercase/Capitalize/Uncapitalize
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<"my_app">; // "ID-MY_APP"
```

## 6. Index Types and Index Signatures

```typescript
// Index types
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
    return propertyNames.map(n => o[n]);
}

interface Car {
    manufacturer: string;
    model: string;
    year: number;
}

let taxi: Car = {
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2014
};

let makeAndModel = pluck(taxi, ['manufacturer', 'model']);

// Index signatures
interface StringDictionary {
    [index: string]: string | number; // All properties must be string or number
    length: number; // OK
    name: string; // OK
}
```

## 7. Discriminated Unions

```typescript
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape): number {
    switch (s.kind) {
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.width * s.height;
        case "circle":
            return Math.PI * s.radius ** 2;
        default:
            const _exhaustiveCheck: never = s;
            return _exhaustiveCheck;
    }
}
```

## 8. Decorators (Experimental)

```typescript
// Class decorator
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class BugReport {
    type = "report";
    title: string;
    constructor(t: string) {
        this.title = t;
    }
}

// Method decorator
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}

// Property decorator
function format(formatString: string) {
    return function (target: any, propertyKey: string) {
        let value = target[propertyKey];

        const getter = function () {
            return `${formatString} ${value}`;
        };

        const setter = function (newVal: string) {
            value = newVal;
        };

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}
```

## 9. Module Augmentation

```typescript
// Augmenting a module
declare module "module-name" {
    export interface ExistingInterface {
        newProperty: string;
    }
}

// Global augmentation
declare global {
    interface Array<T> {
        toObservable(): Observable<T>;
    }
}
```

## 10. Advanced Type Inference

```typescript
// const assertions
let x = "hello" as const; // Type is "hello", not string
let y = [10, 20] as const; // Type is readonly [10, 20]

const obj = {
    name: "John",
    age: 30
} as const; // All properties are readonly

// Type predicates
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

// Control flow analysis
function example(x: string | number | boolean) {
    if (typeof x === "string") {
        // x is string here
        x.toUpperCase();
    } else if (typeof x === "number") {
        // x is number here
        x.toFixed();
    } else {
        // x is boolean here
        x === true;
    }
}
```

## 11. Namespace and Module Patterns

```typescript
// Namespaces
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5;
        }
    }
}

// Module pattern
module MyModule {
    export function doSomething() {
        console.log("Doing something...");
    }
}

// ES6 modules
export class MyClass {}
export default function() {}
export { MyClass as TheClass };
```

## 12. Advanced Function Types

```typescript
// Constructor signatures
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
    tick(): void;
}

// Call signatures
interface CallOrConstruct {
    new (s: string): Date;
    (n?: number): number;
}

// This types
class Box {
    contents: string = "";
    set(value: string): this {
        this.contents = value;
        return this;
    }
}

class ClearableBox extends Box {
    clear() {
        this.contents = "";
    }
}

const a = new ClearableBox();
const b = a.set("hello").clear(); // OK because set returns 'this'
```

## Common Advanced Patterns

### Builder Pattern with Fluent Interface
```typescript
class QueryBuilder<T> {
    private query: Partial<T> = {};

    where<K extends keyof T>(key: K, value: T[K]): this {
        this.query[key] = value;
        return this;
    }

    build(): Partial<T> {
        return this.query;
    }
}
```

### Type-safe Event Emitter
```typescript
type EventMap = {
    'user:login': { userId: string; timestamp: Date };
    'user:logout': { userId: string };
};

class TypedEventEmitter<T extends Record<string, any>> {
    private handlers: Partial<{ [K in keyof T]: Array<(data: T[K]) => void> }> = {};

    on<K extends keyof T>(event: K, handler: (data: T[K]) => void) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }
        this.handlers[event]!.push(handler);
    }

    emit<K extends keyof T>(event: K, data: T[K]) {
        this.handlers[event]?.forEach(handler => handler(data));
    }
}
```
# TypeScript Fundamentals - Quick Review

## 1. Basic Types

### Primitive Types
```typescript
let isDone: boolean = false;
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let color: string = "blue";
let template: string = `Color is ${color}`;
```

### Arrays
```typescript
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
```

### Tuple
```typescript
let x: [string, number];
x = ["hello", 10]; // OK
// x = [10, "hello"]; // Error
```

### Enum
```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Custom values
enum Color2 {Red = 1, Green = 2, Blue = 4}

// String enums
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}
```

### Any, Unknown, Void, Never
```typescript
let notSure: any = 4;
notSure = "maybe a string";

let value: unknown = 4;
// value.toFixed(); // Error - must type check first

function warnUser(): void {
    console.log("Warning!");
}

function error(message: string): never {
    throw new Error(message);
}
```

### Null and Undefined
```typescript
let u: undefined = undefined;
let n: null = null;
```

## 2. Type Annotations & Inference

```typescript
// Type annotation
let myName: string = "Alice";

// Type inference
let myAge = 30; // TypeScript infers number

// Function parameters and return type
function add(x: number, y: number): number {
    return x + y;
}

// Arrow function
const multiply = (x: number, y: number): number => x * y;
```

## 3. Interfaces

```typescript
interface Person {
    firstName: string;
    lastName: string;
    age?: number; // Optional property
    readonly id: number; // Readonly property
}

function greet(person: Person) {
    console.log(`Hello ${person.firstName}`);
}

// Extending interfaces
interface Employee extends Person {
    employeeId: number;
    department: string;
}

// Index signatures
interface StringDictionary {
    [index: string]: string;
}

// Function types in interfaces
interface SearchFunc {
    (source: string, subString: string): boolean;
}
```

## 4. Classes

```typescript
class Animal {
    private name: string;
    protected age: number;
    public species: string;
    
    constructor(name: string, age: number, species: string) {
        this.name = name;
        this.age = age;
        this.species = species;
    }
    
    public move(distance: number = 0) {
        console.log(`${this.name} moved ${distance}m.`);
    }
}

class Dog extends Animal {
    constructor(name: string, age: number) {
        super(name, age, "Canine");
    }
    
    bark() {
        console.log("Woof! Woof!");
    }
}

// Abstract classes
abstract class Department {
    abstract printMeeting(): void;
    
    printName(): void {
        console.log("Department");
    }
}

// Static members
class Grid {
    static origin = {x: 0, y: 0};
    
    calculateDistance(point: {x: number; y: number}) {
        let xDist = point.x - Grid.origin.x;
        let yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist * xDist + yDist * yDist);
    }
}
```

## 5. Functions

```typescript
// Named function
function add(x: number, y: number): number {
    return x + y;
}

// Anonymous function
let myAdd = function(x: number, y: number): number {
    return x + y;
};

// Optional and default parameters
function buildName(firstName: string, lastName?: string): string {
    return lastName ? `${firstName} ${lastName}` : firstName;
}

function buildName2(firstName: string, lastName = "Smith"): string {
    return `${firstName} ${lastName}`;
}

// Rest parameters
function buildName3(firstName: string, ...restOfName: string[]): string {
    return firstName + " " + restOfName.join(" ");
}

// Function overloading
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x: any): any {
    if (typeof x == "object") {
        return Math.floor(Math.random() * x.length);
    } else if (typeof x == "number") {
        return { suit: "diamonds", card: x % 13 };
    }
}
```

## 6. Type Assertions

```typescript
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;

// Alternative syntax (not for JSX)
let strLength2: number = (<string>someValue).length;
```

## 7. Union and Intersection Types

```typescript
// Union types
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${typeof padding}'.`);
}

// Intersection types
interface ErrorHandling {
    success: boolean;
    error?: { message: string };
}

interface ArtworksData {
    artworks: { title: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;
```

## 8. Type Guards

```typescript
// typeof type guard
function isNumber(x: any): x is number {
    return typeof x === "number";
}

// instanceof type guard
class Bird {
    fly() {
        console.log("flying");
    }
}

class Fish {
    swim() {
        console.log("swimming");
    }
}

function move(pet: Fish | Bird) {
    if (pet instanceof Fish) {
        pet.swim();
    } else {
        pet.fly();
    }
}

// in operator
interface A {
    a: number;
}

interface B {
    b: string;
}

function foo(x: A | B) {
    if ("a" in x) {
        return x.a;
    }
    return x.b;
}
```

## 9. Literal Types

```typescript
// String literal types
type Easing = "ease-in" | "ease-out" | "ease-in-out";

function animate(easing: Easing) {
    // ...
}

// Numeric literal types
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

// Boolean literal types
type Success = true;
type Failure = false;
type Result = Success | Failure;
```

## 10. Type Aliases

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n;
    } else {
        return n();
    }
}

// Type alias for object
type Point = {
    x: number;
    y: number;
};
```

## Common Pitfalls to Avoid

1. **Using `any` too much** - defeats the purpose of TypeScript
2. **Not using strict mode** - always enable `"strict": true` in tsconfig.json
3. **Ignoring compiler errors** - they're there to help
4. **Not understanding the difference between `interface` and `type`**
5. **Forgetting about `null` and `undefined` checks**
6. **Not using readonly when appropriate**
7. **Overusing type assertions** - let TypeScript infer when possible
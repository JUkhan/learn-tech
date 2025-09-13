Yes, here are examples for each of the advanced TypeScript concepts mentioned in Phase 3.

### 1\. Utility Types

Here's how to use some common utility types with a `User` interface as a base.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  isVerified: boolean;
}

// Partial<Type>: Makes all properties optional
type PartialUser = Partial<User>;
// type PartialUser = {
//   id?: number;
//   name?: string;
//   email?: string;
//   isVerified?: boolean;
// }

const userUpdate: PartialUser = { name: "Alice" }; // Valid

// Pick<Type, Keys>: Picks a set of properties from a type
type UserLogin = Pick<User, 'email' | 'id'>;
// type UserLogin = {
//   email: string;
//   id: number;
// }

// Omit<Type, Keys>: Removes a set of properties from a type
type UserProfile = Omit<User, 'id' | 'isVerified'>;
// type UserProfile = {
//   name: string;
//   email: string;
// }

// Readonly<Type>: Makes all properties read-only
type ReadonlyUser = Readonly<User>;
// type ReadonlyUser = {
//   readonly id: number;
//   readonly name: string;
//   // ... and so on
// }

const myUser: ReadonlyUser = { id: 1, name: "Bob", email: "bob@example.com", isVerified: false };
// myUser.name = "John"; // Error: Cannot assign to 'name' because it is a read-only property.

```

-----

### 2\. Conditional Types

Conditional types use a ternary operator-like syntax to define a type based on a condition.

```typescript
// A simple conditional type: Check if a type is a string.
type IsString<T> = T extends string ? "yes" : "no";

type Result1 = IsString<"hello">; // "yes"
type Result2 = IsString<123>; // "no"

// Using `infer` to extract a type
type GetArrayItem<T> = T extends (infer U)[] ? U : T;

type Item1 = GetArrayItem<string[]>; // string
type Item2 = GetArrayItem<number[]>; // number
type Item3 = GetArrayItem<boolean>; // boolean (not an array, so returns the original type)

// A more practical example: Get the return type of a function.
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function myFunction(): string {
  return "hello";
}

type MyFunctionReturnType = GetReturnType<typeof myFunction>; // string
```
Conditional types in TypeScript are a powerful feature that allow you to create types that depend on a condition. They use a syntax similar to JavaScript's ternary operator but work at the type level.

## Basic Syntax

```typescript
T extends U ? X : Y
```

This reads as: "If type T extends (is assignable to) type U, then the type is X, otherwise it's Y."

## Simple Examples

### Example 1: Basic Conditional Type

```typescript
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>;    // true
type Test2 = IsString<number>;    // false
type Test3 = IsString<"hello">;   // true
```

### Example 2: Extracting Array Element Types

```typescript
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type StringArray = ArrayElement<string[]>;     // string
type NumberArray = ArrayElement<number[]>;     // number
type NotArray = ArrayElement<string>;          // never
```

## Practical Examples

### Example 3: API Response Handler

```typescript
type ApiResponse<T> = T extends string 
  ? { message: T; success: true } 
  : { data: T; success: true };

type StringResponse = ApiResponse<string>;
// Result: { message: string; success: true }

type UserResponse = ApiResponse<{ name: string; age: number }>;
// Result: { data: { name: string; age: number }; success: true }
```

### Example 4: Function Return Type Extraction

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function getString(): string {
  return "hello";
}

function getNumber(): number {
  return 42;
}

type StringReturn = ReturnType<typeof getString>;  // string
type NumberReturn = ReturnType<typeof getNumber>;  // number
```

### Example 5: Nullable Type Helper

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type Example1 = NonNullable<string | null>;      // string
type Example2 = NonNullable<number | undefined>;  // number
type Example3 = NonNullable<boolean | null | undefined>; // boolean
```

## Advanced Example: Mapped Types with Conditionals

```typescript
type OptionalKeys<T> = {
  [K in keyof T]: T[K] extends undefined ? K : never
}[keyof T];

type RequiredKeys<T> = {
  [K in keyof T]: T[K] extends undefined ? never : K
}[keyof T];

interface User {
  name: string;
  age?: number;
  email?: string;
  id: string;
}

type UserOptionalKeys = OptionalKeys<User>;  // "age" | "email"
type UserRequiredKeys = RequiredKeys<User>;  // "name" | "id"
```

## Distributed Conditional Types

When conditional types are applied to union types, they distribute over each member:

```typescript
type ToArray<T> = T extends any ? T[] : never;

type StringOrNumber = string | number;
type ArrayType = ToArray<StringOrNumber>;  // string[] | number[]
```

## Real-world Use Case: Form Field Types

```typescript
type FieldType = 'text' | 'email' | 'number' | 'checkbox';

type FieldValue<T extends FieldType> = 
  T extends 'checkbox' ? boolean :
  T extends 'number' ? number :
  string;

type TextValue = FieldValue<'text'>;      // string
type EmailValue = FieldValue<'email'>;    // string
type NumberValue = FieldValue<'number'>;  // number
type CheckboxValue = FieldValue<'checkbox'>; // boolean

interface FormField<T extends FieldType> {
  type: T;
  value: FieldValue<T>;
  label: string;
}

const textField: FormField<'text'> = {
  type: 'text',
  value: 'Hello World',  // Must be string
  label: 'Name'
};

const numberField: FormField<'number'> = {
  type: 'number',
  value: 42,  // Must be number
  label: 'Age'
};
```

Conditional types are particularly useful for creating flexible, type-safe APIs and utility types that adapt based on the input types they receive. They're extensively used in TypeScript's built-in utility types like `Exclude`, `Extract`, `NonNullable`, and `ReturnType`.
-----

### 3\. Mapped Types

Mapped types allow you to create a new type by iterating over the keys of another type and transforming them.

```typescript
interface Person {
  name: string;
  age: number;
}

// Creates a new type where all properties of `Person` are `boolean`.
type BooleanPerson = {
  [P in keyof Person]: boolean;
};
// type BooleanPerson = {
//   name: boolean;
//   age: boolean;
// }

const personStatus: BooleanPerson = {
  name: true,
  age: false,
};

// Mapped types with key remapping using the `as` keyword
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type PersonGetters = Getters<Person>;
// type PersonGetters = {
//   getName: () => string;
//   getAge: () => number;
// }
```

-----

### 4\. Decorators

Decorators are functions that can be applied to classes, methods, and properties to add extra behavior. You'll need to enable them in your `tsconfig.json` with `experimentalDecorators: true`.

```typescript
// A simple method decorator that logs when the method is called.
function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling method '${propertyKey}' with arguments: ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`Method '${propertyKey}' returned: ${result}`);
    return result;
  };
}

class Calculator {
  @logMethod
  add(x: number, y: number): number {
    return x + y;
  }
}

const calc = new Calculator();
calc.add(2, 3);
// Output:
// Calling method 'add' with arguments: [2,3]
// Method 'add' returned: 5
```

-----

### 5\. Declaration Files (.d.ts)

A declaration file describes the type information for a JavaScript library, allowing TypeScript to use it.

```typescript
// Example of a d.ts file for a simple JavaScript library.
//
// my-lib.js
// export function greet(name) {
//   console.log('Hello, ' + name);
// }

// my-lib.d.ts
// This file provides type information for my-lib.js
declare module 'my-lib' {
  export function greet(name: string): void;
  export function sayGoodbye(): void;
}

// In your TypeScript file (main.ts)
import { greet } from 'my-lib';

greet('Alice'); // Valid
// greet(123); // Error: Argument of type '123' is not assignable to parameter of type 'string'.
```

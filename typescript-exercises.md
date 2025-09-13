# TypeScript Practice Exercises

## Exercise 1: Type Basics
**Task:** Fix the type errors in this code:

```typescript
// Problem
let age = 25;
age = "twenty-five"; // Error

function greet(name) { // Missing type
    return "Hello, " + name;
}

let numbers = [1, 2, 3];
numbers.push("4"); // Error
```

**Solution:**
```typescript
let age: number = 25;
// age = "twenty-five"; // This would be an error

function greet(name: string): string {
    return "Hello, " + name;
}

let numbers: number[] = [1, 2, 3];
numbers.push(4); // Fixed: push a number, not string
```

## Exercise 2: Interfaces and Types
**Task:** Create an interface for a User and implement a function to validate user data:

```typescript
// Create interface for:
// - id (number, readonly)
// - username (string)
// - email (string)
// - age (number, optional)
// - isActive (boolean, default true)
```

**Solution:**
```typescript
interface User {
    readonly id: number;
    username: string;
    email: string;
    age?: number;
    isActive: boolean;
}

function createUser(username: string, email: string, id: number): User {
    return {
        id,
        username,
        email,
        isActive: true
    };
}

function validateUser(user: User): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return user.username.length > 0 && emailRegex.test(user.email);
}
```

## Exercise 3: Generics
**Task:** Create a generic Stack class with push, pop, and peek methods:

```typescript
// Implement a Stack<T> class with:
// - push(item: T): void
// - pop(): T | undefined
// - peek(): T | undefined
// - isEmpty(): boolean
```

**Solution:**
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
}

// Usage
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.peek()); // "world"
```

## Exercise 4: Union Types and Type Guards
**Task:** Create a function that handles different payment methods:

```typescript
// Handle these payment types:
// - CreditCard: { type: "credit", cardNumber: string, cvv: string }
// - PayPal: { type: "paypal", email: string }
// - Cash: { type: "cash", amount: number }
```

**Solution:**
```typescript
interface CreditCard {
    type: "credit";
    cardNumber: string;
    cvv: string;
}

interface PayPal {
    type: "paypal";
    email: string;
}

interface Cash {
    type: "cash";
    amount: number;
}

type PaymentMethod = CreditCard | PayPal | Cash;

function processPayment(payment: PaymentMethod): string {
    switch (payment.type) {
        case "credit":
            return `Processing credit card: ***${payment.cardNumber.slice(-4)}`;
        case "paypal":
            return `Processing PayPal payment for ${payment.email}`;
        case "cash":
            return `Processing cash payment of $${payment.amount}`;
        default:
            const _exhaustive: never = payment;
            return _exhaustive;
    }
}

// Usage
const payment1: PaymentMethod = { type: "credit", cardNumber: "1234567890123456", cvv: "123" };
const payment2: PaymentMethod = { type: "paypal", email: "user@example.com" };
console.log(processPayment(payment1));
console.log(processPayment(payment2));
```

## Exercise 5: Utility Types
**Task:** Use utility types to transform this interface:

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    inStock: boolean;
}

// Create:
// 1. PartialProduct (all properties optional)
// 2. ProductPreview (only id, name, price)
// 3. ReadonlyProduct (all properties readonly)
// 4. ProductUpdate (all except id)
```

**Solution:**
```typescript
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    inStock: boolean;
}

type PartialProduct = Partial<Product>;
type ProductPreview = Pick<Product, "id" | "name" | "price">;
type ReadonlyProduct = Readonly<Product>;
type ProductUpdate = Omit<Product, "id">;

// Usage examples
const partial: PartialProduct = { name: "Laptop" }; // OK

const preview: ProductPreview = {
    id: 1,
    name: "Mouse",
    price: 29.99
};

const readonlyProd: ReadonlyProduct = {
    id: 1,
    name: "Keyboard",
    price: 99.99,
    description: "Mechanical keyboard",
    inStock: true
};
// readonlyProd.price = 89.99; // Error

const update: ProductUpdate = {
    name: "Updated Product",
    price: 149.99,
    description: "New description",
    inStock: false
};
```

## Exercise 6: Conditional Types
**Task:** Create a type that extracts array element types:

```typescript
// Create a type that:
// - If T is an array, returns the element type
// - Otherwise returns T itself
```

**Solution:**
```typescript
type ElementType<T> = T extends (infer E)[] ? E : T;

// Tests
type A = ElementType<string[]>; // string
type B = ElementType<number[]>; // number
type C = ElementType<string>; // string
type D = ElementType<{ id: number }[]>; // { id: number }

// More advanced: Deep array element type
type DeepElementType<T> = T extends (infer E)[] ? DeepElementType<E> : T;

type E = DeepElementType<string[][][]>; // string
```

## Exercise 7: Mapped Types
**Task:** Create a type that makes all properties nullable:

```typescript
// Transform this:
interface Config {
    apiUrl: string;
    timeout: number;
    retries: number;
}

// Into all properties being T | null
```

**Solution:**
```typescript
type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

interface Config {
    apiUrl: string;
    timeout: number;
    retries: number;
}

type NullableConfig = Nullable<Config>;
// Result: { apiUrl: string | null; timeout: number | null; retries: number | null; }

// Advanced: Deeply nullable
type DeepNullable<T> = {
    [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> | null : T[K] | null;
};
```

## Exercise 8: Function Overloading
**Task:** Create an overloaded function for data formatting:

```typescript
// format(value: number): string - formats as currency
// format(value: Date): string - formats as ISO string
// format(value: boolean): string - returns "Yes" or "No"
```

**Solution:**
```typescript
function format(value: number): string;
function format(value: Date): string;
function format(value: boolean): string;
function format(value: number | Date | boolean): string {
    if (typeof value === "number") {
        return `$${value.toFixed(2)}`;
    } else if (value instanceof Date) {
        return value.toISOString();
    } else {
        return value ? "Yes" : "No";
    }
}

// Usage
console.log(format(99.99)); // "$99.99"
console.log(format(new Date())); // ISO date string
console.log(format(true)); // "Yes"
```

## Exercise 9: Template Literal Types
**Task:** Create a type-safe event system:

```typescript
// Create types for:
// - Event names: "click", "focus", "blur"
// - Handler names: "onClick", "onFocus", "onBlur"
```

**Solution:**
```typescript
type EventName = "click" | "focus" | "blur";
type EventHandlerName<T extends string> = `on${Capitalize<T>}`;

type Handler = EventHandlerName<EventName>; // "onClick" | "onFocus" | "onBlur"

// Advanced: Event emitter with template literals
type EventMap = {
    click: MouseEvent;
    focus: FocusEvent;
    blur: FocusEvent;
};

class TypedElement {
    addEventListener<K extends keyof EventMap>(
        event: K,
        handler: (e: EventMap[K]) => void
    ): void {
        // Implementation
    }
}

// Usage
const element = new TypedElement();
element.addEventListener("click", (e) => {
    // e is typed as MouseEvent
    console.log(e.clientX);
});
```

## Exercise 10: Advanced Type Challenge
**Task:** Create a deep readonly type that works with nested objects:

```typescript
interface State {
    user: {
        name: string;
        settings: {
            theme: string;
            notifications: boolean;
        };
    };
    posts: Array<{ id: number; title: string }>;
}
```

**Solution:**
```typescript
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends (infer U)[]
        ? readonly DeepReadonly<U>[]
        : T[P] extends object
        ? DeepReadonly<T[P]>
        : T[P];
};

interface State {
    user: {
        name: string;
        settings: {
            theme: string;
            notifications: boolean;
        };
    };
    posts: Array<{ id: number; title: string }>;
}

type ReadonlyState = DeepReadonly<State>;

// Now all properties are deeply readonly
const state: ReadonlyState = {
    user: {
        name: "John",
        settings: {
            theme: "dark",
            notifications: true
        }
    },
    posts: [{ id: 1, title: "Post 1" }]
};

// All of these would be errors:
// state.user.name = "Jane";
// state.user.settings.theme = "light";
// state.posts.push({ id: 2, title: "Post 2" });
```

## Bonus Exercise: Real-World API Type Safety
**Task:** Create a type-safe API client:

```typescript
// Create types for a REST API with endpoints:
// GET /users -> User[]
// GET /users/:id -> User
// POST /users -> User
// PUT /users/:id -> User
// DELETE /users/:id -> void
```

**Solution:**
```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

type ApiEndpoints = {
    "GET /users": {
        params: {};
        response: User[];
    };
    "GET /users/:id": {
        params: { id: number };
        response: User;
    };
    "POST /users": {
        params: Omit<User, "id">;
        response: User;
    };
    "PUT /users/:id": {
        params: { id: number } & Partial<Omit<User, "id">>;
        response: User;
    };
    "DELETE /users/:id": {
        params: { id: number };
        response: void;
    };
};

class ApiClient {
    async request<T extends keyof ApiEndpoints>(
        endpoint: T,
        params: ApiEndpoints[T]["params"]
    ): Promise<ApiEndpoints[T]["response"]> {
        // Implementation would go here
        return {} as ApiEndpoints[T]["response"];
    }
}

// Usage - fully type-safe!
const client = new ApiClient();

async function example() {
    const users = await client.request("GET /users", {});
    const user = await client.request("GET /users/:id", { id: 1 });
    const newUser = await client.request("POST /users", {
        name: "John",
        email: "john@example.com"
    });
    await client.request("DELETE /users/:id", { id: 1 });
}
```
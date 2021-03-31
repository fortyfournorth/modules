# @44north/utilities

A Module containing a number of small utilities to use in your applications

## Install

```
npm install @44north/utilities
```

or

```
yarn add @44north/utilities
```

## capitalize

```js
import { capitalize } from "@44north/utilities";

const value = "foo";

console.log(capitalize(value)); // -> Foo
```

## doesKeyExists

```js
import { doesKeyExists } from "@44north/utilities";

const obj = { foo: "bar" };

console.log(doesKeyExists(obj, "foo")); // -> true
```

## slugify

```js
import { slugify } from "@44north/utilities";

const value = "Foo Bar Baz";

console.log(slugify(value)); // -> foo-bar-baz
```

## isValidEmailAddress

```js
import { isValidEmailAddress } from "@44north/utilities";

const value = "Foo Bar Baz";

console.log(isValidEmailAddress(value)); // -> false
console.log(isValidEmailAddress("test@example.com")); // -> true
```

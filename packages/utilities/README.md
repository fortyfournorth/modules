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

## asBool

```js
import { asBool } from "@44north/utilities";

const value = "True";

console.log(asBool(value)); // -> true: boolean
```

## sortObjectArrayByKey

```js
import { sortObjectArrayByKey } from "@44north/utilities";

const startingData = [
    {
        label: "1/2",
        value: "50"
    },
    {
        label: "1",
        value: "100"
    },
    {
        label: "1/4",
        value: "25"
    }
];

// SORT BY LABEL KEY ASC
const sortedDataDesc = sortObjectArrayByKey(startingData, "label");
console.log(sortedDataDesc.map((o) => o.value).join(",")); // -> 100,50,25

// SORT BY LABEL KEY DESC
const sortedDataDesc = sortObjectArrayByKey(startingData, "label", "desc");
console.log(sortedDataDesc.map((o) => o.value).join(",")); // -> 25,50,100

// SORT BY VALUE WITH A FUNCTION
const sortedDataCustom = sortObjectArrayByKey(startingData, "value", (a, b) => {
    if (Number(a) < Number(b)) {
        return -1;
    }
    if (Number(a) > Number(b)) {
        return 1;
    }
    return 0;
});
console.log(sortedDataCustom.map((o) => o.value).join(",")); // -> 25,50,100
```

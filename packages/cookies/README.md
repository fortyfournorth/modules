# @44north/cookies

A Module to aid in managing cookies in your applications

## Install

```
npm install @44north/cookies
```

or

```
yarn add @44north/cookies
```

## Usage

```js
import { Cookies } from "@44north/cookies";

const cookies = new Cookies({
    sameSite: "Strict"
});

cookies.setCookie("foo", "bar");

console.log(cookies.getCookie("foo")); // -> bar
```

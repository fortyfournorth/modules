# @44north/classnames

A Module to aid in managing classnames in your applications

## Install

```
npm install @44north/classnames
```

or

```
yarn add @44north/classnames
```

## Usage

```js
import React from "react";
import { ClassNames } from "@44north/classnames";

const Page = () => <h1 classNames={new ClassNames("text-xl").list()}>Hello World</h1>;
```

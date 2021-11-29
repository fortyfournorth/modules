# @44north/blog-utilities

A Module containing a number of small utilities to use when working with blogs.

## Install

```
npm install @44north/blog-utilities
```

or

```
yarn add @44north/blog-utilities
```

## generateHtmlFromJson

```js
import { generateHtmlFromJson } from "@44north/blog-utilities";

const testJson = {
    type: "doc",
    content: [
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "Example "
                },
                {
                    type: "text",
                    marks: [
                        {
                            type: "bold"
                        }
                    ],
                    text: "Text"
                }
            ]
        }
    ]
};

console.log(generateHtmlFromJson(testJson)); // -> <p>Example <strong>Text</strong></p>
```

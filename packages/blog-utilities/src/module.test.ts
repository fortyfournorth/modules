import { generateHtmlFromJson } from "./module";

describe("Blog Utilities", () => {
    describe("generateHtmlFromJson", () => {
        test("returns an HTML string", () => {
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
            const expectedHtml = "<p>Example <strong>Text</strong></p>";

            expect(generateHtmlFromJson(testJson)).toEqual(expectedHtml);
        });

        test("Add custom style attribute to images", () => {
            const dummy = {
                type: "doc",
                content: [
                    {
                        type: "image",
                        attrs: {
                            src: "https://res.cloudinary.com/fortyfournorth/image/upload/v1639537158/Test/ru3ccsrgirrp0san6tbi.jpg",
                            alt: "Female head shot",
                            title: null,
                            style: "float:left padding-right:1rem"
                        }
                    },
                    {
                        type: "paragraph",
                        attrs: {
                            textAlign: "right"
                        },
                        content: [
                            {
                                type: "text",
                                marks: [
                                    {
                                        type: "textStyle",
                                        attrs: {
                                            color: "rgba(220, 150, 150,1)"
                                        }
                                    }
                                ],
                                text: "What a wonderfull day it's"
                            }
                        ]
                    }
                ]
            };
            const expectedHTML = `<img src="https://res.cloudinary.com/fortyfournorth/image/upload/v1639537158/Test/ru3ccsrgirrp0san6tbi.jpg" alt="Female head shot" style="float:left padding-right:1rem"><p style="text-align: right"><span style="color: rgba(220, 150, 150,1)">What a wonderfull day it&apos;s</span></p>`;
            expect(generateHtmlFromJson(dummy)).toEqual(expectedHTML);
        });

        test("Add custom style attribute to IFrame", () => {
            const dummy = {
                type: "doc",
                content: [
                    {
                        type: "iframe",
                        attrs: {
                            src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                            height: 150,
                            width: 150,
                            frameborder: 0,
                            allowfullscreen: true,
                            style: "float:right"
                        }
                    }
                ]
            };

            const expectedHTML = `<div class="iframe-wrapper"><iframe src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" height="150" width="150" frameborder="0" allowfullscreen style="float:right"></iframe></div>`;
            expect(generateHtmlFromJson(dummy)).toEqual(expectedHTML);
        });

        test("throws an error if no JSON is passed", () => {
            try {
                //@ts-ignore - Not passing JSON
                const result = generateHtmlFromJson();

                if (result) {
                    throw new Error("Expected an error to be thrown");
                }
            } catch (error) {
                expect(error).toBeDefined();
            }
        });

        test("throws an error if invalid JSON is passed", () => {
            try {
                const result = generateHtmlFromJson({ content: [] });

                if (result) {
                    throw new Error("Expected an error to be thrown");
                }
            } catch (error) {
                expect(error).toBeDefined();
            }
        });
    }); // close describe("generateHtmlFromJson")
}); // close describe("blog-utilities")

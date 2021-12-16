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
                            alt: "",
                            title: null,
                            style: "float:right; margin-left:0.5rem;width:75%;",
                            figCaption: "Fig Caption Test"
                        }
                    },
                    {
                        type: "paragraph",
                        attrs: {
                            textAlign: "left"
                        },
                        content: [
                            {
                                type: "text",
                                text: "Testing Value"
                            }
                        ]
                    }
                ]
            };
            const expectedHTML = `<figure style="float:right; margin-left:0.5rem;width:75%;"><img src="https://res.cloudinary.com/fortyfournorth/image/upload/v1639537158/Test/ru3ccsrgirrp0san6tbi.jpg" alt=""><figcaption>Fig Caption Test</figcaption></figure><p>Testing Value</p>`;

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

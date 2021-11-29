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

import { capitalize, doesKeyExists, slugify } from "./module";

describe("utilites", () => {
    describe("capitalize", () => {
        test("throws an error if a none string is passed in", () => {
            expect(() => {
                // @ts-ignore
                capitalize(true);
            }).toThrowError(new RegExp("boolean", "i"));
        });
        test.each`
            value        | expected
            ${"foo"}     | ${"Foo"}
            ${"foo bar"} | ${"Foo bar"}
        `(`returns the expected result for "$value"`, ({ value, expected }) => {
            expect(capitalize(value)).toMatch(expected);
        });
    });

    describe("doesKeyExists", () => {
        const testObject = {
            foo: "bar"
        };

        test("returns true when key exists on object", () => {
            expect(doesKeyExists(testObject, "foo")).toBeTrue();
        });

        test("returns true when key exists on object", () => {
            expect(doesKeyExists(testObject, "baz")).toBeFalse();
        });
    });

    describe("slugify", () => {
        test.each`
            value                  | expected
            ${"foo"}               | ${"foo"}
            ${"foo bar"}           | ${"foo-bar"}
            ${"Foo Bar"}           | ${"foo-bar"}
            ${"FOO BAR"}           | ${"foo-bar"}
            ${"foo bar baz"}       | ${"foo-bar-baz"}
            ${"foo bar baz "}      | ${"foo-bar-baz"}
            ${" foo bar baz"}      | ${"foo-bar-baz"}
            ${" foo bar baz "}     | ${"foo-bar-baz"}
            ${"foo & bar"}         | ${"foo-bar"}
            ${"foo & bar "}        | ${"foo-bar"}
            ${" foo & bar"}        | ${"foo-bar"}
            ${" foo & bar "}       | ${"foo-bar"}
            ${"foo & bar 1"}       | ${"foo-bar-1"}
            ${"foo & bar 1 "}      | ${"foo-bar-1"}
            ${" foo & bar 1"}      | ${"foo-bar-1"}
            ${" foo & bar 1 "}     | ${"foo-bar-1"}
            ${" foo & 2   bar 1 "} | ${"foo-2-bar-1"}
        `(`returns the expected result for "$value"`, ({ value, expected }) => {
            expect(slugify(value)).toMatch(expected);
        });
    });
});

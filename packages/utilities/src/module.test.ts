import { capitalize, doesKeyExists, slugify, isValidEmailAddress, asBool } from "./module";

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

    describe("isValidEmailAddress", () => {
        // prettier-ignore
        test.each`
            value                               | expected
            ${"test@test.test"}                 | ${true}
            ${"test@test.test "}                | ${false}
            ${"test+test@test.test"}            | ${true}
            ${"test@test.test.test"}            | ${true}
            ${"email@example.com"}              | ${true}
            ${"firstname.lastname@example.com"} | ${true}
            ${"email@subdomain.example.com"}    | ${true}
            ${"firstname+lastname@example.com"} | ${true}
            ${"email@123.123.123.123"}          | ${true}
            ${"email@[123.123.123.123]"}        | ${true}
            ${'"email"@example.com'}            | ${false}
            ${"1234567890@example.com"}         | ${true}
            ${"email@example-one.com"}          | ${true}
            ${"_______@example.com"}            | ${false}
            ${"email@example.name"}             | ${true}
            ${"email@example.museum"}           | ${true}
            ${"email@example.co.jp"}            | ${true}
            ${"firstname-lastname@example.com"} | ${true}
            ${"test"}                           | ${false}
            ${"testing@$$@.com"}                | ${false}
            ${"plainaddress"}                   | ${false}
            ${"#@%^%#$@#$@#.com"}               | ${false}
            ${"@example.com"}                   | ${false}
            ${"Joe Smith <email@example.com>"}  | ${false}
            ${"email.example.com"}              | ${false}
            ${"email@example@example.com"}      | ${false}
            ${".email@example.com"}             | ${false}
            ${"email.@example.com"}             | ${false}
            ${"email..email@example.com"}       | ${false}
            ${"email@example.com (Joe Smith)"}  | ${false}
            ${"email@example"}                  | ${false}
            ${"email@-example.com"}             | ${false}
            ${"email@111.222.333.44444"}        | ${false}
            ${"email@example..com"}             | ${false}
            ${"Abc..123@example.com"}           | ${false}
            ${"あいうえお@example.com"}         | ${false}
        `(`returns a "$expected" result for "$value"`, ({ value, expected }) => {
            expect(isValidEmailAddress(value)).toEqual(expected);
        });
    });

    describe("asBool", () => {
        test.each`
            value        | as             | expected
            ${true}      | ${"boolean"}   | ${true}
            ${false}     | ${"boolean"}   | ${false}
            ${"true"}    | ${"string"}    | ${true}
            ${"false"}   | ${"string"}    | ${false}
            ${"1"}       | ${"string"}    | ${true}
            ${"0"}       | ${"string"}    | ${false}
            ${"-1"}      | ${"string"}    | ${false}
            ${"N"}       | ${"string"}    | ${false}
            ${"n"}       | ${"string"}    | ${false}
            ${"No"}      | ${"string"}    | ${false}
            ${"no"}      | ${"string"}    | ${false}
            ${"off"}     | ${"string"}    | ${false}
            ${"Off"}     | ${"string"}    | ${false}
            ${"OFF"}     | ${"string"}    | ${false}
            ${"Y"}       | ${"string"}    | ${true}
            ${"y"}       | ${"string"}    | ${true}
            ${"Yes"}     | ${"string"}    | ${true}
            ${"yes"}     | ${"string"}    | ${true}
            ${"on"}      | ${"string"}    | ${true}
            ${"On"}      | ${"string"}    | ${true}
            ${"ON"}      | ${"string"}    | ${true}
            ${1}         | ${"number"}    | ${true}
            ${0}         | ${"number"}    | ${false}
            ${-1}        | ${"number"}    | ${false}
            ${undefined} | ${"undefined"} | ${false}
        `(`returns $expected for "$value" as $as`, ({ value, expected }) => {
            const result = asBool(value);
            expect(result).toBeBoolean();
            expect(result).toEqual(expected);
        });
    });
});

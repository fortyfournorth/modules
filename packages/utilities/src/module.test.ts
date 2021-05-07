import {
    capitalize,
    doesKeyExists,
    slugify,
    isValidEmailAddress,
    asBool,
    sortObjectArrayByKey
} from "./module";

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

    describe("sortObjectArrayByKey", () => {
        test("returns a new Array of sorted Data with alpa values", () => {
            const lowText = "SMALL";
            const bigText = "BIG";
            const startingData = [
                {
                    label: "b",
                    value: 2
                },
                {
                    label: "a",
                    value: lowText
                },
                {
                    label: "d",
                    value: bigText
                },
                {
                    label: "c",
                    value: 3
                }
            ];

            const sortedData = sortObjectArrayByKey(startingData, "label");

            expect(sortedData).toBeArrayOfSize(startingData.length);
            expect(sortedData.map((o) => o.value).join(", ")).not.toMatch(
                startingData.map((o) => o.value).join(", ")
            );
            expect(sortedData[0]).toHaveProperty("value", lowText);
            expect(sortedData[sortedData.length - 1]).toHaveProperty("value", bigText);
        });

        test("returns a new Array of sorted Data with alpa values desc", () => {
            const lowText = "SMALL";
            const bigText = "BIG";
            const startingData = [
                {
                    label: "b",
                    value: 2
                },
                {
                    label: "a",
                    value: lowText
                },
                {
                    label: "d",
                    value: bigText
                },
                {
                    label: "c",
                    value: 3
                }
            ];

            const sortedData = sortObjectArrayByKey(startingData, "label", "desc");

            expect(sortedData).toBeArrayOfSize(startingData.length);
            expect(sortedData.map((o) => o.value).join(", ")).not.toMatch(
                startingData.map((o) => o.value).join(", ")
            );
            expect(sortedData[0]).toHaveProperty("value", bigText);
            expect(sortedData[sortedData.length - 1]).toHaveProperty("value", lowText);
        });

        test("returns a new Array of sorted Data with numberic values", () => {
            const lowText = "SMALL";
            const bigText = "BIG";
            const startingData = [
                {
                    label: "b",
                    value: 2
                },
                {
                    label: lowText,
                    value: 1
                },
                {
                    label: bigText,
                    value: 4
                },
                {
                    label: "c",
                    value: 3
                }
            ];

            const sortedData = sortObjectArrayByKey(startingData, "value");

            expect(sortedData).toBeArrayOfSize(startingData.length);
            expect(sortedData.map((o) => o.value).join(", ")).not.toMatch(
                startingData.map((o) => o.value).join(", ")
            );

            expect(sortedData[0]).toHaveProperty("label", lowText);
            expect(sortedData[sortedData.length - 1]).toHaveProperty("label", bigText);
        });

        test("returns a new Array of sorted Data with numberic values desc", () => {
            const lowText = "SMALL";
            const bigText = "BIG";
            const startingData = [
                {
                    label: "b",
                    value: 2
                },
                {
                    label: lowText,
                    value: 1
                },
                {
                    label: bigText,
                    value: 4
                },
                {
                    label: "c",
                    value: 3
                }
            ];

            const sortedData = sortObjectArrayByKey(startingData, "value", "desc");

            expect(sortedData).toBeArrayOfSize(startingData.length);
            expect(sortedData.map((o) => o.value).join(", ")).not.toMatch(
                startingData.map((o) => o.value).join(", ")
            );

            expect(sortedData[0]).toHaveProperty("label", bigText);
            expect(sortedData[sortedData.length - 1]).toHaveProperty("label", lowText);
        });

        test("returns a new Array of sorted Data with Sort Function Passed", () => {
            const lowText = "SMALL";
            const bigText = "BIG";
            const startingData = [
                {
                    name: "3W-1",
                    diameterInches: "1",
                    diameterMm: "24"
                },
                {
                    name: "3W-1/2",
                    diameterInches: "1/2",
                    diameterMm: "12"
                },
                {
                    name: "3W-3/4",
                    diameterInches: "3/4",
                    diameterMm: "18"
                },
                {
                    name: "3W-3/8",
                    diameterInches: "3/8",
                    diameterMm: "10"
                },
                {
                    name: "3W-SMALL",
                    diameterInches: lowText,
                    diameterMm: "0"
                },
                {
                    name: "3W-5/16",
                    diameterInches: "5/16",
                    diameterMm: "8"
                },
                {
                    name: "3W-BIG",
                    diameterInches: bigText,
                    diameterMm: "100"
                },
                {
                    name: "3W-5/8",
                    diameterInches: "5/8",
                    diameterMm: "16"
                },
                {
                    name: "3W-7/16",
                    diameterInches: "7/16",
                    diameterMm: "11"
                },
                {
                    name: "3W-7/8",
                    diameterInches: "7/8",
                    diameterMm: "22"
                },
                {
                    name: "3W-9/16",
                    diameterInches: "9/16",
                    diameterMm: "14"
                }
            ];

            const sortedData = sortObjectArrayByKey(
                startingData,
                "diameterMm",
                (a: string, b: string) => {
                    if (Number(a) < Number(b)) {
                        return -1;
                    }
                    if (Number(a) > Number(b)) {
                        return 1;
                    }
                    return 0;
                }
            );

            expect(sortedData).toBeArrayOfSize(startingData.length);
            expect(sortedData.map((o) => o.diameterMm).join(", ")).not.toMatch(
                startingData.map((o) => o.diameterMm).join(", ")
            );
            expect(sortedData[0]).toHaveProperty("diameterInches", lowText);
            expect(sortedData[sortedData.length - 1]).toHaveProperty("diameterInches", bigText);
        });
    });
});

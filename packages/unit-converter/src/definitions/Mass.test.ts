import { MassConverter } from "./Mass";
import { GetUnitsTest, UnitConversionTest } from "./_UnitConverterTestHelpers";

describe("MassConverter", () => {
    describe.each`
        value   | from    | to      | expected
        ${1}    | ${"kg"} | ${"g"}  | ${1000}
        ${5000} | ${"lb"} | ${"t"}  | ${2.5}
        ${50}   | ${"kg"} | ${"lb"} | ${110.2311}
    `(`with values "$value$from" and "$expected$to"`, ({ value, from, to, expected }) => {
        UnitConversionTest(MassConverter, value, from, to, expected);
        UnitConversionTest(MassConverter, expected, to, from, value);
    });

    GetUnitsTest(MassConverter);
});

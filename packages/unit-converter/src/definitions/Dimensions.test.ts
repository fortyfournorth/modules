import { DimensionConverter } from "./Dimensions";
import { UnitConversionTest } from "./_UnitConverterTestHelpers";

describe("DimensionConverter", () => {
    describe.each`
        value   | from    | to      | expected
        ${1}    | ${"m"}  | ${"m"}  | ${1}
        ${100}  | ${"cm"} | ${"m"}  | ${1}
        ${1}    | ${"cm"} | ${"mm"} | ${10}
        ${1}    | ${"m"}  | ${"ft"} | ${3.28084}
        ${12}   | ${"ft"} | ${"ft"} | ${12}
        ${32}   | ${"km"} | ${"mi"} | ${19.8839}
        ${1}    | ${"ft"} | ${"in"} | ${12}
        ${1000} | ${"km"} | ${"mi"} | ${621.37121}
    `(`with values "$value$from" and "$expected$to"`, ({ value, from, to, expected }) => {
        UnitConversionTest(DimensionConverter, value, from, to, expected);
        UnitConversionTest(DimensionConverter, expected, to, from, value);
    });
});

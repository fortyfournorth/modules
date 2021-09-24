import { VolumeConverter } from "./Volume";
import { UnitConversionTest } from "./_UnitConverterTestHelpers";

describe("VolumeConverter", () => {
    describe.each`
        value   | from     | to         | expected
        ${3000} | ${"mm3"} | ${"l"}     | ${0.003}
        ${3000} | ${"ml"}  | ${"l"}     | ${3}
        ${1}    | ${"qt"}  | ${"fl-oz"} | ${32}
        ${1}    | ${"gal"} | ${"fl-oz"} | ${128}
        ${1}    | ${"l"}   | ${"fl-oz"} | ${33.814}
        ${100}  | ${"l"}   | ${"gal"}   | ${26.4172}
    `(`with values "$value$from" and "$expected$to"`, ({ value, from, to, expected }) => {
        UnitConversionTest(VolumeConverter, value, from, to, expected);
        UnitConversionTest(VolumeConverter, expected, to, from, value);
    });
});

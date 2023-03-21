import { PressureConverter } from "./Pressure";
import { GetUnitsTest, UnitConversionTest } from "./_UnitConverterTestHelpers";

describe("PressureConverter", () => {
    describe.each`
        value     | from      | to       | expected
        ${100000} | ${"Pa"}   | ${"bar"} | ${1}
        ${100}    | ${"kPa"}  | ${"bar"} | ${1}
        ${1000}   | ${"psi"}  | ${"ksi"} | ${1}
        ${1}      | ${"psi"}  | ${"kPa"} | ${6.89476}
        ${1}      | ${"kPa"}  | ${"psi"} | ${0.145038}
        ${1}      | ${"torr"} | ${"kPa"} | ${0.133322}
    `(`with values "$value$from" and "$expected$to"`, ({ value, from, to, expected }) => {
        UnitConversionTest(PressureConverter, value, from, to, expected);
        UnitConversionTest(PressureConverter, expected, to, from, value);
    });

    GetUnitsTest(PressureConverter);
});

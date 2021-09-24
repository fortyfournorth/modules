import { TemperatureConverter } from "./Temperature";
import { UnitConversionTest } from "./_UnitConverterTestHelpers";

describe("TemperatureConverter", () => {
    describe.each`
        value  | from   | to     | expected
        ${100} | ${"C"} | ${"F"} | ${212}
        ${0}   | ${"K"} | ${"C"} | ${-273.15}
        ${54}  | ${"F"} | ${"R"} | ${513.67}
    `(`with values "$value$from" and "$expected$to"`, ({ value, from, to, expected }) => {
        UnitConversionTest(TemperatureConverter, value, from, to, expected);
        UnitConversionTest(TemperatureConverter, expected, to, from, value);
    });
});

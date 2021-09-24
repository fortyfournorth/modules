import { SpeedConverter } from "./Speed";
import { UnitConversionTest } from "./_UnitConverterTestHelpers";

describe("SpeedConverter", () => {
    describe.each`
        value      | from      | to        | expected
        ${500}     | ${"m/s"}  | ${"km/h"} | ${1800}
        ${4.34488} | ${"knot"} | ${"m/h"}  | ${5}
        ${80}      | ${"km/h"} | ${"m/h"}  | ${49.7097}
    `(`with values "$value$from" and "$expected$to"`, ({ value, from, to, expected }) => {
        UnitConversionTest(SpeedConverter, value, from, to, expected);
        UnitConversionTest(SpeedConverter, expected, to, from, value);
    });
});

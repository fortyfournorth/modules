import { DimensionConverter, converters } from "./module";
import { UnitConverter } from "./definitions/_UnitConverter";

describe("@44north/unitconverter", () => {
    describe("exports converters", () => {
        test("DimensionConverter", () => {
            expect(new DimensionConverter()).toHaveProperty("name", "Dimensions");
        });
    });

    describe("converters", () => {
        test("is exported", () => {
            expect(converters).toBeObject();
        });

        const convertKeys: (keyof typeof converters)[] = Object.keys(
            converters
        ) as (keyof typeof converters)[];
        convertKeys.forEach((key) => {
            test(`has property "${key}" which is a unit converter`, () => {
                expect(converters).toHaveProperty(key);
                expect(converters[key]).toBeInstanceOf(Function);
                expect(new converters[key]()).toBeInstanceOf(UnitConverter);
            });
        });
    });
});

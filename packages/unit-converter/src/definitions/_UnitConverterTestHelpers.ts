import { IUnitConverter, IUnitConverterConstructor } from "./_UnitConverter";

function UnitConversionTest<
    C extends IUnitConverter,
    T extends IUnitConverterConstructor<C["metric"], C["imperial"]>
>(
    Converter: T,
    value: number,
    from: keyof C["metric"] | keyof C["imperial"],
    to: keyof C["metric"] | keyof C["imperial"],
    expected: number
) {
    const precision = 4;
    describe(`successfully converts "${value}${String(from)}" to "${expected}${String(
        to
    )}"`, () => {
        test(`when From and To are defined in the constructor`, () => {
            const convertedValue = new Converter(from, to).convert(value);

            expect(convertedValue).toBeCloseTo(expected, precision);
        });

        test(`when From and To are explicitly set`, () => {
            const convertedValue = new Converter()
                .setFromUnit(from)
                .setToUnit(to)
                .convert(value);

            expect(convertedValue).toBeCloseTo(expected, precision);
        });

        test(`when From and To are programmatically set in convert method`, () => {
            const convertedValue = new Converter().convert(value, from, to);

            expect(convertedValue).toBeCloseTo(expected, precision);
        });

        test(`when From and To using chained mode static constructor`, () => {
            const convertedValue = Converter.convert(value)
                .from(from)
                .to(to);

            expect(convertedValue).toBeCloseTo(expected, precision);
        });
    });
}

function GetUnitsTest<
    C extends IUnitConverter,
    T extends IUnitConverterConstructor<C["metric"], C["imperial"]>
>(Converter: T) {
    describe("getMetricUnits", () => {
        test("returns metrics units of measure", () => {
            const converter = new Converter();
            const units = converter.getMetricUnits();
            const expectedUnits = Object.keys(converter.metric);

            expect(units).toBeArrayOfSize(expectedUnits.length);
            expect(units).toIncludeAllMembers(expectedUnits);
        });
    });
    describe("getImperialUnits", () => {
        test("returns imperial units of measure", () => {
            const converter = new Converter();
            const units = converter.getImperialUnits();
            const expectedUnits = Object.keys(converter.imperial);

            expect(units).toBeArrayOfSize(expectedUnits.length);
            expect(units).toIncludeAllMembers(expectedUnits);
        });
    });
    describe("getAllUnits", () => {
        test("returns imperial units of measure", () => {
            const converter = new Converter();
            const units = converter.getAllUnits();
            const expectedUnits = [
                ...Object.keys(converter.imperial),
                ...Object.keys(converter.metric)
            ];

            expect(units).toBeArrayOfSize(expectedUnits.length);
            expect(units).toIncludeAllMembers(expectedUnits);
        });
    });
}

export { UnitConversionTest, GetUnitsTest };

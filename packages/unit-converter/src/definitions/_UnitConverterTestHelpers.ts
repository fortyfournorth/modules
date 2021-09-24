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
    describe(`succesfully converts "${value}${from}" to "${expected}${to}"`, () => {
        test(`when From and To are defined in the contructor`, () => {
            const convertedValue = new Converter(from, to).convert(value);

            expect(convertedValue).toBeCloseTo(expected, precision);
        });

        test(`when From and To are explictly set`, () => {
            const convertedValue = new Converter()
                .setFromUnit(from)
                .setToUnit(to)
                .convert(value);

            expect(convertedValue).toBeCloseTo(expected, precision);
        });

        test(`when From and To are programatically set in convert method`, () => {
            const convertedValue = new Converter().convert(value, from, to);

            expect(convertedValue).toBeCloseTo(expected, precision);
        });

        test(`when From and To using chained mode static contructor`, () => {
            const convertedValue = Converter.convert(value)
                .from(from)
                .to(to);

            expect(convertedValue).toBeCloseTo(expected, precision);
        });
    });
}

export { UnitConversionTest };

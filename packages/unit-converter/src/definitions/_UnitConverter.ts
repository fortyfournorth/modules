/**
 * A Function to Convert a Value. Typically used when converting Imperial to Metric Units
 */
type ConversionFunction = (input: number) => number;

/**
 * Contains the Information Required to convert this unit to the anchor base unit
 */
interface IUnitDetails {
    /**
     * Used to generate Human Readable Strings
     */
    name: {
        singular: string;
        plural: string;
    };
    /**
     * Value to used to Convert this unit to and from the anchor unit of measure
     *
     * Expected to be used in toBaseUnit and fromBaseUnit Conversions
     *
     * example:
     * ```js
     * const baseUnitValue = 42 * IUnitDetails.to_Anchor;
     * ```
     *
     * For `cm` with a base unit of `m` in the metric system, the expected values would be
     * `0.01` which which generate the formula to be
     * ```js
     * const toBaseUnitValue = 42 * 0.01; // 0.42m
     * const fromBaseUnitValue = 0.42 / 0.01; // 42cm
     * ```
     */
    to_anchor: number | ConversionFunction;
    from_anchor?: number | ConversionFunction;
}

/**
 * Contains the Unit Information Required for a Base Unit of Measure
 */
type IUnits = Record<string, IUnitDetails>;
// interface IUnits {
//     [abbr: string]: IUnitDetails;
// }

/**
 * Contains the information Required to convert Metric values to Imperial and vice-versa
 */
interface IAnchorValue {
    /**
     * Identify the Base Unit of Measure for Type
     */
    unit: string;
    /**
     * Set the Value to convert to the opposing Base Unit of Measure
     */
    ratio: number | ConversionFunction;
}

/**
 * Contains the Information for Unit Types Base Unit of Measure
 */
interface IAnchor {
    /**
     * Information for Metric Base Unit of Measure
     */
    metric: IAnchorValue;
    /**
     * Information for Imperial Base Unit of Measure
     */
    imperial: IAnchorValue;
}

interface IUnitConverter {
    metric: IUnits;
    imperial: IUnits;
    name: string;
    anchors: IAnchor;
    setFromUnit: (unit: any) => this;
    setToUnit: (unit: any) => this;
    convert: (value: number, from?: any, to?: any) => number;
    from: (unit: any) => this;
    to: (unit: any) => number;
    setPrecision: (value: number) => this;
    getPrecision: () => number;
}

interface IUnitConverterConstructor<M extends IUnits, I extends IUnits> {
    new (): IUnitConverter;
    new (from: AnyUnit<M, I>, to: AnyUnit<M, I>): IUnitConverter;
    convert: (value: number) => IUnitConverter;
}

/**
 * Any of the Provided Units
 */
type AnyUnit<M extends Record<keyof M, IUnitDetails>, I extends Record<keyof I, IUnitDetails>> =
    | keyof M
    | keyof I;

/**
 * Unit Converter Class
 */
abstract class UnitConverter<M extends IUnits, I extends IUnits> implements IUnitConverter {
    /**
     * This UnitConverters Metric Details
     */
    abstract metric: M;
    /**
     * This UnitConverters Imperial Details
     */
    abstract imperial: I;
    /**
     * Name of the Converter
     */
    abstract name: string;
    /**
     * This UnitConverters Anchor Details for Conversions
     */
    abstract anchors: IAnchor;

    /**
     * Identifies the Unit to Convert the Value From
     */
    protected fromUnit: AnyUnit<M, I> | undefined = undefined;
    /**
     * Identifies the Unit to Convert the Value To
     */
    protected toUnit: AnyUnit<M, I> | undefined = undefined;
    /**
     * The Value that is being Converted
     */
    protected value: number | undefined = undefined;

    /**
     * The Maximum Precision to utilize
     */
    protected precision: number = 10;

    constructor(from: AnyUnit<M, I> = "", to: AnyUnit<M, I> = "") {
        if (String(from).length > 0) {
            this.setFromUnit(from);
        }
        if (String(to).length > 0) {
            this.setToUnit(to);
        }
    }

    /**
     * Returns if the provided Unit is a Metric Unit of Measure
     * @param unit The Unit to Check
     */
    private isUnitMetric(unit: AnyUnit<M, I>): unit is keyof M {
        if (Object.keys(this.metric).some((key) => key === unit)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns if the provided Unit is an Imperial Unit of Measure
     * @param unit The Unit to Check
     */
    private isUnitImperial(unit: AnyUnit<M, I>): unit is keyof I {
        if (Object.keys(this.imperial).some((key) => key === unit)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns the Unit Details for the provided Unit
     * @param unit The Unit to return details for
     */
    private getUnitDetails(unit: AnyUnit<M, I>): IUnitDetails {
        if (this.isUnitMetric(unit)) {
            // @ts-ignore
            return this.metric[unit];
        } else if (this.isUnitImperial(unit)) {
            // @ts-ignore
            return this.imperial[unit];
        }

        throw new Error(`Unexpected unit ${unit}`);
    }

    /**
     * Convert the provided value from the Provided Unit of Measure to the Base Unit of Measure
     * @param value The Value to Convert
     * @param unit The Current Unit
     */
    private toBaseUnit(value: number, unit: IUnitDetails): number {
        let result = 0;
        if (typeof unit.to_anchor === "function") {
            result = unit.to_anchor(value);
        } else {
            result = value * unit.to_anchor;
        }

        return Number(Number(result).toFixed(this.precision));
    }

    /**
     * Convert the provided value from the Base Unit of Measure to the Provided Unit of Measure
     * @param value The Value to Convert
     * @param unit The Current Unit
     */
    private fromBaseUnit(value: number, unit: IUnitDetails): number {
        let result = 0;

        if (unit.from_anchor) {
            if (typeof unit.from_anchor === "function") {
                result = unit.from_anchor(value);
            } else {
                result = value / unit.from_anchor;
            }
        } else {
            if (typeof unit.to_anchor === "function") {
                result = unit.to_anchor(value);
            } else {
                result = value / unit.to_anchor;
            }
        }

        return Number(Number(result).toFixed(this.precision));
    }

    /**
     * Converts the Instance Value from the Instance From Unit to the Instance To Unit
     */
    protected runConversion(): number {
        if (this.fromUnit === undefined) {
            throw new Error("Expected a from unit to be defined");
        }
        if (this.toUnit === undefined) {
            throw new Error("Expected a to unit to be defined");
        }
        if (this.value === undefined) {
            throw new Error("Expected a from Value to be defined");
        }

        if (this.toUnit === this.fromUnit) {
            return this.value;
        }

        const startingValue = this.value;
        const fromUnitIsMetric = this.isUnitMetric(this.fromUnit);
        const toUnitIsMetric = this.isUnitMetric(this.toUnit);
        const fromUnit = this.getUnitDetails(this.fromUnit);
        const toUnit = this.getUnitDetails(this.toUnit);

        let baseValue: number = this.toBaseUnit(startingValue, fromUnit);

        if (fromUnitIsMetric !== toUnitIsMetric) {
            if (fromUnitIsMetric) {
                if (typeof this.anchors.metric.ratio === "function") {
                    baseValue = this.anchors.metric.ratio(baseValue);
                } else {
                    baseValue = this.anchors.metric.ratio * baseValue;
                }
            } else {
                if (typeof this.anchors.imperial.ratio === "function") {
                    baseValue = this.anchors.imperial.ratio(baseValue);
                } else {
                    baseValue = this.anchors.imperial.ratio * baseValue;
                }
            }
        }

        if (toUnitIsMetric) {
            if (this.anchors.metric.unit === this.toUnit) {
                return baseValue;
            }
        } else {
            if (this.anchors.imperial.unit === this.toUnit) {
                return baseValue;
            }
        }

        return this.fromBaseUnit(baseValue, toUnit);
    }

    /**
     * Programmatically Convert a Value from one unit to another
     * @param value Value to be Converted
     * @param from Unit to be Converted From
     * @param to Unit to be Converted To
     */
    public convert(value: number, from?: AnyUnit<M, I>, to?: AnyUnit<M, I>): number {
        if (from) {
            this.setFromUnit(from);
        }
        if (to) {
            this.setToUnit(to);
        }

        this.value = value;

        return this.runConversion();
    }

    /**
     * Programmatically set the From Unit
     * @param unit Unit to Convert From
     */
    public setFromUnit(unit: AnyUnit<M, I>) {
        this.fromUnit = unit;

        return this;
    }

    /**
     * Programmatically set the To Unit
     * @param unit Unit to Convert To
     */
    public setToUnit(unit: AnyUnit<M, I>) {
        this.toUnit = unit;

        return this;
    }

    /**
     * Programmatically set the Value to be Converted
     * @param value The Value to Convert
     */
    public setValue(value: number) {
        this.value = value;

        return this;
    }

    /**
     * Used in Chained Mode. Set the Unit to Convert From Value
     * Alias of `setFromUnit`
     * @param unit Unit to Convert From
     */
    public from(unit: AnyUnit<M, I>) {
        if (this.value === undefined) {
            throw new Error("Expected a value to be set in the instance");
        }
        return this.setFromUnit(unit);
    }

    /**
     * Used in Chained Mode. Set the Unit to Convert to Value and returns
     * the converted Number;
     * @param unit Unit to Concert To
     */
    public to(unit: AnyUnit<M, I>): number {
        if (this.value === undefined) {
            throw new Error("Expected a value to be set in the instance.");
        }
        if (this.fromUnit === undefined) {
            throw new Error("Expected a fromUnit to be set in the instance.");
        }

        this.setToUnit(unit);

        return this.runConversion();
    }

    /**
     * Set the Precision to Utilize when Calculating Values
     * @param value the Precision Value
     */
    public setPrecision(value: number) {
        if (Number(value) > 0 && Math.round(value) === value) {
            this.precision = value;
        } else {
            throw new Error(`Expected an Integer to be passed into "setPrecision", got ${value}`);
        }

        return this;
    }

    /**
     * See the Currently Set Precision on the Converter
     */
    public getPrecision() {
        return this.precision;
    }
}

export { IUnitDetails, UnitConverter, IUnitConverterConstructor, IUnitConverter, IUnits };

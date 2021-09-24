import { IUnitDetails, IUnits, UnitConverter } from "./_UnitConverter";

interface IMetricTemperature extends IUnits {
    C: IUnitDetails;
    K: IUnitDetails;
}

interface IImperialTemperature extends IUnits {
    F: IUnitDetails;
    R: IUnitDetails;
}

class TemperatureConverter extends UnitConverter<IMetricTemperature, IImperialTemperature> {
    name = "Temperature";

    metric = {
        C: {
            name: {
                singular: "degree Celsius",
                plural: "degrees Celsius"
            },
            to_anchor: 1
        },
        K: {
            name: {
                singular: "degree Kelvin",
                plural: "degrees Kelvin"
            },
            to_anchor: (input: number) => {
                return input - 273.15;
            },
            from_anchor: (input: number) => {
                return input + 273.15;
            }
        }
    } as const;

    imperial = {
        F: {
            name: {
                singular: "degree Fahrenheit",
                plural: "degrees Fahrenheit"
            },
            to_anchor: 1
        },
        R: {
            name: {
                singular: "degree Rankine",
                plural: "degrees Rankine"
            },
            to_anchor: (input: number) => {
                return input - 459.67;
            },
            from_anchor: (input: number) => {
                return input + 459.67;
            }
        }
    } as const;

    anchors = {
        metric: {
            unit: "C",
            ratio: (input: number) => {
                return input / (5 / 9) + 32;
            }
        },
        imperial: {
            unit: "F",
            ratio: (input: number) => {
                return (input - 32) * (5 / 9);
            }
        }
    };

    static convert(value: number) {
        return new this().setValue(value);
    }
}

export default TemperatureConverter;
export { TemperatureConverter };

import { IUnitDetails, IUnits, UnitConverter } from "./_UnitConverter";

interface IMetricPressure extends IUnits {
    Pa: IUnitDetails;
    kPa: IUnitDetails;
    MPa: IUnitDetails;
    hPa: IUnitDetails;
    bar: IUnitDetails;
    torr: IUnitDetails;
}

interface IImperialPressure extends IUnits {
    psi: IUnitDetails;
    ksi: IUnitDetails;
}

class PressureConverter extends UnitConverter<IMetricPressure, IImperialPressure> {
    name = "Pressure";

    metric = {
        Pa: {
            name: {
                singular: "pascal",
                plural: "pascals"
            },
            to_anchor: 1 / 1000
        },
        kPa: {
            name: {
                singular: "kilopascal",
                plural: "kilopascals"
            },
            to_anchor: 1
        },
        MPa: {
            name: {
                singular: "megapascal",
                plural: "megapascals"
            },
            to_anchor: 1000
        },
        hPa: {
            name: {
                singular: "hectopascal",
                plural: "hectopascals"
            },
            to_anchor: 1 / 10
        },
        bar: {
            name: {
                singular: "bar",
                plural: "bar"
            },
            to_anchor: 100
        },
        torr: {
            name: {
                singular: "torr",
                plural: "torr"
            },
            to_anchor: 101325 / 760000
        }
    };

    imperial = {
        psi: {
            name: {
                singular: "pound per square inch",
                plural: "pounds per square inch"
            },
            to_anchor: 1
        },
        ksi: {
            name: {
                singular: "kilopound per square inch",
                plural: "kilopound per square inch"
            },
            to_anchor: 1000
        }
    };

    anchors = {
        metric: {
            unit: "kPa",
            ratio: 0.14503773779
        },
        imperial: {
            unit: "psi",
            ratio: 6.89475729
        }
    };

    static convert(value: number) {
        return new this().setValue(value);
    }
}

export default PressureConverter;
export { PressureConverter };

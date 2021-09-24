import { IUnitDetails, IUnits, UnitConverter } from "./_UnitConverter";

interface IMetricMass extends IUnits {
    mcg: IUnitDetails;
    mg: IUnitDetails;
    g: IUnitDetails;
    kg: IUnitDetails;
    mt: IUnitDetails;
}

interface IImperialMass extends IUnits {
    oz: IUnitDetails;
    lb: IUnitDetails;
    t: IUnitDetails;
}

class MassConverter extends UnitConverter<IMetricMass, IImperialMass> {
    name = "Mass";

    metric = {
        mcg: {
            name: {
                singular: "Microgram",
                plural: "Micrograms"
            },
            to_anchor: 1 / 1000000
        },
        mg: {
            name: {
                singular: "Milligram",
                plural: "Milligrams"
            },
            to_anchor: 1 / 1000
        },
        g: {
            name: {
                singular: "Gram",
                plural: "Grams"
            },
            to_anchor: 1
        },
        kg: {
            name: {
                singular: "Kilogram",
                plural: "Kilograms"
            },
            to_anchor: 1000
        },
        mt: {
            name: {
                singular: "Metric Tonne",
                plural: "Metric Tonnes"
            },
            to_anchor: 1000000
        }
    };

    imperial = {
        oz: {
            name: {
                singular: "Ounce",
                plural: "Ounces"
            },
            to_anchor: 1 / 16
        },
        lb: {
            name: {
                singular: "Pound",
                plural: "Pounds"
            },
            to_anchor: 1
        },
        t: {
            name: {
                singular: "Ton",
                plural: "Tons"
            },
            to_anchor: 2000
        }
    };

    anchors = {
        metric: {
            unit: "g",
            ratio: 1 / 453.59237
        },
        imperial: {
            unit: "lb",
            ratio: 453.59237
        }
    };

    static convert(value: number) {
        return new this().setValue(value);
    }
}

export default MassConverter;
export { MassConverter };

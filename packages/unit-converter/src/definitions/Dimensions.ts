import { IUnitDetails, IUnits, UnitConverter } from "./_UnitConverter";

interface IMetricDimensions extends IUnits {
    mm: IUnitDetails;
    cm: IUnitDetails;
    m: IUnitDetails;
    km: IUnitDetails;
}

interface IImperialDimensions extends IUnits {
    in: IUnitDetails;
    yd: IUnitDetails;
    "ft-us": IUnitDetails;
    ft: IUnitDetails;
    fathom: IUnitDetails;
    mi: IUnitDetails;
    nMi: IUnitDetails;
}

class DimensionConverter extends UnitConverter<IMetricDimensions, IImperialDimensions> {
    name = "Dimensions";

    metric = {
        mm: {
            name: {
                singular: "Millimeter",
                plural: "Millimeters"
            },
            to_anchor: 1 / 1000
        },
        cm: {
            name: {
                singular: "Centimeter",
                plural: "Centimeters"
            },
            to_anchor: 1 / 100
        },
        m: {
            name: {
                singular: "Meter",
                plural: "Meters"
            },
            to_anchor: 1
        },
        km: {
            name: {
                singular: "Kilometer",
                plural: "Kilometers"
            },
            to_anchor: 1000
        }
    };

    imperial = {
        in: {
            name: {
                singular: "Inch",
                plural: "Inches"
            },
            to_anchor: 1 / 12
        },
        yd: {
            name: {
                singular: "Yard",
                plural: "Yards"
            },
            to_anchor: 3
        },
        "ft-us": {
            name: {
                singular: "US Survey Foot",
                plural: "US Survey Feet"
            },
            to_anchor: 1.000002
        },
        ft: {
            name: {
                singular: "Foot",
                plural: "Feet"
            },
            to_anchor: 1
        },
        fathom: {
            name: {
                singular: "Fathom",
                plural: "Fathoms"
            },
            to_anchor: 6
        },
        mi: {
            name: {
                singular: "Mile",
                plural: "Miles"
            },
            to_anchor: 5280
        },
        nMi: {
            name: {
                singular: "Nautical Mile",
                plural: "Nautical Miles"
            },
            to_anchor: 6076.12
        }
    };

    anchors = {
        metric: {
            unit: "m",
            ratio: 3.28084
        },
        imperial: {
            unit: "ft",
            ratio: 1 / 3.28084
        }
    };

    precision = 5;

    static convert(value: number) {
        return new this().setValue(value);
    }
}

export default DimensionConverter;
export { DimensionConverter };

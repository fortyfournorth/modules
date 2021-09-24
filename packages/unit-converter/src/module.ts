import { DimensionConverter } from "./definitions/Dimensions";
import { MassConverter } from "./definitions/Mass";
import { PressureConverter } from "./definitions/Pressure";
import { SpeedConverter } from "./definitions/Speed";
import { TemperatureConverter } from "./definitions/Temperature";
import { VolumeConverter } from "./definitions/Volume";

const converters = {
    length: DimensionConverter,
    mass: MassConverter,
    pressure: PressureConverter,
    speed: SpeedConverter,
    temperature: TemperatureConverter,
    volume: VolumeConverter
};

export default converters;
export {
    converters,
    DimensionConverter,
    MassConverter,
    PressureConverter,
    SpeedConverter,
    TemperatureConverter,
    VolumeConverter
};

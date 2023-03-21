[![44 North](https://res.cloudinary.com/fortyfournorth/image/upload/v1644103323/44North/ReadmeFileBanner_ixvgvr.jpg)](https://fortyfournorth.ca)

# UnitConverter

This module is meant to provide helper methods for testing modules and services.

## Install

Log into `npm` and run one of the following

```sh
npm install @44north/unitconverter --save-dev
```

or

```sh
yarn add @44north/unitconverter --dev
```

## Usage

```ts
import { TemperatureConverter } from "@44north/unitconverter";

const temp1 = new TemperatureConverter("F", "C").convert(212); // 100
const temp2 = new TemperatureConverter()
    .setFromUnit("F")
    .setToUnit("C")
    .convert(212); // 100
const temp3 = new TemperatureConverter().convert(212, "F", "C"); // 100
const temp4 = TemperatureConverter.convert(212)
    .from("F")
    .to("C"); // 100
```

## Length

```ts
import { converters } from "@44north/unitconverter";
const lengthConverter = new converters.length();

// OR

import { DimensionsConverter } from "@44north/unitconverter";
const lengthConverter = DimensionsConverter();
```

### Metric Units

-   `mm` - Millimeter
-   `cm` - Centimeter
-   `m` - Meter
-   `km` - Kilometer

### Imperial Units

-   `in` - Inch
-   `yd` - Yard
-   `ft-us` - US Survey Foot
-   `ft` - Foot
-   `fathom` - Fathom
-   `mi` - Mile
-   `nMi` - Nautical Mile

## Mass

```ts
import { converters } from "@44north/unitconverter";
const massConverter = new converters.mass();

// OR

import { MassConverter } from "@44north/unitconverter";
const massConverter = MassConverter();
```

### Metric Units

-   `mcg` - Microgram
-   `mg` - Milligram
-   `g` - Gram
-   `kg` - Kilogram
-   `mt` - Metric Tonne

### Imperial Units

-   `oz` - Ounce
-   `lb` - Pound
-   `t` - Ton

## Pressure

```ts
import { converters } from "@44north/unitconverter";
const pressureConverter = new converters.pressure();

// OR

import { PressureConverter } from "@44north/unitconverter";
const pressureConverter = PressureConverter();
```

### Metric Units

-   `Pa` - pascal
-   `kPa` - kilopascal
-   `MPa` - megapascal
-   `hPa` - hectopascal
-   `bar` - bar
-   `torr` - torr

### Imperial Units

-   `psi` - pound per square inch
-   `ksi` - kilopound per square inch

## Speed

```ts
import { converters } from "@44north/unitconverter";
const speedConverter = new converters.speed();

// OR

import { SpeedConverter } from "@44north/unitconverter";
const speedConverter = SpeedConverter();
```

### Metric Units

-   `m/s` - Metre per second
-   `km/h` - Kilometre per hour

### Imperial Units

-   `m/h` - Mile per hour
-   `knot` - Knot
-   `ft/s` - Foot per second

## Temperature

```ts
import { converters } from "@44north/unitconverter";
const temperatureConverter = new converters.temperature();

// OR

import { TemperatureConverter } from "@44north/unitconverter";
const temperatureConverter = TemperatureConverter();
```

### Metric Units

-   `C` - degree Celsius
-   `K` - degree Kelvin

### Imperial Units

-   `F` - degree Fahrenheit
-   `R` - degree Rankine

## Volume

```ts
import { converters } from "@44north/unitconverter";
const volumeConverter = new converters.volume();

// OR

import { VolumeConverter } from "@44north/unitconverter";
const volumeConverter = VolumeConverter();
```

### Metric Units

-   `mm3` - Cubic Millimeter
-   `cm3` - Cubic Centimeter
-   `ml` - Millilitre
-   `cl` - Centilitre
-   `dl` - Decilitre
-   `l` - Litre
-   `kl` - Kilolitre
-   `m3` - Cubic meter
-   `km3` - Cubic kilometer
-   `krm` - Matsked
-   `tsk` - Tesked
-   `msk` - Matsked
-   `kkp` - Kaffekopp
-   `glas` - Glas
-   `kanna` - Kanna

### Imperial Units

-   `tsp` - Teaspoon
-   `Tbs` - Tablespoon
-   `in3` - Cubic inch
-   `fl-oz` - Fluid Ounce
-   `cup` - Cup
-   `pnt` - Pint
-   `qt` - Quart
-   `gal` - Gallon
-   `ft3` - Cubic foot
-   `yd3` - Cubic yard

## Attribution

This module is based of the work of [Ben Ng](https://benng.me/) repository [convert-units](https://github.com/ben-ng/convert-units) npm module. while functional, its not been maintained or updated in several years.

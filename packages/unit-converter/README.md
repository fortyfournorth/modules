# UnitConverter

This module is ment to provide helper methods for testing modules and services.

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

## Attribution

This module is based of the work of [Ben Ng](https://benng.me/) repository [convert-units](https://github.com/ben-ng/convert-units) npm module. while functional, its not been maintained or updated in several years.

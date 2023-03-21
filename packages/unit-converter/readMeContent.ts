import { IUnitDetails } from "./src/definitions/_UnitConverter";
import { converters } from "./src/module";
import { capitalize } from "@44north/utilities";

const keys: Array<keyof typeof converters> = Object.keys(converters) as Array<
    keyof typeof converters
>;

console.log(
    keys
        .map((key) => {
            return `
## ${capitalize(key)}

\`\`\`ts
import { converters } from "@44north/unitconverter";
const ${key}Converter = new converters.${key}();

// OR

import { ${new converters[key]().name}Converter } from "@44north/unitconverter";
const ${key}Converter = ${new converters[key]().name}Converter();
\`\`\`

### Metric Units

${Object.entries(new converters[key]().metric)
    .map(([unit, entry]: [string, IUnitDetails]) => `- \`${unit}\` - ${entry.name.singular}`)
    .join("\n")}

### Imperial Units

${Object.entries(new converters[key]().imperial)
    .map(([unit, entry]: [string, IUnitDetails]) => `- \`${unit}\` - ${entry.name.singular}`)
    .join("\n")}
            `;
        })
        .join("")
);

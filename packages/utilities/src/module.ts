/**
 * Capitalizes the provided string
 * @param value The value to be Capitalized
 * @returns the value capitalized
 */
export const capitalize = (value: string) => {
    const type = typeof value;
    if (type !== "string") {
        throw new Error(`Expected a string to be passed into capitalize. Got ${type}`);
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 * camelCase the provided string
 * @param value The value to be camelCased
 * @returns the value camelCased
 */
export const camelCase = (value: string) => {
    const type = typeof value;
    if (type !== "string") {
        throw new Error(`Expected a string to be passed into camelCase. Got ${type}`);
    }

    const split = value.split(new RegExp("[\\s_-]", "g")).filter((record) => record.length > 0);

    return split
        .map((record, index) => {
            if (index === 0) {
                return record.charAt(0).toLowerCase() + record.slice(1);
            } else {
                return capitalize(record);
            }
        })
        .join("");
};

/**
 * pascalCase the provided string
 * @param value The value to be PascalCased
 * @returns the value PascalCased
 */
export const pascalCase = (value: string) => {
    const type = typeof value;
    if (type !== "string") {
        throw new Error(`Expected a string to be passed into pascalCase. Got ${type}`);
    }

    const split = value.split(new RegExp("[\\s_-]", "g")).filter((record) => record.length > 0);

    return split.map((record) => capitalize(record)).join("");
};

/**
 * Upper Case the provided string
 * @param value The value to be Upper Cased
 * @returns the value Upper Cased
 */
export const uppercase = (value: string) => {
    const type = typeof value;
    if (type !== "string") {
        throw new Error(`Expected a string to be passed into uppercase. Got ${type}`);
    }

    return value.toUpperCase();
};

/**
 * Lower Case the provided string
 * @param value The value to be Lower Cased
 * @returns the value Lower Cased
 */
export const lowercase = (value: string) => {
    const type = typeof value;
    if (type !== "string") {
        throw new Error(`Expected a string to be passed into lowercase. Got ${type}`);
    }

    return value.toLowerCase();
};

/**
 * Formats a passed number into a readable price string
 *
 * >**NOTE**
 * >
 * > Replaces non standard spaces with regular spaces
 *
 * @param price The price to format
 * @param options to pass to Intl - defaults to
 * `{
 *      style: "currency",
 *      currency: "CAD",
 *      currencyDisplay: "narrowSymbol"
 *  }`
 * @param locales The Local to use - defaults to `en-US`
 * @returns A formatted price string
 */
export const formatPrice = (
    price: number,
    options: Intl.NumberFormatOptions = {},
    locales: string | string[] = "en-US"
) => {
    const defaults = {
        style: "currency",
        currency: "CAD",
        currencyDisplay: "narrowSymbol"
    };

    return new Intl.NumberFormat(locales, Object.assign({ ...defaults }, { ...options }))
        .format(price)
        .replace(new RegExp("\\s{1,}", "g"), " ");
};

/**
 * returns is the `values` starts with the provided `condition`
 *
 * @param value The Value to Check Against
 * @param condition The Value to Check For
 * @param flags Any Flags to be passed to RegExp
 * @returns If the `value` starts with the `condition`
 */
export const startsWith = (value: string, condition: string, flags = "i"): boolean => {
    return new RegExp(`^${String(condition)}`, flags).test(String(value));
};

/**
 * returns is the `values` ends with the provided `condition`
 *
 * @param value The Value to Check Against
 * @param condition The Value to Check For
 * @param flags Any Flags to be passed to RegExp
 * @returns If the `value` ends with the `condition`
 */
export const endsWith = (value: string, condition: string, flags = "i"): boolean => {
    return new RegExp(`${String(condition)}$`, flags).test(String(value));
};

/**
 * returns is the `values` contains the provided `condition`
 *
 * @param value The Value to Check Against
 * @param condition The Value to Check For
 * @param flags Any Flags to be passed to RegExp
 * @returns If the `value` contains the `condition`
 */
export const contains = (value: string, condition: string, flags = "i"): boolean => {
    return new RegExp(`${String(condition)}`, flags).test(String(value));
};

/**
 * A Utility to quickly check for the existitance of a key on an object
 * @param obj The Object to check for the provided Key on
 * @param key The Key to check for on the provided Object
 * @returns if the key exists on the object
 */
export const doesKeyExists = (obj: object, key: string): boolean =>
    Object.prototype.hasOwnProperty.call(obj, key);

/**
 * Turns the provided string into a cleaned and consistant URL safe string
 * @param value the string to transformed into a slug
 * @returns the a slugified version of the provided string
 */
export const slugify = (value: string) =>
    String(value)
        .toLowerCase()
        .trim()
        .replace(new RegExp("[^a-z0-9-_]", "gi"), "-")
        .replace(new RegExp("-{2,}", "g"), "-")
        .replace(new RegExp("-?([a-z0-9][a-z0-9-_]{1,}[a-z0-9])-?", "g"), "$1");

/**
 * Validate if a string is a value slug.
 *
 * If a URI is passed, each segment of the URI is validated as a slug
 *
 * @param value the value to validate is a slug
 */
export const validatePageSlug = (value: string): boolean => {
    if (typeof value !== "string") {
        return false;
    }

    if (new RegExp("/{2,}", "g").test(value)) {
        return false;
    }

    return String(value)
        .split("/")
        .filter((v) => v.length > 0)
        .every((v) => slugify(v) === v);
};

/**
 * A Utiltity to validate if the provided string matches an valid email address pattern
 * @param value The string to be evaludated as an email address
 * @returns is the provided value matches the pattern of a valid email address
 */
export const isValidEmailAddress = (value: string): boolean => {
    if (String(value).length < 5) {
        return false;
    }
    if (String(value).trim() !== value) {
        return false;
    }

    return (
        new RegExp(
            "^([0-9]{4,}|[a-z][a-z0-9-_+\\.]{0,}[a-z0-9])@([a-z0-9][a-z0-9-_\\.+]{1,}[a-z0-9]\\.[a-z]{2,10}|\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|\\[\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\])$",
            "i"
        ).test(String(value)) && !new RegExp("[\\._-]{2,}", "i").test(String(value))
    );
};

/**
 * A Utility to consitanctly convert a value to a boolean.
 *
 * Useful for values coming in from ENV, Database, Forms, and JSON fields
 * @param value a value to be converted to a boolean
 * @returns a boolean value
 */
export const asBool = (value: string | number | boolean): boolean => {
    if (typeof value === "boolean") {
        return value;
    } else if (typeof value === "number") {
        return value === 1;
    } else {
        return (
            ["true", "yes", "y", "1", "on"].indexOf(
                String(value || "")
                    .trim()
                    .toLowerCase()
            ) !== -1
        );
    }
};

type SortFunction = (valueA: any, valueB: any) => -1 | 0 | 1;
/**
 * Sorts an array of objects by a key.
 * @param arr The Array of Objects to be Sorted
 * @param key The Key of the Object to Sort the Array By
 * @param sortFunction the Direction to Sort the Array or a Custom Sort Function
 * @returns a new Array of Objects sorted by the provided key
 */
export const sortObjectArrayByKey = <T = object>(
    arr: T[],
    key: keyof T,
    sortFunction: "asc" | "desc" | SortFunction = "asc"
) => {
    const newArray = [...arr];

    if (typeof sortFunction !== "function") {
        if (String(sortFunction).toLowerCase() === "desc") {
            sortFunction = (valueA, valueB) => {
                if (valueA > valueB) {
                    return -1;
                }
                if (valueA < valueB) {
                    return 1;
                }
                return 0;
            };
        } else {
            sortFunction = (valueA, valueB) => {
                if (valueA < valueB) {
                    return -1;
                }
                if (valueA > valueB) {
                    return 1;
                }
                return 0;
            };
        }
    }

    newArray.sort((a, b) => {
        return (sortFunction as SortFunction)(a[key], b[key]);
    });

    return newArray;
};

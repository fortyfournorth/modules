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
            "^([0-9]{4,}|[a-z][a-z0-9-_+\\.]{1,}[a-z0-9])@([a-z0-9][a-z0-9-_\\.+]{1,}[a-z0-9]\\.[a-z]{2,10}|\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|\\[\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\])$",
            "i"
        ).test(String(value)) && !new RegExp("[\\._-]{2,}", "i").test(String(value))
    );
};

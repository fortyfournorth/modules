export interface IConditionalClasses {
    [className: string]: boolean;
}
export type AddInputValue = string | string[] | ClassNames | IConditionalClasses;
export type RemoveInputValue = string | string[] | RegExp | RegExp[];
/**
 * A Class to help Manage Classes for Components
 */
class ClassNames {
    private classes: string[] = [];

    /**
     * Returns the number of values in this instance
     */
    public get length() {
        return this.classes.length;
    }

    /**
     * Returns this instances values as a string
     *
     * **Alias** of `.list()`
     */
    public toString() {
        return this.list();
    }

    /**
     * Check if the Provided Value is an Instance of `ClassNames`
     * @param value Value to Check
     * @returns if the value is an instance of `ClassNames`
     */
    public isClassNames(value: any): value is ClassNames {
        if (value instanceof ClassNames) {
            return true;
        }
        return false;
    }

    constructor(...classes: AddInputValue[]) {
        if (classes) {
            classes.forEach((value) => this.add(value));
        }
    }

    private isArray(value: any): value is [] {
        if (value instanceof Array) {
            return true;
        }
        return false;
    }

    private makeArray<T = any>(value: T | T[]): T[] {
        const splitRegEx = new RegExp("\\s{1,}", "g");
        let output: any[] = [];

        if (this.isClassNames(value)) {
            output = output.concat(value.list().split(splitRegEx));
        } else {
            if (!this.isArray(value)) {
                if (typeof value === "string") {
                    String(value)
                        .split(splitRegEx)
                        .forEach((record) => {
                            output.push(record.trim());
                        });
                } else {
                    output.push(value);
                }
            } else {
                output = output.concat(value);
            }
        }

        return output
            .map((value) => {
                if (value instanceof String) {
                    return value.trim();
                } else {
                    return value;
                }
            })
            .filter((value) => {
                if (value instanceof String) {
                    return value.length > 0;
                }
                return value !== undefined;
            });
    }

    /**
     * Returns if this instance has a value matching the pattern
     * @param lookingFor Patter to look for in this instances values
     */
    public has(lookingFor: string | RegExp): boolean {
        if (lookingFor instanceof RegExp) {
            return this.classes.some((current) => lookingFor.test(current));
        } else {
            const thisIndex = this.classes.indexOf(lookingFor);

            return thisIndex >= 0;
        }
    }

    /**
     * Add a value to this instance.
     *
     * **CHAINABLE**
     *
     * **Notes**:
     *
     * - strings will be trimmed and split on blank.
     * - instance will not had duplicate classes names
     * - 0 length values will be ignored
     *
     * @param input value(s) to be added to this instance
     */
    public add(...inputValues: AddInputValue[]): ClassNames {
        inputValues.forEach((input) => {
            if (typeof input === "object" && !this.isArray(input) && !this.isClassNames(input)) {
                input = Object.entries(input)
                    .filter(([key, value]) => value)
                    .map(([key]) => key);
            }

            const classes = this.makeArray<string>(input as string);

            classes.forEach((value) => {
                if (!this.has(value)) {
                    this.classes.push(value);
                }
            });
        });
        return this;
    }

    /**
     * Remove a value from this instance
     * @param input value(s) or pattern(s) to remove
     */
    public remove(...inputValues: RemoveInputValue[]): ClassNames {
        inputValues.forEach((input) => {
            const classes = this.makeArray<string | RegExp>(input);

            classes.forEach((value) => {
                let thisIndex = 0;

                while (thisIndex >= 0) {
                    thisIndex = this.classes.findIndex((className) => {
                        if (value instanceof RegExp) {
                            return value.test(className);
                        } else {
                            return className === value;
                        }
                    });

                    if (thisIndex >= 0) {
                        this.classes.splice(thisIndex, 1);
                    }
                }
            });
        });

        return this;
    }

    /**
     * Returns this instances values as a string.
     *
     * `<h1 classNames={ new ClassNames("text-xl").list() }>Hello World!</h1>`
     *
     * @param classes Add additional classes before listing
     */
    public list(...inputValues: AddInputValue[]): string {
        inputValues.forEach((input) => {
            if (input) {
                this.add(input);
            }
        });
        return this.classes.join(" ");
    }

    /**
     * Returns an array of values matching the search criteria
     * @param input value to look for
     */
    public find(input: string | RegExp): string[] {
        const found: string[] = [];

        this.classes.forEach((value) => {
            if (typeof input === "string") {
                if (value === input) {
                    found.push(value);
                }
            } else {
                if (input.test(value)) {
                    found.push(value);
                }
            }
        });

        return found;
    }

    /**
     * Check if this instance is empty
     */
    public isEmpty() {
        return this.length === 0;
    }

    /**
     * Static accessor to add ClassNames
     *
     * **Shortcut Of** `new ClassNames().add(value)`
     * @param value classes to add to new instance of ClassNames
     * @returns an Instance of ClassNames
     */
    public static add(value: AddInputValue) {
        return new ClassNames(value);
    }

    /**
     * Static accessor to isClassNames
     *
     * **Shortcut Of** `new ClassNames().isClassNames(value)`
     * @param value value to check
     * @returns if the provided value is an instance of ClassNames
     */
    public static isClassNames(value: any) {
        return new ClassNames().isClassNames(value);
    }
}

export default ClassNames;
export { ClassNames };

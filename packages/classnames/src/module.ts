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

    constructor(classes?: string | string[] | ClassNames) {
        if (classes) {
            this.add(classes);
        }
    }

    private makeArray<T = any>(value: T | T[]): T[] {
        const splitRegEx = new RegExp("\\s{1,}", "g");
        let output: any[] = [];

        if (value instanceof ClassNames) {
            output = output.concat(value.list().split(splitRegEx));
        } else {
            if (!(value instanceof Array)) {
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
    public add(input: string | string[] | ClassNames): ClassNames {
        const classes = this.makeArray<string>(input as string);

        classes.forEach((value) => {
            if (!this.has(value)) {
                this.classes.push(value);
            }
        });

        return this;
    }

    /**
     * Remove a value from this instance
     * @param input value(s) or pattern(s) to remove
     */
    public remove(input: string | string[] | RegExp | RegExp[]): ClassNames {
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

        return this;
    }

    /**
     * Returns this instances values as a string.
     *
     * `<h1 classNames={ new ClassNames("text-xl").list() }>Hello World!</h1>`
     *
     * @param classes Add additional classes before listing
     */
    public list(classes?: string | string[] | ClassNames): string {
        if (classes) {
            this.add(classes);
        }
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
}

export default ClassNames;
export { ClassNames };

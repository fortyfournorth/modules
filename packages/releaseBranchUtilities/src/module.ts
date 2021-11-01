interface IReleaseBranchData {
    name: string;
    major: number;
    minor: number;
    patch: number;
}

export interface IReleaseBranchUtilitiesConfig {
    RegExpVersion: string | RegExp;
    majorBranchPrefix: string;
    minorBranchPrefix: string;
    patchBranchPrefix: string;
}

// interface IReleaseBranchUtilities {

//     config(data: keyof IReleaseBranchUtilitiesConfig, value: string | RegExp): this;
// }

/**
 * This utility is used to work with Semantic Release Branches/Labels/Tags/ from Git
 * to help manage nightly builds and sequencing
 */
class ReleaseBranchUtilities {
    private data: IReleaseBranchData[] = [];
    private RegExpVersion = new RegExp("([1-9]?[0-9]{1,}\\.[1-9]?[0-9]{1,}\\.[1-9]?[0-9]{1,})");

    private majorBranchPrefix = "Release-v";
    private minorBranchPrefix = "Release-v";
    private patchBranchPrefix = "Patch-v";

    constructor(
        data?:
            | string
            | string[]
            | Partial<IReleaseBranchUtilitiesConfig & { data?: string | string[] }>
    ) {
        if (data) {
            if (typeof data === "string" || Array.isArray(data)) {
                this.addEntry(data);
            } else {
                this.config(
                    Object.fromEntries(Object.entries(data).filter(([key]) => key !== "data"))
                );
                if (data.data) {
                    this.addEntry(data.data);
                }
            }
        }
    }

    public config(): Readonly<IReleaseBranchUtilitiesConfig>;
    public config(data: Partial<IReleaseBranchUtilitiesConfig>): this;
    public config(key: keyof IReleaseBranchUtilitiesConfig): string;
    public config(key: "RegExpVersion"): RegExp;
    public config(key: keyof IReleaseBranchUtilitiesConfig, value: string): this;
    public config(key: "RegExpVersion", value: string | RegExp): this;
    public config(
        data?: Partial<IReleaseBranchUtilitiesConfig> | keyof IReleaseBranchUtilitiesConfig,
        value?: string | RegExp
    ) {
        if (typeof data === "undefined") {
            const current = Object.freeze({
                RegExpVersion: this.RegExpVersion,
                majorBranchPrefix: this.majorBranchPrefix,
                minorBranchPrefix: this.minorBranchPrefix,
                patchBranchPrefix: this.patchBranchPrefix
            });
            return current;
        }

        if (typeof data === "string") {
            const key = data;

            if (typeof value === "undefined") {
                if (this[key]) {
                    return this[key];
                } else {
                    throw new Error(`Unknown Configuration Key ${key}`);
                }
            } else {
                switch (key) {
                    case "RegExpVersion":
                        if (value instanceof RegExp) {
                            this[key] = value;
                        } else {
                            this[key] = new RegExp(value, "i");
                        }
                        break;
                    case "majorBranchPrefix":
                    case "minorBranchPrefix":
                    case "patchBranchPrefix":
                        this[key] = String(value || "");
                        break;
                    default:
                        throw new Error(`Unknown Configuration Key ${key}`);
                }
            }
        } else {
            Object.entries(data).forEach(([key, value]) => {
                const thisKey: keyof IReleaseBranchUtilitiesConfig =
                    key as keyof IReleaseBranchUtilitiesConfig;
                if (thisKey === "RegExpVersion") {
                    this.config(thisKey, value);
                } else {
                    this.config(thisKey, String(value));
                }
            });
        }

        return this;
    }

    /**
     * Get he Major, Minor and Patch Numbers from a string
     * @param value String to be be tuened into Major, Minor, and Patch Numbers
     * @returns the Major, Minor, and Patch number from a String
     */
    private getVersionNumbers(value: string) {
        const [major = 0, minor = 0, patch = 0] = (value.match(this.RegExpVersion) || [
            ""
        ])[0].split(".");

        return {
            major: Number(major),
            minor: Number(minor),
            patch: Number(patch)
        };
    }

    /**
     * Get the Current Database from this Instance
     * @param filter : filter the returns by;
     * @returns the current dataset
     */
    public getDataset(filter?: string): Readonly<IReleaseBranchData[]> {
        const recordSet: IReleaseBranchData[] = [];

        this.data
            .filter((record) => {
                if (filter) {
                    return new RegExp(filter, "i").test(record.name);
                } else {
                    return true;
                }
            })
            .forEach((record) => {
                recordSet.push({ ...record });
            });

        return recordSet;
    }

    /**
     * Check if a version already exists in the current Dataset
     * @param value The version to check for
     * @returns If the version already exists in the current Dataset
     */
    public hasEntry(value: string): boolean {
        const valueToCheck = this.getVersionNumbers(value);

        return this.data.some(
            (record) =>
                record.major === valueToCheck.major &&
                record.minor === valueToCheck.minor &&
                record.patch === valueToCheck.patch
        );
    }

    /**
     * Add more values to the dataset
     * @param value New Value(s) to add to the Dataset
     * @returns this instance
     */
    public addEntry(value: string | string[]) {
        if (Array.isArray(value)) {
            value.forEach((record) => this.addEntry(record));
        } else {
            if (!this.hasEntry(value)) {
                this.data.push({
                    name: value.trim(),
                    ...this.getVersionNumbers(value)
                });
            }
        }

        return this;
    }

    /**
     * Get the entries name for a major, minor, patch
     * @param major Major Number
     * @param minor Minor Number
     * @param patch Patch Number
     * @returns the name of the version if found
     */
    public getReleaseName(major: number = 0, minor: number = 0, patch: number = 0): string {
        const record = this.data.filter(
            (record) => record.major === major && record.minor === minor && record.patch === patch
        )[0];

        if (record) {
            return record.name;
        } else {
            throw new Error(`No entry found matching ${major}.${minor}.${patch}`);
        }
    }

    /**
     * Get the Entry for the Lastest Release
     * @returns the Latest More Release found in Dataset
     */
    private getLatest(): IReleaseBranchData {
        if (this.data.length === 0) {
            throw new Error("No Values Entered");
        }

        let major = 0;
        let minor = 0;
        let patch = 0;
        this.data.forEach((record) => {
            if (major < record.major) {
                major = record.major;
                minor = record.minor;
                patch = record.patch;
            } else if (major === record.major) {
                if (minor < record.minor) {
                    minor = record.minor;
                    patch = record.patch;
                } else if (minor === record.minor) {
                    if (patch < record.patch) {
                        patch = record.patch;
                    }
                }
            }
        });

        const record = this.data.filter(
            (record) => record.major === major && record.minor === minor && record.patch === patch
        )[0];

        if (!record) {
            throw new Error(`No entry found matching ${major}.${minor}.${patch}`);
        }

        return record;
    }

    /**
     * Get the name of the latest version found
     * @returns the name of the latest version found in the Dataset
     */
    public getLatestRelease(): string {
        return this.getLatest().name;
    }

    /**
     * Get the String for the Next Release Version
     * @param semvar Which element to increment
     * @returns the next version string
     */
    public next(semvar: "major" | "minor" | "patch") {
        const current = { ...this.getLatest() };

        switch (semvar.toLowerCase()) {
            case "major":
                return `${this.majorBranchPrefix}${current.major + 1}.0.0`;
            case "minor":
                return `${this.minorBranchPrefix}${current.major}.${current.minor + 1}.0`;
            default:
                return `${this.patchBranchPrefix}${current.major}.${current.minor}.${
                    current.patch + 1
                }`;
        }
    }

    /**
     * Helper Utility to see if a value is before or after and another
     * @param value Value to Check Against
     * @returns before and after functions
     */
    static is(value: string) {
        const innerUtl = new ReleaseBranchUtilities(value);

        return {
            /**
             * Check if the provided Value is Before the Is Value
             * @param thisValue The Value to check against is
             * @returns if the value is before the previous value
             */
            before(thisValue: string): boolean {
                const latest = innerUtl.addEntry(thisValue).getLatestRelease();

                return latest === thisValue;
            },
            /**
             * Check if the provided Value is After the Is Value
             * @param thisValue The Value to check against is
             * @returns if the value is after the previous value
             */
            after(thisValue: string): boolean {
                const latest = innerUtl.addEntry(thisValue).getLatestRelease();

                return latest !== thisValue;
            }
        };
    }
}

export default ReleaseBranchUtilities;
export { ReleaseBranchUtilities };

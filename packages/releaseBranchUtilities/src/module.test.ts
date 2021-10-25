import { ReleaseBranchUtilities } from "./module";

describe("releaseBranchUtilities", () => {
    const testData = [
        "Patch-v0.3.1",
        "Release-v1.3.0",
        "Patch-v1.3.1",
        "Release-v1.4.0",
        "Patch-v1.3.2"
    ];

    describe("constructor", () => {
        test("set values of data entries when passed", () => {
            const utl = new ReleaseBranchUtilities(testData);

            expect(utl.hasEntry(testData[0])).toBeTrue();
        });
    });

    describe("hasEntry", () => {
        test("returns true when value exists", () => {
            const utl = new ReleaseBranchUtilities(testData);

            expect(utl.hasEntry(testData[0])).toBeTrue();
        });
        test("returns false when value does not exists", () => {
            const utl = new ReleaseBranchUtilities(testData);

            expect(utl.hasEntry("NotThere-1111.22222.44444")).toBeFalse();
        });
    });

    describe("getDataset", () => {
        test("returns an array of data entries", () => {
            const utl = new ReleaseBranchUtilities(testData);

            const dataset = utl.getDataset();
            expect(dataset.length).toEqual(testData.length);
        });

        test("returns an array of data entries", () => {
            const utl = new ReleaseBranchUtilities(testData);
            const filter = "patch";
            const dataset = utl.getDataset(filter);
            expect(dataset.length).toEqual(
                testData.filter((value) => new RegExp(filter, "i").test(value)).length
            );
        });
    });

    describe("addEntry", () => {
        test("adds a new version to the dataset", () => {
            const testVersion = "Test-1.2.3";
            const utl = new ReleaseBranchUtilities(testData);

            utl.addEntry(testVersion);

            expect(utl.hasEntry(testVersion)).toBeTrue();
        });

        test("to Be Chainable", () => {
            const testVersion1 = "Test-1.2.3";
            const testVersion2 = "Test-1.2.4";
            const utl = new ReleaseBranchUtilities(testData);

            utl.addEntry(testVersion1).addEntry(testVersion2);

            expect(utl.hasEntry(testVersion1)).toBeTrue();
            expect(utl.hasEntry(testVersion2)).toBeTrue();
        });

        test("does not add duplicate versions", () => {
            const testVersion1 = "Test-1.2.3";
            const testVersion2 = "Test-1.2.4";
            const utl = new ReleaseBranchUtilities(testData);

            utl.addEntry(testVersion1).addEntry(testVersion2).addEntry(testVersion1);

            expect(utl.hasEntry(testVersion1)).toBeTrue();
            expect(utl.hasEntry(testVersion2)).toBeTrue();
        });

        test("adds multiple values", () => {
            const testVersion1 = "Test-1.2.3";
            const testVersion2 = "Test-1.2.4";
            const utl = new ReleaseBranchUtilities(testData);

            utl.addEntry([testVersion1, testVersion2]);

            expect(utl.hasEntry(testVersion1)).toBeTrue();
            expect(utl.hasEntry(testVersion2)).toBeTrue();
        });
    });

    describe("getReleaseName", () => {
        test("returns true when value exists", () => {
            const utl = new ReleaseBranchUtilities(testData);

            expect(utl.getReleaseName(0, 3, 1)).toEqual(testData[0]);
        });
    });

    describe("getLatestRelease", () => {
        test("returns true when value exists", () => {
            const newRelease = "LatestReleast-v1.6.0";
            const utl = new ReleaseBranchUtilities(testData).addEntry([
                "0.3.3",
                newRelease,
                "v1.1.2"
            ]);

            expect(utl.getLatestRelease()).toEqual(newRelease);
        });
    });

    describe("next", () => {
        test("returns the next major value", () => {
            const utl = new ReleaseBranchUtilities(["v0.0.0"]);
            const value = utl.next("major");
            expect(value).toMatch(new RegExp("1.0.0"));
            expect(value).toMatch(new RegExp("^Release"));
        });
        test("returns the next minor value", () => {
            const utl = new ReleaseBranchUtilities(["v0.0.0"]);
            const value = utl.next("minor");
            expect(value).toMatch(new RegExp("0.1.0"));
            expect(value).toMatch(new RegExp("^Release"));
        });
        test("returns the next patch value", () => {
            const utl = new ReleaseBranchUtilities(["v0.0.0"]);
            const value = utl.next("patch");
            expect(value).toMatch(new RegExp("0.0.1"));
            expect(value).toMatch(new RegExp("^Patch"));
        });
    });

    describe("Static is", () => {
        describe("before", () => {
            test("returns true passed value is before the initial value", () => {
                expect(
                    ReleaseBranchUtilities.is("Release-v1.0.0").before("Release-v1.1.0")
                ).toBeTrue();
            });
            test("returns false passed value is not before the initial value", () => {
                expect(
                    ReleaseBranchUtilities.is("Release-v1.0.0").before("Release-v0.1.0")
                ).toBeFalse();
            });
        });
        describe("after", () => {
            test("returns true passed value is after the initial value", () => {
                expect(
                    ReleaseBranchUtilities.is("Release-v1.1.0").after("Release-v1.0.0")
                ).toBeTrue();
            });
            test("returns false passed value is not before the initial value", () => {
                expect(
                    ReleaseBranchUtilities.is("Release-v1.0.0").after("Release-v1.1.0")
                ).toBeFalse();
            });
        });
    });
});

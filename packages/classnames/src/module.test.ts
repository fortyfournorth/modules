import { ClassNames } from "./module";

describe("ClassNames", () => {
    describe("has", () => {
        test("returns true when expected string is found", () => {
            const classes = new ClassNames(["beer", "banana"]);

            expect(classes.has("beer")).toEqual(true);
        });

        test("returns true when expected regExp is found", () => {
            const classes = new ClassNames(["beer", "banana"]);

            expect(classes.has(new RegExp("n{1,}"))).toEqual(true);
        });

        test("returns false when expected string is found", () => {
            const classes = new ClassNames(["beer", "banana"]);

            expect(classes.has("beers")).toEqual(false);
        });

        test("returns false when expected regExp is found", () => {
            const classes = new ClassNames(["beer", "banana"]);

            expect(classes.has(new RegExp("f{1,}"))).toEqual(false);
        });
    });

    describe("add", () => {
        test("returns the instance for chaining", () => {
            const classes = new ClassNames();
            const add = "Beer";

            expect(classes.add(add)).toBeInstanceOf(ClassNames);
        });
        test("adds single value to instance", () => {
            const classes = new ClassNames();
            const add = "Beer";

            classes.add(add);

            expect(classes.has(add)).toEqual(true);
        });

        test("adds array of values to instance", () => {
            const classes = new ClassNames();
            const add = ["Beer", "Banana", "Cheese"];

            classes.add(add);

            add.forEach((value) => {
                expect(classes.has(value)).toEqual(true);
            });
        });

        test("combines passed ClassName instance into current instance", () => {
            const classes = new ClassNames();
            const add = ["Beer", "Banana", "Cheese"];
            const addClassName = new ClassNames(add);

            classes.add(addClassName);

            add.forEach((value) => {
                expect(classes.has(value)).toEqual(true);
            });
        });
    });

    describe("remove", () => {
        test("returns the instance for chaining", () => {
            const classes = new ClassNames(["Beer", "Banana", "Cheese", "bacon"]);
            const remove = "Beer";

            expect(classes.remove(remove)).toBeInstanceOf(ClassNames);
        });

        test("removes single passed string", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            classes.remove(addedClasses[0]);

            expect(classes.has(addedClasses[0])).toEqual(false);
            expect(classes.has(addedClasses[1])).toEqual(true);
            expect(classes.has(addedClasses[2])).toEqual(true);
            expect(classes.has(addedClasses[3])).toEqual(true);
        });

        test("removes array of passed string", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            classes.remove([addedClasses[0], addedClasses[2]]);

            expect(classes.has(addedClasses[0])).toEqual(false);
            expect(classes.has(addedClasses[1])).toEqual(true);
            expect(classes.has(addedClasses[2])).toEqual(false);
            expect(classes.has(addedClasses[3])).toEqual(true);
        });

        test("removes single passed RegExp", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            classes.remove(new RegExp("e{2}"));

            expect(classes.has(addedClasses[0])).toEqual(false);
            expect(classes.has(addedClasses[1])).toEqual(true);
            expect(classes.has(addedClasses[2])).toEqual(false);
            expect(classes.has(addedClasses[3])).toEqual(true);
        });

        test("removes array passed RegExp", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            classes.remove([new RegExp("e{2}"), new RegExp("con")]);

            expect(classes.has(addedClasses[0])).toEqual(false);
            expect(classes.has(addedClasses[1])).toEqual(true);
            expect(classes.has(addedClasses[2])).toEqual(false);
            expect(classes.has(addedClasses[3])).toEqual(false);
        });
    });

    describe("list", () => {
        test("returns a space delimited of classes as a string", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            expect(classes.list()).toEqual(addedClasses.join(" "));
        });
    });

    describe("find", () => {
        test("returns an array of found items", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            const found = classes.find(new RegExp("e{2,}"));

            expect(found).toEqual(["Beer", "Cheese"]);
        });
    });

    describe("length", () => {
        test("returns the length of the internal array", () => {
            const classes = new ClassNames();
            expect(classes.length).toEqual(0);
            ["Beer", "Banana", "Cheese", "bacon"].forEach((value, i) => {
                classes.add(value);
                expect(classes.length).toEqual(i + 1);
            });
        });
    });

    describe("isEmpty", () => {
        test("returns true when no classes are added", () => {
            expect(new ClassNames().isEmpty()).toBeTrue();
        });
        test("returns false when classes are added", () => {
            expect(new ClassNames("class-1").isEmpty()).toBeFalse();
        });
    });

    describe("toString", () => {
        test("returns a string of classes", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            expect(classes.toString()).toMatch(addedClasses.join(" "));
        });
    });
});

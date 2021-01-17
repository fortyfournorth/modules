import { getDarkMode, setDarkMode, toggleDarkMode } from "./module";

describe("Toggle TailwindCSS Darkmode", () => {
    const darkClassName = "dark";
    const getHTMLNode = () => document.querySelector("html");

    describe("setDarkMode", () => {
        test("adds the dark class to the html node", () => {
            setDarkMode(true);

            expect(getHTMLNode()?.classList.contains(darkClassName)).toBeTrue();
        });

        test("removes the dark class from the html node", () => {
            setDarkMode(false);

            expect(getHTMLNode()?.classList.contains(darkClassName)).toBeFalse();
        });
    });

    describe("toggleDarkMode", () => {
        test("removes dark class when set", () => {
            setDarkMode(true);
            toggleDarkMode();

            expect(getHTMLNode()?.classList.contains(darkClassName)).toBeFalse();
        });

        test("adds dark class when not set", () => {
            setDarkMode(false);
            toggleDarkMode();

            expect(getHTMLNode()?.classList.contains(darkClassName)).toBeTrue();
        });

        test("sets dark class when passed", () => {
            toggleDarkMode(true);

            expect(getHTMLNode()?.classList.contains(darkClassName)).toBeTrue();
        });

        test("removes dark class when passed", () => {
            toggleDarkMode(false);

            expect(getHTMLNode()?.classList.contains(darkClassName)).toBeFalse();
        });
    });

    describe("getDarkMode", () => {
        test("returns true when dark is set", () => {
            setDarkMode(true);
            expect(getDarkMode()).toBeTrue();
        });
        test("returns false when dark is not set", () => {
            setDarkMode(false);
            expect(getDarkMode()).toBeFalse();
        });
    });
});

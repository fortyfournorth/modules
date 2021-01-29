import { Cookies, SameSiteValues } from "@44north/cookies";

const windowGlobal = typeof window !== "undefined" && window;
const documentGlobal = typeof document !== "undefined" && document;

const tailwindcssDarkModeCookieName = "twdarkmode";

if (windowGlobal && window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        setDarkMode(e.matches);
    });
}

const getSystemDarkModePref = () => {
    if (
        windowGlobal &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        return true;
    } else {
        return false;
    }
};

const getDarkModePref = () => {
    const cookies = new Cookies({
        sameSite: SameSiteValues.Strict
    });
    const darkModeCooke = cookies.get(tailwindcssDarkModeCookieName);

    return darkModeCooke !== undefined ? darkModeCooke === "true" : getSystemDarkModePref();
};

const getHTMLNode = () => {
    if (documentGlobal) {
        return document.querySelector("html");
    } else {
        return undefined;
    }
};

const getDarkMode = (): boolean => {
    return getHTMLNode()?.classList.contains("dark") || false;
};

const setDarkMode = (value: boolean): void => {
    const htmlNode = getHTMLNode();
    const cookies = new Cookies({
        sameSite: SameSiteValues.Strict
    });

    if (htmlNode) {
        if (documentGlobal) {
            cookies.set(tailwindcssDarkModeCookieName, String(value));
        }

        if (value) {
            htmlNode?.classList.add("dark");
        } else {
            htmlNode?.classList.remove("dark");
        }
    }
};

const toggleDarkMode = (value?: boolean): void => {
    if (value) {
        setDarkMode(value);
    } else {
        setDarkMode(!getDarkMode());
    }
};

setDarkMode(getDarkModePref());

export { toggleDarkMode, setDarkMode, getDarkMode, getDarkModePref, getSystemDarkModePref };

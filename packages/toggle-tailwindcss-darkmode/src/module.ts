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
    const cookies: { [key: string]: string } = {};

    if (documentGlobal) {
        document.cookie
            .split(";")
            .map((value) => value.trim())
            .forEach((record) => {
                const [key, value]: string[] = record.split("=");
                cookies[key] = value;
            });
    }

    return cookies[tailwindcssDarkModeCookieName] !== undefined
        ? cookies[tailwindcssDarkModeCookieName] === "true"
        : getSystemDarkModePref();
};

const getHTMLNode = () => document.querySelector("html");

const getDarkMode = (): boolean => {
    return getHTMLNode()?.classList.contains("dark") || false;
};

const setDarkMode = (value: boolean): void => {
    const htmlNode = getHTMLNode();

    if (documentGlobal) {
        document.cookie = `${tailwindcssDarkModeCookieName}=${String(value)}`;
    }

    if (value) {
        htmlNode?.classList.add("dark");
    } else {
        htmlNode?.classList.remove("dark");
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

import dayjs from "dayjs";

enum SameSiteValues {
    "None" = "None",
    "Strict" = "Strict",
    "LAX" = "LAX"
}

class Cookies {
    private cookies: { [key: string]: string | number | boolean } = {};
    private domain: string = "";
    private sameSite: SameSiteValues = SameSiteValues.None;
    private secure: boolean = false;
    private path: string = "/";
    private debug: boolean = false;

    constructor(options?: {
        sameSite?: SameSiteValues;
        secure?: boolean;
        domain?: string;
        path?: string;
        debug?: boolean;
    }) {
        if (options?.sameSite) {
            this.sameSite = options.sameSite;
        }
        if (options?.secure) {
            this.secure = options.secure;
        } else {
            if (this.ifWindow()) {
                if (window.location.protocol.match("^https")) {
                    this.secure = true;
                }
            }
        }
        if (options?.domain) {
            this.domain = options.domain;
        }
        if (options?.path) {
            this.path = options.path;
        }
        if (options?.debug) {
            this.debug = options.debug;
        }

        return this.refreshCookies();
    }

    private ifWindow() {
        return typeof window !== "undefined" && window;
    }

    private ifDocument() {
        return typeof document !== "undefined" && document;
    }

    getCookies() {
        return this.cookies;
    }

    /**
     * Returns if a Cookie exists or not
     * @param key Cookie to Check
     */
    hasCookie(key: string) {
        return Object.keys(this.cookies).some((cookieName) => cookieName === key);
    }

    /**
     * Alias of hasCookie
     * @param key Cookie to Check
     */
    has(key: string) {
        return this.hasCookie(key);
    }

    /**
     * Returns the value for a cookie
     * @param key Cookie to get
     */
    getCookie(key: string) {
        return this.cookies[key];
    }

    /**
     * Alias of getCookie
     * @param key Cookie to get
     */
    get(key: string) {
        return this.getCookie(key);
    }

    /**
     * Set a Cookie
     * @param key Cookie to Set
     * @param value Value to Set
     * @param expires Expirey Date of Cookie
     */
    setCookie(key: string, value: string | number | boolean, expires = dayjs().add(1, "year")) {
        const domain = (this.domain.length > 0
            ? this.domain
            : (this.ifWindow() ? window : { location: { hostname: "localhost" } }).location.hostname
        ).split(".");

        if (domain.length > 2) {
            domain.shift();
        }

        if (this.ifDocument()) {
            const cookieSet = [
                `${key}=${String(value)}`,
                `expires=${expires.toString()}`,
                `domain=${domain.join(".")}`,
                `samesite=${this.sameSite}`,
                `path=${this.path}`,
                this.secure ? "secure" : undefined
            ];

            if (this.debug) {
                console.debug("Set Cookie", cookieSet);
            }

            document.cookie = cookieSet.filter((entry) => entry !== undefined).join("; ");
        }

        return this.refreshCookies();
    }

    /**
     * Alias of setCookie
     * @param key Cookie to Set
     * @param value Value to Set
     * @param expires Expirey Date of Cookie
     */
    set(key: string, value: string | number | boolean, expires = dayjs().add(1, "year")) {
        return this.setCookie(key, value, expires);
    }

    /**
     * Deletes a Cookie
     * @param key Cookie to be Removed
     */
    deleteCookie(key: string) {
        return this.setCookie(key, "", dayjs(0));
    }

    /**
     * Alias of deleteCookie
     * @param key Cookie to be Removed
     */
    delete(key: string) {
        return this.deleteCookie(key);
    }

    /**
     * Refresh this instances cookies
     */
    refreshCookies() {
        this.cookies = {};
        if (this.ifDocument()) {
            document.cookie
                .split(";")
                .map((value) => value.trim())
                .forEach((record) => {
                    const [key, value] = record.split("=");
                    this.cookies[key] = value;
                });
        }

        return this;
    }

    /**
     * Alias of refreshCookies
     */
    refresh() {
        return this.refreshCookies();
    }
}

export default Cookies;
export { Cookies, SameSiteValues };

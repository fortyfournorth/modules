import { Cookies } from "./module";

describe("Cookies", () => {
    test("setCookie", () => {
        const key = "foo";
        const value = "bar";
        new Cookies().setCookie(key, value);

        expect(new Cookies()).not.toBeNil();
    });
});

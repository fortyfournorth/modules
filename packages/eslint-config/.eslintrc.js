module.exports = {
    env: {
        browser: true,
        node: true,
        jest: true
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020
    },
    plugins: [
        "@typescript-eslint",
        "html",
        "jest-extended",
        "jest",
        "jsx-a11y",
        "prettier",
        "react-hooks"
    ],
    extends: ["prettier"],
    rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "jsx-a11y/accessible-emoji": 0,
        "jsx-a11y/anchor-is-valid": [
            "warn",
            {
                aspects: ["invalidHref"]
            }
        ],
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/label-has-associated-control": [
            "error",
            {
                assert: "either"
            }
        ],
        "linebreak-style": ["error", "unix"],
        "no-console": [
            "error",
            {
                allow: ["info", "error", "debug", "clear"]
            }
        ],
        "prettier/prettier": "error",
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true
            }
        ],
        "react-hooks/exhaustive-deps": "warn",
        "react-hooks/rules-of-hooks": "error",
        semi: ["error", "always"]
    }
};

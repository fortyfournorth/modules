const jestConfig = require("./../../jest.config");

module.exports = {
    ...jestConfig,
    setupFiles: ["./src/__mocks__/client.ts"],
    roots: ["<rootDir>/src"]
};

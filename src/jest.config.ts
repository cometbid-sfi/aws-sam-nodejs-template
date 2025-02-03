/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    // use ts-jest to transform Typescript files
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    // Use ts-jest preset for testing TypeScript files with Jest
    preset: 'ts-jest',

    clearMocks: true,
    // Set the code coverage directory
    coverageDirectory: 'coverage',

    // Set the test environment to Node.js
    testEnvironment: 'node',

    // Set the test timeout to 10 seconds
    //testTimeout: 10000,
    // Set the maximum number of concurrent test suites to 1
    //maxConcurrency: 1,
    // Set the maximum number of retries for failed tests to 3
    //maxRetries: 3,
    // Set the maximum number of workers to 1
    //maxWorkers: 1,

    // Set the code coverage threshold to 100%
    coverageThreshold: {
        global: {
            lines: 100,
            statements: 100,
            branches: 100,
            functions: 100,
        },
    },

    // Set the code coverage provider to v8
    coverageProvider: 'v8',

    // Set the code coverage report to include all files
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],

    // Set the code coverage report to include all files
    coveragePathIgnorePatterns: ['/node_modules/'],

    // Set the code coverage report to include all files
    coverageReporters: ['text', 'lcov', 'clover', 'cobertura'],

    // Set the code coverage report to include all files
    //reporters: ["default", "jest-junit"],

    // Set the code coverage report to include all files
    //testResultsProcessor: "jest-junit",

    // Set the code coverage report to include all files
    testPathIgnorePatterns: ['/node_modules/'],

    // Set the code coverage report to include all files
    transformIgnorePatterns: ['/node_modules/'],

    // Enable code coverage collection
    collectCoverage: true,

    // Enable verbose output for debugging
    verbose: true,

    //testMatch: ['**/tests/unit/*.test.ts'],

    // Define the root directory for tests and modules
    roots: ['<rootDir>/tests'],

    // testMatch: ["**/*.test.ts", "**/*.test.js"],

    //Regular expression to find test files
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

    // File extensions to recognise in module resolution
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

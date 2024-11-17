// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts', 'json'],
    roots: ['<rootDir>/src', '<rootDir>/_test_'],  // Include '_test_' directory for tests
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],  // Ignore node_modules and dist folders
};

import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Handle CSS imports (mock them with `identity-obj-proxy`)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle absolute imports and aliases
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
  },
};

export default createJestConfig(customJestConfig);

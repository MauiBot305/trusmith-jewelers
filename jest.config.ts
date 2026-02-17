import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Mock heavy 3D libs in test environment
    '^three$': '<rootDir>/src/__mocks__/three.ts',
    '^@react-three/fiber$': '<rootDir>/src/__mocks__/@react-three/fiber.tsx',
    '^@react-three/drei$': '<rootDir>/src/__mocks__/@react-three/drei.tsx',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/e2e/'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/styles/**',
    '!src/types/**',
    '!src/__mocks__/**',
  ],
};

export default createJestConfig(config);

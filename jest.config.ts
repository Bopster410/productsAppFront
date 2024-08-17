import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|sass|scss|jpg)$': 'identity-obj-proxy',
        '^.+\\.svg$': 'jest-transformer-svg',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    extensionsToTreatAsEsm: ['.tsx', '.ts'],
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
};

export default config;
